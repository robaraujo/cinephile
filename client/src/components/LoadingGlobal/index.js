import React from "react";
import { withStyles } from "@material-ui/styles";
import { CircularProgress } from "@material-ui/core";

const styles = theme => ({
  root: {
    display: "flex",
    width: "100%",
    height: "100%",
    position: "fixed",
    left: 0,
    top: 0,
    background: "rgba(0, 0, 0, 0.86)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999
  }
});

const LoadingGlobal = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <CircularProgress color="secondary" />
    </div>
  );
};

export default withStyles(styles)(LoadingGlobal);
