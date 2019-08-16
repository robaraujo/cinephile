import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Star as IconStar } from '@material-ui/icons';
import { Typography, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import PosterImg from '../PosterImg';
import { movieType } from '../../types';

const useStyles = makeStyles({
  root: {
    cursor: 'pointer',
    transition: 'opacity 0.3s',
    position: 'relative',
    textDecoration: 'none',
    '&:hover div': {
      opacity: '1',
    },
  },
  poster: {
    position: 'relative',
  },
  overlay: {
    background: 'rgba(0,0,0,.4)',
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    zIndex: 1,
    transition: 'opacity .25s ease-in-out',
    opacity: 0,
  },
  posterImg: {
    width: '100%',
    minHeight: '264px',
  },
  genres: {
    display: 'inline-block',
    borderRadius: 2,
    background: '#fbc40e',
    padding: '3px 5px',
    position: 'absolute',
    top: 10,
    right: -4,
    zIndex: 2,
  },
});

export default function MovieCard(props) {
  const { movie } = props;
  const classes = useStyles();

  return (
    <Link to={`/movie/${movie.id}`} className={classes.root}>
      <div className={classes.poster}>
        {movie.first_genre && (
          <Typography variant="body2" className={classes.genres}>
            {movie.first_genre}
          </Typography>
        )}
        <div className={classes.overlay} />
        <PosterImg className={classes.posterImg} src={movie.poster_path} />
      </div>
      <div>
        <Typography variant="h6">{movie.title}</Typography>
        <Grid container justify="space-between">
          <Grid item>
            <Typography variant="body1" color="secondary">
              {movie.release_date}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" color="secondary">
              <IconStar style={{ fontSize: 14 }} />
              {' '}
              {movie.vote_average}
            </Typography>
          </Grid>
        </Grid>
      </div>
    </Link>
  );
}

MovieCard.propTypes = {
  movie: movieType.isRequired,
};
