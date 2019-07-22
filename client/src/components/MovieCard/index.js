import React from "react";
import { withStyles } from "@material-ui/styles";
import { Star as IconStar } from "@material-ui/icons";
import { Typography, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import PosterImg from "../PosterImg";

const styles = theme => ({
  movieCard: {
    cursor: "pointer",
    transition: "opacity 0.3s",
    position: "relative",
    textDecoration: "none",
    "&:hover div": {
      opacity: "1"
    }
  },
  poster: {
    position: "relative"
  },
  overlay: {
    background: "rgba(0,0,0,.4)",
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    zIndex: 1,
    transition: "opacity .25s ease-in-out",
    opacity: 0
  },
  posterImg: {
    width: "100%",
    minHeight: "264px"
  }
});

const MovieCard = props => {
  const { classes, movie } = props;

  return (
    <Link to={"/movie/" + movie.id} className={classes.movieCard}>
      <div className={classes.poster}>
        <div className={classes.overlay} />
        <PosterImg className={classes.posterImg} src={movie.poster_path} />
      </div>
      <div>
        <Typography variant="h6">{movie.title}</Typography>
        <Grid container justify="space-between">
          <Grid item>
            <Typography variant="body1" color="secondary">
              {movie.release_date}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" color="secondary">
              <IconStar style={{ fontSize: 14 }} /> {movie.vote_average}
            </Typography>
          </Grid>
        </Grid>
      </div>
    </Link>
  );
};

export default withStyles(styles)(MovieCard);
