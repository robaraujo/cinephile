import React, { Component } from "react";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { createBrowserHistory } from "history";
import { ThemeProvider } from "@material-ui/styles";
import axios from "axios";

import theme from "./theme";
import Routes from "./Routes";
import configureStore from "./store/configStore";

axios.defaults.baseURL = "http://127.0.0.1:8000/api/";
const { store, persistor } = configureStore();
const browserHistory = createBrowserHistory();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <Router history={browserHistory}>
              <Routes />
            </Router>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    );
  }
}
