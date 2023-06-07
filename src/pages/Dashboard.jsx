import React, { useState } from 'react';
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
} from '@mui/material';

import { BarChart } from '../components/charts/BarChart';
import { DoughnutChart } from '../components/charts/DoughnutChart';
import { LineChart } from '../components/charts/LineChart';
import { RadarChart } from '../components/charts/RadarChart';

function Dashboard() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [studentData, setStudentData] = useState({
    name: '',
    marks: '',
    percentage: 0,
    cgpa: '',
    semester: '',
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

  const handlePercentageChange = (event, value) => {
    setStudentData((prevData) => ({
      ...prevData,
      percentage: value,
    }));
  };

  const handleSave = () => {
    // Perform save logic using the studentData state
    console.log(studentData);
    handleDialogClose();
  };

  return (
    <>
      <Typography variant="h3" align="center">
        Dashboard
      </Typography>
      <Typography variant="h5" align="center">
        another progress part 1
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
        another progress part 2
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
            <Grid item xs={12} md={6}>
              <TextField
                label="Marks"
                fullWidth
                name="marks"
                value={studentData.marks}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography id="percentage-slider" gutterBottom>
                Percentage
              </Typography>
              <Slider
                aria-labelledby="percentage-slider"
                valueLabelDisplay="auto"
                step={1}
                marks
                min={0}
                max={100}
                value={studentData.percentage}
                onChange={handlePercentageChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="CGPA"
                fullWidth
                name="cgpa"
                value={studentData.cgpa}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="semester-label">Semester</InputLabel>
                <Select
                  labelId="semester-label"
                  id="semester-select"
                  value={studentData.semester}
                  name="semester"
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
