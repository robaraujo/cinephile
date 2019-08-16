import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    width: '100%',
    height: '100%',
    position: 'fixed',
    left: 0,
    top: 0,
    background: 'rgba(0, 0, 0, 0.86)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
});

export default () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CircularProgress color="secondary" />
    </div>
  );
};
