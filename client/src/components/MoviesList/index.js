import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import { Grid, Typography, CircularProgress } from '@material-ui/core';
import debounce from 'lodash.debounce';
import PropTypes from 'prop-types';

import { compose } from 'recompose';
import { MovieCard, LoadingGlobal } from '..';
import { paginate } from '../../store/movie';
import { movieType } from '../../types';

const styles = {
  loadingWrap: {
    width: '100%',
    textAlign: 'center',
    paddingBottom: 16,
  },
  loadingText: {
    fontSize: '17px',
    marginRight: '7px',
  },
  loadingProgress: {
    verticalAlign: 'middle',
  },
};

class MoviesList extends Component {
  componentDidMount() {
    const { onPaginate } = this.props;
    onPaginate();
    this.initInfiniteScroll();
  }

  initInfiniteScroll() {
    window.onscroll = debounce(() => {
      const hasMore = true;
      const { loading, onPaginate } = this.props;

      // prevent to load data
      if (loading || !hasMore) return;

      // Checks that the page has scrolled to the bottom
      const { scrollTop, offsetHeight } = document.documentElement;
      if (window.innerHeight + scrollTop + 400 > offsetHeight) {
        onPaginate();
      }
    }, 100);
  }

  render() {
    const { list, loading, classes } = this.props;

    if (!list.length) {
      return <LoadingGlobal />;
    }

    return (
      <Grid container spacing={4} className={classes.cardGrid}>
        {list.map((movie) => (
          <Grid item key={movie.id} xs={6} md={3} lg={2}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
        {loading && (
          <div className={classes.loadingWrap}>
            <Typography variant="caption" className={classes.loadingText}>
              loading movies
            </Typography>
            <CircularProgress size={33} className={classes.loadingProgress} color="secondary" />
          </div>
        )}
      </Grid>
    );
  }
}

MoviesList.propTypes = {
  list: PropTypes.arrayOf(movieType).isRequired,
  loading: PropTypes.bool.isRequired,
  onPaginate: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = ({ movie }) => movie.pagination;

const mapDispatchToProps = (dispatch) => ({
  onPaginate: () => dispatch(paginate()),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
)(MoviesList);
