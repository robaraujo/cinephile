import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import { Grid, Typography, CircularProgress } from "@material-ui/core";
import debounce from "lodash.debounce";
import { MovieCard } from "..";

const styles = theme => ({
  loadingWrap: {
    width: "100%",
    textAlign: "center",
    paddingBottom: theme.spacing(2)
  },
  loadingText: {
    fontSize: "17px",
    marginRight: "7px"
  },
  loadingProgress: {
    verticalAlign: "middle"
  }
});

class MoviesList extends Component {
  componentDidMount() {
    this.props.onPaginate();
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
    const { classes, list, loading } = this.props;
    return (
      <Grid container spacing={4} className={classes.cardGrid}>
        {list.map(movie => (
          <Grid item key={movie.id} xs={6} md={3} lg={2}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
        {loading && (
          <div className={classes.loadingWrap}>
            <Typography variant="caption" className={classes.loadingText}>
              loading movies
            </Typography>
            <CircularProgress size={33} className={classes.loadingProgress} />
          </div>
        )}
      </Grid>
    );
  }
}

export default withStyles(styles)(MoviesList);
