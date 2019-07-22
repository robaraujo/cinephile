import { createStore, compose, applyMiddleware } from "redux";
import { persistStore, persistCombineReducers } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import movieReducer from "./movie";

const reducers = {
  movie: movieReducer
};

// Persistor Configuration to whitelist movies
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["movieReducer"]
};
const persistedReducer = persistCombineReducers(persistConfig, reducers);

export default () => {
  const store = createStore(persistedReducer, compose(applyMiddleware(thunk)));
  const persistor = persistStore(store);
  return { store, persistor };
};
