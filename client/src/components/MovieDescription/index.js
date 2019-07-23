import React, { Component } from "react";
import { Grid, Typography } from "@material-ui/core";
import { Star as IconStar } from "@material-ui/icons";
import { withStyles } from "@material-ui/styles";

const styles = theme => ({
  separator: {
    padding: "20px 0"
  }
});

class MovieDescription extends Component {
  render() {
    const { movie, classes } = this.props;
    return (
      <React.Fragment>
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
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(MovieDescription);
