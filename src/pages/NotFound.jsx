import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, Grid } from '@mui/material';
import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      className={styles.notFoundContainer}
    >
      <Grid item>
        <Typography variant="h1" className={styles.title} gutterBottom>
          404
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="h2" className={styles.subtitle} gutterBottom>
          Page Not Found
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body1" className={styles.text} gutterBottom>
          The page you are looking for does not exist.
        </Typography>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/"
          size="large"
          className={styles.button}
        >
          Go back to the homepage
        </Button>
      </Grid>
    </Grid>
  );
};

export default NotFound;
