import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Typography } from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend);

export function DoughnutChart({ allStudentsData }) {
  const [labels, setLabels] = useState([
    "John",
    "Harry",
    "Ram",
    "Kartik",
    "Shyam",
  ]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (allStudentsData) {
      setLabels(allStudentsData.map((data) => data.name));
      setIsLoading(false);
    }
  }, [allStudentsData]);

  const data = {
    labels,
    datasets: [
      {
        label: "Total Percentage",
        data: allStudentsData
          ? allStudentsData.map((student) => student.curPercentage)
          : [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ height: "400px", width: "100%" }}>
      {isLoading ? (
        <Typography variant="subtitle1" align="center">
          Loading...
        </Typography>
      ) : (
        <>
          <Typography variant="subtitle1" align="center">
            All students
          </Typography>
          <Doughnut data={data} />
        </>
      )}
    </div>
  );
}
