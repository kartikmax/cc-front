import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";

const getRandomColor = () => {
  const color = "#" + Math.floor(Math.random() * 16777215).toString(16);
  return color;
};

const VoiceNote = () => {
  const [todos, setTodos] = useState([]);

  const transcriptCollection = collection(db, "transcript");

  const { transcript, resetTranscript } = useSpeechRecognition({
    continuous: true,
  });

  useEffect(() => {
    const fetchTranscripts = async () => {
      try {
        const querySnapshot = await getDocs(transcriptCollection);
        const transcripts = [];
        querySnapshot.forEach((doc) => {
          transcripts.push({
            id: doc.id,
            transcript_text: doc.data().transcript_text,
          });
        });
        setTodos(transcripts);
      } catch (error) {
        console.error("Error fetching transcripts:", error);
      }
    };

    fetchTranscripts();
  }, []);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  const handleSave = async () => {
    try {
      const docRef = await addDoc(transcriptCollection, {
        transcript_text: transcript,
      });

      const newTodo = {
        id: docRef.id,
        transcript_text: transcript,
      };

      setTodos([...todos, newTodo]);
      resetTranscript();
    } catch (error) {
      console.error("Error saving transcript:", error);
    }
  };

  return (
    <div style={{ overflowX: "hidden" }}>
      <Typography variant="h4"> Previous Transcripts</Typography>
      <Grid
        container
        spacing={2}
        sx={{ margin: "32px 0", overflow: "auto", maxHeight: "100%" }}
      >
        {todos.map((todo) => (
          <Grid item xs={12} sm={6} md={4} key={todo.id}>
            <Paper
              elevation={3}
              sx={{
                padding: "16px",
                overflow: "auto",
                background: getRandomColor(),
              }}
            >
              <Typography variant="h6">{todo.transcript_text}</Typography>
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
          backgroundColor: "#a1ef48",
        }}
      >
        <Typography variant="h5" sx={{ padding: "1.25rem" }}>
          Voice Notes:
        </Typography>
        <Typography variant="body1" sx={{ padding: "1.25rem" }}>
          {transcript}
        </Typography>
      </Paper>
      <TableContainer component={Paper} sx={{ width: "90%", margin: "16px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Transcript</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todos.map((todo) => (
              <TableRow key={todo.id}>
                <TableCell>{todo.id}</TableCell>
                <TableCell>{todo.transcript_text}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default VoiceNote;
