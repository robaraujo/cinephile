import React from "react";
import { Container, Typography, Link } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

const styles = theme => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(8),
    padding: theme.spacing(6, 0)
  }
});

const Footer = props => (
  <footer className={props.classes.footer}>
    <Container maxWidth="lg">
      <Typography variant="h6" align="center" gutterBottom>
        Footer
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="textSecondary"
        component="p"
      >
        Something here to give the footer a purpose!
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center">
        {"Built with love by the "}
        <Link color="inherit" href="https://material-ui.com/">
          Material-UI
        </Link>
        {" team."}
      </Typography>
    </Container>
  </footer>
);

export default withStyles(styles)(Footer);
