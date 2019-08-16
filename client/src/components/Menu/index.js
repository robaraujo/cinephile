import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import SearchInput from '../SearchInput';

const useStyles = makeStyles({
  root: {
    padding: '17px 0',
  },
  logo: {
    width: '130px',
  },
});

const imgLogo = require('../../assets/images/logo.png');

export default () => {
  const classes = useStyles();
  return (
    <Grid className={classes.root} container justify="space-between">
      <Grid item xs={12} sm={4}>
        <Link to="/">
          <img src={imgLogo} className={classes.logo} alt="logo" />
        </Link>
      </Grid>
      <Grid item xs={12} sm={8}>
        <SearchInput />
      </Grid>
    </Grid>
  );
};
