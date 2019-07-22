import React from "react";
import Carousel from "nuka-carousel";
import { withStyles } from "@material-ui/styles";
import { Typography } from "@material-ui/core";

const styles = theme => ({
  root: {
    cursor: "normal",
    paddingBottom: theme.spacing(1),
    height: "39vw !important",
    position: "relative"
  },
  img: {
    width: "100%"
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0, 0.4)",
    display: "flex",
    alignItems: "flex-end"
  },
  description: {
    padding: 20,
    width: "100%",
    background: "rgba(0,0,0,0.4)"
  }
});

const images = [
  {
    id: 1,
    title: "Toy Story 4",
    desc:
      "Woody has always been confident about his place in the world and that his priority is taking care of his kid, whether that’s Andy or Bonnie.",
    img: require("../../assets/images/slider/3.png")
  },
  {
    id: 2,
    title: "Aquaman",
    desc:
      "Development of an Aquaman film began in 2004, with several plans falling through over the years. In August 2014, Beall and Kurt Johnstad were hired to write two competing scripts and the film was officially announced in October 2014",
    img: require("../../assets/images/slider/1.jpg")
  },
  {
    id: 3,
    title: "Fast and Furiuos 9",
    desc:
      "Hobbs & Shaw is a 2019 American action film directed by David Leitch and written by Chris Morgan and Drew Pearce, based on a story by Morgan.",
    img: require("../../assets/images/slider/4.png")
  }
];

const Slider = props => {
  const { classes } = props;
  return (
    <Carousel className={classes.root}>
      {images.map(img => (
        <div key={img.id}>
          <img className={classes.img} src={img.img} />
          <div className={classes.overlay}>
            <div className={classes.description}>
              <Typography variant="h2">{img.title}</Typography>
              <Typography variant="body1">{img.desc}</Typography>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default withStyles(styles)(Slider);
