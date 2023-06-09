import React, { useState } from "react";
import { Button, Grid, Paper, Typography } from "@mui/material";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import axios from "axios";

const VoiceNote = () => {
  const [todos, setTodos] = useState([]);

  const { transcript, resetTranscript } = useSpeechRecognition({
    continuous: true,
  });

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  const handleSave = async () => {
    
    const newTodo = {
      id: response.data.id,
      title: transcript,
    };
    setTodos([...todos, newTodo]);
    resetTranscript();
   
  };

  return (
    <div style={{ overflowX: "hidden" }}>
      <Grid
        container
        spacing={2}
        sx={{ margin: "32px 0", overflow: "auto", maxHeight: "100%" }}
      >
        {todos.map((todo) => (
          <Grid item xs={12} sm={6} md={4} key={todo.id}>
            <Paper elevation={3} sx={{ padding: "16px", overflow: "auto" }}>
              <Typography variant="h6">{todo.title}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Grid container alignItems="center" justifyContent="space-around">
        <Button variant="contained" onClick={SpeechRecognition.startListening}>
          Start
        </Button>
        <Button variant="contained" onClick={SpeechRecognition.stopListening}>
          Stop
        </Button>
        <Button variant="contained" onClick={resetTranscript}>
          Reset
        </Button>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </Grid>
      <Paper
        variant="elevation"
        elevation={4}
        sx={{
          width: "90%",
          height: "12.5rem",
          padding: "16px",
          margin: "16px",
        }}
      >
        <Typography variant="h5" sx={{ color: "green", padding: "1.25rem" }}>
          Voice Notes:
        </Typography>
        <Typography variant="body1" sx={{ color: "green", padding: "1.25rem" }}>
          {transcript}
        </Typography>
      </Paper>
    </div>
  );
};

export default VoiceNote;
