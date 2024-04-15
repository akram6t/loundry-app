import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import "./widget.css";
import axios from "axios";
import { HEADER_API, URL_GET_INCOME_CHART } from "../../utils/Constant";

Chart.register();

function Statistic({ ...props }) {
  const [ chartData, setChartData  ] = useState([]);
  const [ years, setYears ] = useState([]);
  const [ selectedYear, setSelectedYear ] = useState('');

  const yearsToSets = (data) => {
    const y = data?.map(obj => obj.year && obj.year);
    setYears([...new Set(y)]);
    if(years.length > 0){
      setSelectedYear(years[0]);
    }
  }

  function getChartData() {
    axios.get(URL_GET_INCOME_CHART, HEADER_API)
      .then((result, err) => {
        const { status, data } = result.data;
        if (status) {
          setChartData(data);
          yearsToSets(data);
        }
      }).catch(err => {
        // setMessage(`${err}`);
        // setSnackbar(true);
        console.log(err);
      })
  }

  useEffect(() => {
    getChartData();
  },[]);

  const data = {
    labels: ["jan"],
    datasets: [
      {
        label: selectedYear,
        data: ["12", "22", "90", "150", "145", "120"],
      }
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 2,
  };
  return (
    <div className={`widgetCard p-3 md:py-4 md:px-6 ${props.className}`}>
      <div className="flex items-center justify-between">
        <h1 className="text-medium font-semibold pb-4">Income Statement</h1>
        <select className="rounded p-2" value={selectedYear}>
          {
            years.map((y, i) => (
              <option key={i} value={y}>{y}</option>
            ))
          }
        </select>
      </div>
      <div className="">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default Statistic;
