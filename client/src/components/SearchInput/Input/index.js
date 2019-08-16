/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Search as SearchIcon } from '@material-ui/icons';
import { CircularProgress, InputBase, makeStyles } from '@material-ui/core';
import { fade } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: '#fff',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 170,
      '&:focus': {
        width: 300,
      },
    },
  },
}));

export default ({ getInputProps, loading, changeSearch }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.searchIcon}>
        {loading ? <CircularProgress size={20} /> : <SearchIcon />}
      </div>
      <InputBase
        {...getInputProps({
          classes: {
            root: classes.inputRoot,
            input: classes.inputInput,
          },
          placeholder: 'search a movie',
          onChange: (evt) => changeSearch(evt.target.value),
        })}
      />
    </div>
  );
};
