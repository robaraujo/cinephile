import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Views
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetails';

const Routes = () => (
  <Switch>
    <Route component={Home} exact path="/" />
    <Route component={MovieDetail} exact path="/movie/:id" />
    <Redirect to="/not-found" />
  </Switch>
);

export default Routes;
