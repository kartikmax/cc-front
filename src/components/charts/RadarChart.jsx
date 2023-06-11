import React, { useState } from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export function RadarChart() {
  const labels = [
    {
      key: "Communications",
      question: "What is importance of communication and improvement?",
    },
    { key: "Aptitude", question: "What is your goal?" },
    {
      key: "Achievements",
      question: "How satisfied are you with your achievements so far?",
    },
    {
      key: "Social",
      question:
        "How would you rate your level of social engagement on a scale of 1 to 10?",
    },
    { key: "Skills", question: "What is your best skill?" },
    { key: "Style", question: "Did You enjoy your life in present?" },
  ];
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogData, setDialogData] = useState({});
  const [chartData, setChartData] = useState(generateRandomData());

  function generateRandomData() {
    return labels.map(() => Math.floor(Math.random() * 10) + 1);
  }

  const data = {
    labels: labels.map((item) => item.key),
    datasets: [
      {
        label: "My Data",
        data: chartData,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleShowAnalytics = () => {
    handleDialogClose();
    setChartData(Object.values(dialogData).map((value) => parseInt(value, 10)));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    let sanitizedValue = value.replace(/\D/g, ""); // Remove non-digit characters

    // Ensure the value is within the desired range
    if (sanitizedValue !== "") {
      const numValue = parseInt(sanitizedValue, 10);
      if (numValue < 1) {
        sanitizedValue = "1";
      } else if (numValue > 10) {
        sanitizedValue = "10";
      }
    }

    setDialogData((prevData) => ({ ...prevData, [name]: sanitizedValue }));
  };

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <Radar data={data} />
      <Button onClick={handleDialogOpen}>Ask question</Button>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Enter Your Response (only in numbers 1-10)</DialogTitle>
        <DialogContent>
          {labels.map((label) => (
            <TextField
              key={label.key}
              name={label.key}
              label={label.question}
              value={dialogData[label.key] || ""}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleShowAnalytics}>Show Analytics</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
