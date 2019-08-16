/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { Star as IconStar } from '@material-ui/icons';
import { Typography } from '@material-ui/core';
import PosterImg from '../PosterImg';
import { movieType } from '../../types';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    textDecoration: 'none',
  },
  suggestionImg: {
    width: 40,
    height: 50,
  },
  suggestionText: {
    width: 'calc(100% - 40px)',
    padding: 6,
  },
});

export default function MovieLink({ movie }) {
  const classes = useStyles();

  return (
    <Link to={`/movie/${movie.id}`} className={classes.root}>
      <PosterImg className={classes.suggestionImg} src={movie.poster_path} />
      <div className={classes.suggestionText}>
        <Typography variant="h6" color="secondary">
          {movie.title}
        </Typography>
        <Typography variant="caption">
          {movie.release_date}
          {'   '}
          <IconStar style={{ fontSize: 14 }} />
          {movie.vote_average}
        </Typography>
      </div>
    </Link>
  );
}

MovieLink.propTypes = {
  movie: movieType.isRequired,
};
