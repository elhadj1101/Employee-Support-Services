import React, {useState} from 'react'
import { Chart as ChartJS, defaults } from 'chart.js/auto'
import { Bar, Doughnut } from 'react-chartjs-2'
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
  IoIosArrowBack,
  IoIosArrowForward
} from "react-icons/io";
import { toast } from 'sonner'
import { fetchAnalitics } from "api/records";
import { weekNumber } from "components/utils/utilFunctions";


defaults.responsive = true;

function TresorierCharts({
  monthlyData = {},
  currentPeriodData,
  setCurrentPeriodData,
  setAnaliticsByMonth,

}) {
  const Monthlylabels = [
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
  const doughnoutLabels = ["Prets Revenue", "Prets Depenses", "Aides Revenue", "Aides Depenses"];
  const WeeklyLabels = ["Dim", "Lun", "Mard", "Merc", "Jeu", "Ven", "Sam"];
  let days =  ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", ];
  const [currentType, setCurrentType] = useState("all")
  const [currntPeriod, setCurrentPeriod] = useState("monthly");
  let incomes = [];
  let expenses = [];
  if (currntPeriod === "weekly") {
     incomes = Object.keys(monthlyData)
      .sort((a, b) => days.indexOf(a) > days.indexOf(b))
      .map((e) => {
        return monthlyData[e].total_income;
      });
     expenses = Object.keys(monthlyData)
      .sort((a, b) => days.indexOf(a) > days.indexOf(b))
      .map((e) => {
        return monthlyData[e].total_expense;
      });
  }else {
     incomes = Object.keys(monthlyData).map((e) => {
      return monthlyData[e].total_income;
    });
     expenses = Object.keys(monthlyData).map((e) => {
      return monthlyData[e].total_expense;
    });

  }

  const handleChangePeriod = async(e) => {
    let btns = document.querySelectorAll(".analitics-btn");
    btns.forEach((btn) => {
      btn.classList.remove("active-analitics-btn");
    });
    e.target.classList.toggle("active-analitics-btn");

    const id = e.target.id.replace("Btn", "");
    setCurrentPeriod(id);
    await fetchAnalitics(
        setAnaliticsByMonth,
        (id ==="monthly" ? currentPeriodData.currntYear: null),
        (id ==="weekly" ? currentPeriodData.currntWeek: null),
        id
      );
  };
  const handleChangeType = async (e) => {
    let btns = document.querySelectorAll(".doghnout-btn");
    btns.forEach((btn) => {
      btn.classList.remove("active-doghnout-btn");
    });
    e.target.classList.toggle("active-doghnout-btn");

    const id = e.target.id.replace("Btn", "");
    setCurrentType(id);
  };
  const handleMonthlyChange = async (e) => {
    const { id } = e.currentTarget;
    if (id === "prevBtn") {
      setCurrentPeriodData({
        ...currentPeriodData,
        currntYear: currentPeriodData.currntYear - 1,
      });
      await fetchAnalitics(setAnaliticsByMonth, currentPeriodData.currntYear - 1);
    } else {
      if (currentPeriodData.currntYear + 1 > new Date().getFullYear()) {
        toast.error("Vous ne pas depasser l'annee actuelle");
        return;
      }
      setCurrentPeriodData({
        ...currentPeriodData,
        currntYear: currentPeriodData.currntYear + 1,
      });
      await fetchAnalitics(
        setAnaliticsByMonth,
        currentPeriodData.currntYear + 1
      );

    }
  };
  const handleWeeklyChange = async(e) => {
    const { id } = e.currentTarget;
    if (id === "prevBtn") {
      setCurrentPeriodData({
        ...currentPeriodData,
        currntWeek: currentPeriodData.currntWeek - 1,
      });
      await fetchAnalitics(
        setAnaliticsByMonth,
        null,
        currentPeriodData.currntWeek - 1,
        currntPeriod
      );
    } else {
      if (currentPeriodData.currntWeek + 1 > weekNumber()) {
        toast.error("Vous ne pas depasser la semaine actuelle");
        return;
      }
      setCurrentPeriodData({
        ...currentPeriodData,
        currntWeek: currentPeriodData.currntWeek + 1,
      });
      await fetchAnalitics(
        setAnaliticsByMonth,
        null,
        currentPeriodData.currntWeek + 1,
        currntPeriod
      );

    }
  };
  const handleYearlyChange = () =>{
    
  }
  function getWeekDates(year, weekNumber) {
    // Calculate the first day of the year
    var firstDayOfYear = new Date(year, 0, 1);

    // Calculate the first day of the week
    var firstDayOfWeek = new Date(
      firstDayOfYear.getTime() + (weekNumber - 1) * 7 * 24 * 60 * 60 * 1000
    );

    // Calculate the end date of the week
    var endDateOfWeek = new Date(
      firstDayOfWeek.getTime() + 6 * 24 * 60 * 60 * 1000
    );

    return {
      startDate: firstDayOfWeek,
      endDate: endDateOfWeek,
    };
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
          {currntPeriod === "weekly" && (
            <div className="flex justify-between items-center basis-[60%] ">
              <div
                id="prevBtn"
                className="hover:cursor-pointer"
                onClick={handleWeeklyChange}
              >
                <IoIosArrowBack fontSize={"30px"} color="#0E1B6B" />
              </div>
              <div className="font-semibold text-darkblue">
                {currentPeriodData.currntWeek === weekNumber() &&
                  "La semaine actuelle"}
                {currentPeriodData.currntWeek !== weekNumber() &&
                  " [" +
                    getWeekDates(
                      new Date().getFullYear(),
                      currentPeriodData.currntWeek
                    ).startDate.toDateString() +
                    " - " +
                    getWeekDates(
                      new Date().getFullYear(),
                      currentPeriodData.currntWeek
                    ).endDate.toDateString() +
                    "]"}
              </div>
              <div
                id="nextBtn"
                className="hover:cursor-pointer"
                onClick={handleWeeklyChange}
              >
                {/* <div className="flex justify-center items-center">
                <div className="font-semibold text-darkblue">{currntYear}</div>

                <IoArrowUp />
                <IoArrowDown />
              </div> */}

                <IoIosArrowForward fontSize={"30px"} color="#0E1B6B" />
              </div>
            </div>
          )}
          {currntPeriod === "monthly" && (
            <div className="flex justify-between items-center basis-[60%] ">
              <div
                id="prevBtn"
                className="hover:cursor-pointer"
                onClick={handleMonthlyChange}
              >
                <IoIosArrowBack fontSize={"30px"} color="#0E1B6B" />
              </div>
              <div className="font-semibold text-darkblue">
                {currentPeriodData.currntYear}
              </div>
              <div
                id="nextBtn"
                className="hover:cursor-pointer"
                onClick={handleMonthlyChange}
              >
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
            labels: currntPeriod === "monthly" ? Monthlylabels : WeeklyLabels,
            datasets: [
              {
                label: "Income",
                data: incomes,
                backgroundColor: ["#1F2868"],
              },
              {
                label: "Expense",
                data: expenses,
                backgroundColor: ["#4256D0"],
              },
            ],
          }}
        />
      </div>
      <div className="w-[32%] bg-white rounded-md shadoww p-6">

        <div className="flex justify-center w-[100%] items-center gap-4 mb-4">
          <button
            onClick={handleChangeType}
            id="allBtn"
            className="doghnout-btn"
          >
            Tous
          </button>
          <button
            id="aidsBtn"
            onClick={handleChangeType}
            className="doghnout-btn"
          >
            Aides Financieres
          </button>
          <button
            id="pretsBtn"
            onClick={handleChangeType}
            className="doghnout-btn  active-doghnout-btn"
          >
            Prets
          </button>
        </div>
        <Doughnut
          className="w-full"
          data={{
            labels: doughnoutLabels,
            datasets: [
              {
                label: "My Second Dataset",
                data: [55, 65, 59, 40],
                backgroundColor: ["#7ABA78", "#0A6847", "#F3CA52", "#FCDC2A"],
              },
            ],
          }}
        />
      </div>
    </div>
  );
}

export default TresorierCharts