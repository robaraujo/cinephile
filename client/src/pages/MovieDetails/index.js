import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';

import PropTypes, { movieType, matchType } from '../../types';
import MainLayout from '../../layouts/Main';
import { PosterImg, LoadingGlobal, MovieDescription } from '../../components';
import { get } from '../../store/movie';

class MovieDetail extends Component {
  componentDidMount() {
    const { match, onGet } = this.props;
    onGet(match.params.id);
  }

  componentDidUpdate(prevProps) {
    const { match, onGet } = this.props;
    if (match.params.id !== prevProps.match.params.id) {
      onGet(match.params.id);
    }
  }

  gradientBg() {
    const { movie } = this.props;
    const bgGrad = 'linear-gradient(to left, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 1))';
    const bgImg = `url('${movie.backdrop_path}')`;
    return {
      backgroundSize: 'cover',
      backgroundImage: `${bgGrad},${bgImg}`,
    };
  }

  render() {
    const { movie } = this.props;

    if (!movie) {
      return <LoadingGlobal />;
    }

    return (
      <MainLayout>
        <Grid container style={this.gradientBg()}>
          <Grid item xs={4}>
            <PosterImg src={movie.poster_path} />
          </Grid>
          <Grid item xs={8} style={{ padding: 20 }}>
            <MovieDescription movie={movie} />
          </Grid>
        </Grid>
      </MainLayout>
    );
  }
}

MovieDetail.propTypes = {
  movie: movieType.isRequired,
  match: matchType.isRequired,
  onGet: PropTypes.func.isRequired,
};

const mapStateToProps = ({ movie }) => movie.actual;

const mapDispatchToProps = (dispatch) => ({
  onGet: (id) => dispatch(get(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MovieDetail);
