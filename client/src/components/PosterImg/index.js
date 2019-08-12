import React from "react";
import { withStyles } from "@material-ui/styles";

const styles = theme => ({
  fakeImg: {
    width: "100%",
    height: "100%"
  },
  img: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0
  }
});

const PosterImg = props => {
  const { src, classes, className } = props;
  const fakeImg = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 750"%3E%3C/svg%3E`;

  return (
    <div className={className} style={{ position: "relative" }}>
      <img className={classes.fakeImg} src={fakeImg} alt="Poster Image" />
      <img className={classes.img} src={src} alt="Poster Image" />
    </div>
  );
};
export default withStyles(styles)(PosterImg);
