import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "../firebase-config";
import { Button, Input, Snackbar, Alert } from "@mui/material";
import { v4 } from "uuid";
import { formatDistanceToNow } from "date-fns";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

function Updates() {
  const [quotes, setQuotes] = useState([]);
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [open, setOpen] = useState({
    open: false,
    position: { vertical: "top", horizontal: "right" },
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen((prevState) => ({ ...prevState, open: false }));
  };

  const imagesListRef = ref(storage, "images/");
  const uploadFile = (newState) => () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setImageUrls((prev) => [...prev, { url, uploadedAt: new Date() }]);
          setOpen({ open: true, ...newState }); // Show the Snackbar
        });
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      const urls = [];
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          urls.push({ url, uploadedAt: new Date() });
        });
      });
      setImageUrls(urls);
    });
  }, []);

  useEffect(() => {
    const fetchQuotes = async () => {
      const uniqueUrls = Array.from(new Set(imageUrls.map((item) => item.url)));
      const response = await fetch("https://type.fit/api/quotes");
      const data = await response.json();
      const selectedQuotes = data.slice(0, uniqueUrls.length);
      setQuotes(selectedQuotes);
    };

    fetchQuotes();
  }, [imageUrls]);

  const getCaption = (index) => {
    const quote = quotes[index % quotes.length];

    if (quote && quote.text.length > 40) {
      const slicedCaption = quote.text.slice(0, 40);
      return `${slicedCaption}...`;
    }

    return quote ? quote.text : "";
  };

  const getTimeElapsed = (uploadedAt) => {
    return formatDistanceToNow(uploadedAt, { addSuffix: true });
  };

  return (
    <>
      <h1>Image Gallery</h1>
      <Input
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />
      <Button
        onClick={uploadFile({
          position: { vertical: "top", horizontal: "right" },
        })}
      >
        Upload Image
      </Button>
      <Snackbar
        open={open.open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={open.position}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Here the image is uploaded
        </Alert>
      </Snackbar>
      <Grid container spacing={2.15}>
        {imageUrls.map((item, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                margin: "auto",
                maxWidth: 500,
                flexGrow: 1,
                backgroundColor: "#fffde4",
              }}
            >
              <Grid container spacing={2}>
                <Grid item>
                  <ButtonBase sx={{ width: 128, height: 128 }}>
                    <Img alt="complex" src={item.url} />
                  </ButtonBase>
                </Grid>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography
                      gutterBottom
                      variant="subtitle1"
                      component="div"
                    >
                      Image sent
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {getCaption(index)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      #instagood #instamood
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="caption">
                      {getTimeElapsed(item.uploadedAt)}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default Updates;
