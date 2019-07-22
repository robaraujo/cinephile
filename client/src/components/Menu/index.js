import React from "react";
import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import SearchInput from "../SearchInput";
import { Link } from "react-router-dom";

const styles = theme => ({
  menu: {
    padding: "17px 0"
  },
  logo: {
    width: "130px"
  }
});

const imgLogo = require("../../assets/images/logo.png");

const Menu = props => {
  const { classes, search, onSearch } = props;
  return (
    <Grid className={classes.menu} container justify="space-between">
      <Grid item xs={12} sm={4}>
        <Link to="/">
          <img src={imgLogo} className={classes.logo} />
        </Link>
      </Grid>
      <Grid item xs={12} sm={8}>
        <SearchInput {...search} onSearch={onSearch} />
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(Menu);
