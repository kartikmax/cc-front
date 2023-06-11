import React, { useState,useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "All students performance Marks",
    },
  },
};

export function BarChart({ allStudentsData }) {
  const [labels, setLabels] = useState([
    "John",
    "Harry",
    "Ram",
    "Kartik",
    "Shyam",
  ]);

  useEffect(() => {
    if(allStudentsData)
    setLabels(allStudentsData.map((data)=>data.name))
  }, [allStudentsData])
  

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Previous Marks",
        data: allStudentsData.map((student) => student.prevMarks),
        backgroundColor: "rgba(255, 99, 132, 0.8)",
      },
      {
        label: "Current Marks",
        data: allStudentsData.map((student) => student.curMarks),
        backgroundColor: "rgba(53, 162, 235, 0.8)",
      },
    ],
  };

  console.log(JSON.stringify(allStudentsData));

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <Bar options={options} data={data} />
    </div>
  );
}
