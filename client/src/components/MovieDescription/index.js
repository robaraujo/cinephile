import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Star as IconStar } from '@material-ui/icons';
import { movieType } from '../../types';

const useStyles = makeStyles({
  separator: {
    padding: '20px 0',
  },
});

export default function MovieDescription({ movie }) {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h2">{movie.title}</Typography>
      <Typography
        variant="body1"
        className={classes.separator}
        color="secondary"
      >
        {movie.tagline}
      </Typography>
      <Grid container justify="space-between">
        <Grid item xs={6}>
          <Typography variant="body1">
            <IconStar style={{ fontSize: 14 }} />
            {movie.vote_average}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">{movie.release_date}</Typography>
        </Grid>
      </Grid>
      <Typography variant="body2" className={classes.separator}>
        {movie.genres_string}
      </Typography>
      <Typography variant="caption">{movie.overview}</Typography>
    </>
  );
}

MovieDescription.propTypes = {
  movie: movieType.isRequired,
};
