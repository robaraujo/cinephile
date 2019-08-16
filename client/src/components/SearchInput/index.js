/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import Downshift from 'downshift';
import debounce from 'lodash.debounce';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import { compose } from 'recompose';

import { Typography } from '@material-ui/core';

import { search } from '../../store/movie';
import Input from './Input';
import { MovieLink } from '..';
import PropTypes, { movieType } from '../../types';

const styles = (theme) => ({
  root: {
    position: 'relative',
    maxWidth: '100%',
    float: 'right',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  error: {
    padding: 10,
    background: '#fff',
    color: '#000',
  },
  suggestions: {
    top: 16,
    cursor: 'pointer',
    position: 'absolute',
    zIndex: '999999',
    width: '100%',
    listStyle: 'none',
    padding: 0,
  },
});

class SearchInput extends Component {
  changeSearch = debounce((value) => {
    const { onSearch } = this.props;
    if (value) {
      onSearch(value);
    }
  }, 500);

  render() {
    const { changeSearch } = this;
    const {
      list, loading, error, classes,
    } = this.props;


    return (
      <Downshift itemToString={(item) => (item ? item.value : '')}>
        {({
          getInputProps, getItemProps, getMenuProps, isOpen, highlightedIndex,
        }) => (
          <div className={classes.root}>
            <Input {...{ getInputProps, loading, changeSearch }} />
            <ul {...getMenuProps({ className: classes.suggestions })}>
              {isOpen
                && list.map((movie, index) => (
                  <li
                    {...getItemProps({
                      key: movie.id,
                      index,
                      item: movie,
                      style: {
                        backgroundColor: highlightedIndex === index ? 'lightgray' : 'white',
                      },
                    })}
                  >
                    <MovieLink movie={movie} />
                  </li>
                ))}
              {isOpen && !list.length && !loading && error && (
                <Typography variant="body1" className={classes.error}>
                  {error}
                </Typography>
              )}
            </ul>
          </div>
        )}
      </Downshift>
    );
  }
}

SearchInput.propTypes = {
  list: PropTypes.arrayOf(movieType).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = ({ movie }) => movie.search;

const mapDispatchToProps = (dispatch) => ({
  onSearch: (query) => dispatch(search(query)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
)(SearchInput);
