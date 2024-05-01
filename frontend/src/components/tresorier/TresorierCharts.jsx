import React from 'react'
import { Chart as ChartJS, defaults } from 'chart.js/auto'
import { Bar, Doughnut } from 'react-chartjs-2'


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

    const handleChangePeriod = (e) => {
        console.log(e.target);
        let btns = document.querySelectorAll(".analitics-btn");
        btns.forEach((btn) => {
            btn.classList.remove("active-analitics-btn");
        });
        e.target.classList.toggle("active-analitics-btn");
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
              className="analitics-btn active-analitics-btn"
            >
              Weekly
            </button>
            <button onClick={handleChangePeriod} className="analitics-btn">
              Monthly
            </button>
            <button onClick={handleChangePeriod} className="analitics-btn">
              Yearly
            </button>
          </div>
          <div className="flex justify-between items-center basis-[60%] ">
            <div>&lt;</div>
            <div>2024</div>
            <div>&gt;</div>
          </div>
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