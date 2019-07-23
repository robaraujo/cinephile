import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";

import MainLayout from "../../layouts/Main";
import { PosterImg, LoadingGlobal, MovieDescription } from "../../components";
import { get } from "../../store/movie";

class MovieDetail extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.onGet(id);
  }

  componentDidUpdate(prevProps) {
    const { id } = this.props.match.params;
    if (id !== prevProps.match.params.id) {
      this.props.onGet(id);
    }
  }

  gradientBg(src) {
    const bgGrad =
      "linear-gradient(to left, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 1))";
    const bgImg = "url('" + src + "')";
    return {
      backgroundSize: "cover",
      backgroundImage: bgGrad + "," + bgImg
    };
  }

  render() {
    const { movie } = this.props.actual;
    const { classes } = this.props;

    if (!movie) {
      return <LoadingGlobal />;
    }

    return (
      <MainLayout>
        <Grid container style={this.gradientBg(movie.backdrop_path)}>
          <Grid item xs={4} item>
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

const mapStateToProps = ({ movie }) => {
  return {
    actual: movie.actual
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGet: id => dispatch(get(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieDetail);
