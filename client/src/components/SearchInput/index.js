import React, { Component } from "react";
import Downshift from "downshift";
import debounce from "lodash.debounce";
import { Search as SearchIcon, Star as IconStar } from "@material-ui/icons";
import { withStyles } from "@material-ui/styles";
import { CircularProgress, Typography, InputBase } from "@material-ui/core";
import { fade } from "@material-ui/core/styles";
import PosterImg from "../PosterImg";
import { Link } from "react-router-dom";

const styles = theme => ({
  root: {
    position: "relative",
    maxWidth: "100%",
    float: "right",
    [theme.breakpoints.down("xs")]: {
      width: "100%"
    }
  },
  suggestions: {
    top: 16,
    cursor: "pointer",
    position: "absolute",
    zIndex: "999999",
    width: "100%",
    listStyle: "none",
    padding: 0
  },
  suggestion: {
    display: "flex",
    textDecoration: "none"
  },
  suggestionImg: {
    width: 40,
    height: 50
  },
  suggestionText: {
    width: "calc(100% - 40px)",
    padding: 6
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "#fff"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 170,
      "&:focus": {
        width: 300
      }
    }
  }
});

class SearchInput extends Component {
  changeSearch = debounce(value => {
    this.props.onSearch(value);
  }, 500);

  input = (getInputProps, classes) => (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        {this.props.loading ? <CircularProgress size={20} /> : <SearchIcon />}
      </div>
      <InputBase
        {...getInputProps({
          classes: {
            root: classes.inputRoot,
            input: classes.inputInput
          },
          placeholder: "search a movie",
          onChange: evt => this.changeSearch(evt.target.value)
        })}
      />
    </div>
  );

  item = (movie, classes) => (
    <Link to={"/movie/" + movie.id} className={classes.suggestion}>
      <PosterImg className={classes.suggestionImg} src={movie.poster_path} />
      <div className={classes.suggestionText}>
        <Typography variant="h6" color="secondary">
          {movie.title}
        </Typography>
        <Typography variant="caption">
          {movie.release_date}
          {"   "}
          <IconStar style={{ fontSize: 14 }} />
          {movie.vote_average}
        </Typography>
      </div>
    </Link>
  );

  render() {
    const { classes, list } = this.props;
    return (
      <Downshift
        onChange={selection => {
          if (selection) {
            alert(selection);
          }
        }}
        itemToString={item => (item ? item.value : "")}
      >
        {({
          getInputProps,
          getItemProps,
          getMenuProps,
          isOpen,
          highlightedIndex,
          selectedItem
        }) => (
          <div className={classes.root}>
            {this.input(getInputProps, classes)}
            <ul {...getMenuProps({ className: classes.suggestions })}>
              {isOpen
                ? list.map((movie, index) => (
                    <li
                      {...getItemProps({
                        key: movie.id,
                        index,
                        item: movie,
                        style: {
                          backgroundColor:
                            highlightedIndex === index ? "lightgray" : "white",
                          fontWeight: selectedItem === movie ? "bold" : "normal"
                        }
                      })}
                    >
                      {this.item(movie, classes)}
                    </li>
                  ))
                : null}
            </ul>
          </div>
        )}
      </Downshift>
    );
  }
}

export default withStyles(styles)(SearchInput);
