import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "All Students Sgpa",
    },
  },
};

export function LineChart({ allStudentsData }) {
  const [labels, setLabels] = useState([
    "John",
    "Harry",
    "Ram",
    "Kartik",
    "Shyam",
  ]);

  useEffect(() => {
    if (allStudentsData) setLabels(allStudentsData.map((data) => data.name));
  }, [allStudentsData]);

  const data = {
    labels,
    datasets: [
      {
        label: "Previous",
        data: allStudentsData.map((student) => student.prevSgpa),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Current",
        data: allStudentsData.map((student) => student.curSgpa),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return (
    <div style={{ height: "400px", width: "100%" }}>
      <Line options={options} data={data} />
    </div>
  );
}
