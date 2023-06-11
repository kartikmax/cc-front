import React, { useState } from "react";
import {
  Button,
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Slider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

import { BarChart } from "../components/charts/BarChart";
import { DoughnutChart } from "../components/charts/DoughnutChart";
import { LineChart } from "../components/charts/LineChart";
import { RadarChart } from "../components/charts/RadarChart";

function Dashboard() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [studentData, setStudentData] = useState({
    name: "",
    prevMarks: "",
    prevPercentage: 0,
    prevSgpa: "",
    prevSemester: "",
    curMarks: "",
    curPercentage: 0,
    curSgpa: "",
    curSemester: "",
  });

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setStudentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePrevPercentageChange = (event, value) => {
    setStudentData((prevData) => ({
      ...prevData,
      prevPercentage: value,
    }));
  };

  const handleCurPercentageChange = (event, value) => {
    setStudentData((prevData) => ({
      ...prevData,
      curPercentage: value,
    }));
  };

  const handleSave = () => {
    handleDialogClose();
    console.log(studentData);
  };

  return (
    <>
      <Typography variant="h3" align="center">
        Dashboard
      </Typography>
      <Typography variant="h5" align="center">
        Progress Part 1
      </Typography>
      <Grid container justifyContent="center">
        <Button variant="contained" onClick={handleDialogOpen}>
          Add Details
        </Button>
      </Grid>
      <Grid container>
        <Grid item xs={12} md={8}>
          <BarChart />
        </Grid>
        <Grid item xs={12} md={4}>
          <DoughnutChart />
        </Grid>
      </Grid>
      <Typography variant="h5" align="center">
        Progress part 2
      </Typography>
      <Grid container>
        <Grid item xs={12} md={4}>
          <RadarChart />
        </Grid>
        <Grid item xs={12} md={8}>
          <LineChart />
        </Grid>
      </Grid>

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Add Details</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                fullWidth
                name="name"
                value={studentData.name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">Previous Marks</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Marks"
                fullWidth
                name="prevMarks"
                value={studentData.prevMarks}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography id="prev-percentage-slider" gutterBottom>
                Previous Percentage
              </Typography>
              <Slider
                aria-labelledby="prev-percentage-slider"
                valueLabelDisplay="auto"
                step={1}
                marks
                min={0}
                max={100}
                value={studentData.prevPercentage}
                onChange={handlePrevPercentageChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="SGPA"
                fullWidth
                name="prevSgpa"
                value={studentData.prevSgpa}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="prev-semester-label">Semester</InputLabel>
                <Select
                  labelId="prev-semester-label"
                  id="prev-semester-select"
                  value={studentData.prevSemester}
                  name="prevSemester"
                  onChange={handleInputChange}
                >
                  <MenuItem value={1}>Semester 1</MenuItem>
                  <MenuItem value={2}>Semester 2</MenuItem>
                  <MenuItem value={3}>Semester 3</MenuItem>
                  <MenuItem value={4}>Semester 4</MenuItem>
                  <MenuItem value={5}>Semester 5</MenuItem>
                  <MenuItem value={6}>Semester 6</MenuItem>
                  {/* Add more semesters as needed */}
                </Select>
              </FormControl>
            </Grid>
            {/* current marks */}
            <Grid item xs={12}>
              <Typography variant="body1">Current Marks</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Marks"
                fullWidth
                name="curMarks"
                value={studentData.curMarks}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography id="cur-percentage-slider" gutterBottom>
                Current Percentage
              </Typography>
              <Slider
                aria-labelledby="cur-percentage-slider"
                valueLabelDisplay="auto"
                step={1}
                marks
                min={0}
                max={100}
                value={studentData.curPercentage}
                onChange={handleCurPercentageChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="SGPA"
                fullWidth
                name="curSgpa"
                value={studentData.curSgpa}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="cur-semester-label">Semester</InputLabel>
                <Select
                  labelId="cur-semester-label"
                  id="cur-semester-select"
                  value={studentData.curSemester}
                  name="curSemester"
                  onChange={handleInputChange}
                >
                  <MenuItem value={1}>Semester 1</MenuItem>
                  <MenuItem value={2}>Semester 2</MenuItem>
                  <MenuItem value={3}>Semester 3</MenuItem>
                  <MenuItem value={4}>Semester 4</MenuItem>
                  <MenuItem value={5}>Semester 5</MenuItem>
                  <MenuItem value={6}>Semester 6</MenuItem>
                  {/* Add more semesters as needed */}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Dashboard;
