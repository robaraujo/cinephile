import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Typography } from "@material-ui/core";
import { Star as IconStar, Movie } from "@material-ui/icons";

import { withStyles } from "@material-ui/styles";
import compose from "recompose/compose";

import MainLayout from "../../layouts/Main";
import { PosterImg } from "../../components";
import { get } from "../../store/movie";

const styles = theme => ({
  separator: {
    padding: "20px 0"
  },
  rightBar: {
    padding: 20
  }
});

class MovieDetail extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.onGet(id);
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
    const { loading, movie, error } = this.props.actual;
    const { classes } = this.props;

    if (!movie) {
      return <div>Carregando</div>;
    }

    return (
      <MainLayout>
        <Grid container style={this.gradientBg(movie.backdrop_path)}>
          <Grid item xs={4} item>
            <PosterImg src={movie.poster_path} />
          </Grid>
          <Grid item xs={8} className={classes.rightBar}>
            <Typography variant="h2">{movie.title}</Typography>
            <Typography
              variant="body1"
              className={classes.separator}
              color="secondary"
            >
              {movie.tagline}
            </Typography>
            <Grid container justify="space-between">
              <Grid item xs={6}>
                <Typography variant="body1">
                  <IconStar style={{ fontSize: 14 }} />
                  {movie.vote_average}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">{movie.release_date}</Typography>
              </Grid>
            </Grid>
            <Typography variant="body2" className={classes.separator}>
              {movie.genres_string}
            </Typography>
            <Typography variant="caption">{movie.overview}</Typography>
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

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(MovieDetail);
