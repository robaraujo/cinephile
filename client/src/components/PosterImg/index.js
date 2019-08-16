import React from 'react';
import { makeStyles } from '@material-ui/styles';
import PropTypes from '../../types';

const useStyles = makeStyles({
  root: {
    position: 'relative',
  },
  fakeImg: {
    width: '100%',
    height: '100%',
  },
  img: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

export default function PosterImg(props) {
  const { src, className } = props;
  const classes = useStyles();
  const fakeImg = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 750"%3E%3C/svg%3E';

  return (
    <div className={`${classes.root} ${className}`}>
      <img className={classes.fakeImg} src={fakeImg} alt="poster-img" />
      <img className={classes.img} src={src} alt="poster-img" />
    </div>
  );
}

PosterImg.propTypes = {
  src: PropTypes.string.isRequired,
  className: PropTypes.string,
};

PosterImg.defaultProps = {
  className: '',
};
