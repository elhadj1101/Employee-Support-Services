import React, {useState} from 'react'
import { Chart as ChartJS, defaults } from 'chart.js/auto'
import { Bar, Doughnut } from 'react-chartjs-2'
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
  IoIosArrowBack,
  IoIosArrowForward
} from "react-icons/io";
import { IoArrowDown, IoArrowUp } from "react-icons/io5";
import { toast } from 'sonner';
defaults.responsive = true;

function BarChart() {
    const labels = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const [currntPeriod, setCurrentPeriod] = useState("monthly");
    const [ currentPeriodData , setCurrentPeriodData] = useState({
      currntYear: new Date().getFullYear(),
      startYear: new Date().getFullYear() - 1,
      endYear: new Date().getFullYear(),
    })
    const handleChangePeriod = (e) => {
        let btns = document.querySelectorAll(".analitics-btn");
        btns.forEach((btn) => {
            btn.classList.remove("active-analitics-btn");
        });
        e.target.classList.toggle("active-analitics-btn");

        const id = e.target.id.replace("Btn", "");
        setCurrentPeriod(id);
    }
    const handleMonthlyChange = (e) => {
      const {id} = e.target;
      if (id === "prevBtn") {
        setCurrentPeriodData({
          ...currentPeriodData,
          currntYear: currentPeriodData.currntYear - 1,
        });
      } else {
        if(currentPeriodData.currntYear+1 > new Date().getFullYear()) {
          toast.error("Vous ne pas depasser l'annee actuelle");
          return;
        }
        setCurrentPeriodData({
          ...currentPeriodData,
          currntYear: currentPeriodData.currntYear + 1,
        });
      }
    }
    const handleYearlyChange = (e) => {
        const { id, value } = e.target;
        if (id === "startYear" && value > currentPeriodData.endYear) {
          toast.error("Annee debut doit etre inferieur a l'annee fin");
          setCurrentPeriodData({
            ...currentPeriodData,
            [id]: currentPeriodData.endYear-1,
          });
            return;
        }
        if (id === "endYear" && value > new Date().getFullYear()) {
          toast.error("Annee debut doit etre inferieur a l'annee fin");
          setCurrentPeriodData({
            ...currentPeriodData,
            [id]: new Date().getFullYear(),
          });
          return;
        }
        setCurrentPeriodData({
            ...currentPeriodData,
            [id]: value,
        });
    }
  return (
    <div className="w-full mb-4  flex justify-between gap-6  items-stretch">
      <div className="w-[67%] bg-white rounded-md shadoww p-6">
        {/* options=
        {{
          plugins: {
            customCanvasBackgroundColor: {
              color: "white",
            },
          },
        }}
        plugins= {[plugin]} */}
        <div className="flex gap-4 pb-10">
          <div className="flex justify-start basis-[40%] items-center gap-4">
            <button
              onClick={handleChangePeriod}
              id="weeklyBtn"
              className="analitics-btn"
            >
              Weekly
            </button>
            <button
              id="monthlyBtn"
              onClick={handleChangePeriod}
              className="analitics-btn  active-analitics-btn"
            >
              Monthly
            </button>
            <button
              id="yearlyBtn"
              onClick={handleChangePeriod}
              className="analitics-btn"
            >
              Yearly
            </button>
          </div>
          {currntPeriod === "monthly" && (
            <div className="flex justify-between items-center basis-[60%] ">
              <div id="prevBtn" className="hover:cursor-pointer"  onClick={handleMonthlyChange}>
                <IoIosArrowBack fontSize={"30px"} color="#0E1B6B" />
              </div>
              <div className="font-semibold text-darkblue">{currentPeriodData.currntYear}</div>
              <div className="hover:cursor-pointer">
                {/* <div className="flex justify-center items-center">
                <div className="font-semibold text-darkblue">{currntYear}</div>

                <IoArrowUp />
                <IoArrowDown />
              </div> */}

                <IoIosArrowForward fontSize={"30px"} color="#0E1B6B" />
              </div>
            </div>
          )}
          {currntPeriod === "yearly" && (
            <div className="flex justify-between gap-10 items-center basis-[60%]">
              <div className="basis-[50%]">
                <label htmlFor="startYear" className="text-xs font-light ">
                  Annee debut
                </label>
                <input
                  id="startYear"
                  className="p-2"
                  value={currentPeriodData.startYear}
                  onChange={handleYearlyChange}
                  type="text"
                  placeholder="Annee debut"
                />
              </div>
              <div className="basis-[50%]">
                <label htmlFor="endYear" className="text-xs font-light">
                  Annee Fin
                </label>
                <input
                  id="endYear"
                  className="p-2"
                  value={currentPeriodData.endYear}
                  onChange={handleYearlyChange}
                  type="text"
                  placeholder="Annee fin"
                />
              </div>
            </div>
          )}
        </div>
        <Bar
          className="w-full"
          options={{
            scales: {
              x: {
                grid: {
                  display: false,
                },
              },
              y: {
                grid: {
                  display: false,
                },
              },
            },
            datasets: {
              bar: {
                grouped: true,
                borderRadius: 5,

                // barThickness: 10,
                barPercentage: 0.76,
                categoryPercentage: 0.5,
              },
            },
          }}
          data={{
            labels: labels,
            datasets: [
              {
                label: "Income",
                data: [65, 59, 80, 81, 56, 55, 40, 80, 81, 56, 55, 59],
                backgroundColor: ["#1F2868"],
              },
              {
                label: "Expense",
                data: [55, 65, 59, 40, 80, 81, 56, 55, 65, 59, 40, 40],
                backgroundColor: ["#4256D0"],
              },
            ],
          }}
        />
      </div>
      <div className="w-[32%] bg-white rounded-md shadoww p-6">
        <Doughnut
          className="w-full"
          data={{
            labels: labels,
            datasets: [
              {
                label: "My Second Dataset",
                data: [55, 65, 59, 40, 80, 81, 56],
                backgroundColor: ["#4256D0"],
              },
            ],
          }}
        />
      </div>
    </div>
  );
}

export default BarChart