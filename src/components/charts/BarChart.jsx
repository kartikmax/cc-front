import React, { useState, useEffect } from "react";
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
  const [labels, setLabels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (allStudentsData) {
      setLabels(allStudentsData.map((data) => data.name));
      setLoading(false);
    }
  }, [allStudentsData]);

  const data = {
    labels,
    datasets: [
      {
        label: "Previous Marks 😊",
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

  return (
    <div style={{ height: "400px", width: "100%" }}>
      {loading ? <p>Loading...</p> : <Bar options={options} data={data} />}
    </div>
  );
}