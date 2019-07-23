import React, { Component } from "react";
import { connect } from "react-redux";
import { Container } from "@material-ui/core";

import { Menu } from "../../components";
import { search } from "../../store/movie";

class MainLayout extends Component {
  render() {
    const { search, onSearch } = this.props;

    return (
      <Container maxWidth="lg">
        <Menu search={search} onSearch={onSearch} />
        <main>{this.props.children}</main>
      </Container>
    );
  }
}

const mapStateToProps = ({ movie }) => {
  return {
    search: movie.search
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSearch: query => dispatch(search(query))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainLayout);
