import React, { Component } from "react";
import { connect } from "react-redux";

import { MoviesList, Slider } from "../../components";
import MainLayout from "../../layouts/Main";
import { paginate } from "../../store/movie";

class Home extends Component {
  render() {
    const { paginate, onPaginate } = this.props;

    return (
      <MainLayout>
        <Slider />
        <MoviesList {...paginate} onPaginate={onPaginate} />
      </MainLayout>
    );
  }
}

const mapStateToProps = ({ movie }) => {
  return {
    paginate: movie.paginate
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onPaginate: () => dispatch(paginate())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
