import React from "react";
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
      text: "Chart.js Bar Chart",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const generateRandomData = () => {
  return labels.map(() => Math.floor(Math.random() * 1000));
};

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: generateRandomData(),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: generateRandomData(),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export function BarChart() {
  return (
    <div style={{height:"400px",width:"100%"}}>
      <Bar options={options} data={data} />
    </div>
  );
}
