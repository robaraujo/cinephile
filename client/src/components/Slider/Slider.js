import React from "react";
import Carousel from "nuka-carousel";
import { withStyles } from "@material-ui/styles";
import { Typography, Hidden } from "@material-ui/core";

const styles = theme => ({
  root: {
    cursor: "normal",
    paddingBottom: theme.spacing(1),
    height: "39vw !important",
    maxHeight: 495,
    position: "relative"
  },
  img: {
    width: "100%"
  },
  title: {
    [theme.breakpoints.down("xs")]: {
      fontSize: 14
    }
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
  text: {
    padding: 20,
    width: "100%",
    background: "rgba(0,0,0,0.4)",
    [theme.breakpoints.down("xs")]: {
      fontSize: 12,
      padding: "0 9px 7px 9px"
    }
  },
  description: {
    width: "96%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  }
});

const images = [
  {
    id: 1,
    title: "Toy Story 4",
    desc:
      "With Andy growing up and heading off to college Toy Story 3 felt very much like the end of an era, so much so that we almost believed Disney's assurances that the series had been relegate to the great toybox in the sky.",
    img: require("../../assets/images/slider/3.png")
  },
  {
    id: 2,
    title: "Aquaman",
    desc:
      "Aquaman is a 2018 American superhero film based on the DC Comics character Aquaman and distributed by Warner Bros. Entertainment. It is the sixth installment in the DC Extended Universe (DCEU). The film is directed by James Wan, from a screenplay by David Leslie Johnson-McGoldrick and Will Beall, and is based on a story written by Geoff Johns, Wan and Beall.",
    img: require("../../assets/images/slider/1.png")
  },
  {
    id: 3,
    title: "Fast and Furiuos 9",
    desc:
      "Hobbs & Shaw (also known as Fast & Furious Presents: Hobbs & Shaw) is a 2019 American action film directed by David Leitch and written by Chris Morgan and Drew Pearce, based on a story by Morgan. It is a spin-off of The Fast and the Furious franchise. The film stars Dwayne Johnson and Jason Statham as Luke Hobbs and Deckard Shaw, characters that first appeared in The Fast and the Furious films. Idris Elba, Vanessa Kirby, and Helen Mirren also star.",
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
            <div className={classes.text}>
              <Typography variant="h2" className={classes.title}>
                {img.title}
              </Typography>
              <Typography className={classes.description} variant="body1">
                {img.desc}
              </Typography>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default withStyles(styles)(Slider);
