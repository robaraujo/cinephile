import axios from "axios";

// Action Types
export const Types = {
  GET_REQUEST: "movie/GET_REQUEST",
  GET_SUCCESS: "movie/GET_SUCCESS",
  GET_FAILURE: "movie/GET_FAILURE",
  PAGINATE_REQUEST: "movie/PAGINATE_REQUEST",
  PAGINATE_SUCCESS: "movie/PAGINATE_SUCCESS",
  PAGINATE_FAILURE: "movie/PAGINATE_FAILURE",
  SEARCH_REQUEST: "movie/SEARCH_REQUEST",
  SEARCH_SUCCESS: "movie/SEARCH_SUCCESS",
  SEARCH_FAILURE: "movie/SEARCH_FAILURE"
};

// Reducer
const initialState = {
  actual: {
    movie: null,
    loading: false,
    error: null
  },
  paginate: {
    list: [],
    page: 0,
    totalPages: null,
    loading: null
  },
  search: {
    list: [],
    loading: false,
    error: null
  }
};
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.GET_REQUEST:
      return {
        ...state,
        actual: {
          movie: null,
          loading: true,
          error: null
        }
      };
    case Types.GET_SUCCESS:
      return {
        ...state,
        actual: {
          movie: action.payload,
          loading: false,
          error: null
        }
      };
    case Types.GET_FAILURE:
      return {
        ...state,
        actual: {
          movie: null,
          loading: false,
          error: action.payload
        }
      };
    case Types.PAGINATE_REQUEST:
      return {
        ...state,
        paginate: {
          ...state.paginate,
          loading: true,
          error: null
        }
      };
    case Types.PAGINATE_SUCCESS:
      const { results, page, total_pages } = action.payload;
      const list = page === 1 ? results : state.paginate.list.concat(results);

      return {
        ...state,
        paginate: {
          page,
          list,
          loading: false,
          error: null,
          totalPages: total_pages
        }
      };
    case Types.PAGINATE_FAILURE:
      return {
        ...state,
        paginate: {
          ...state.paginate,
          loading: false,
          error: action.payload
        }
      };
    case Types.SEARCH_REQUEST:
      return {
        ...state,
        search: {
          list: [],
          loading: true,
          error: null
        }
      };
    case Types.SEARCH_SUCCESS:
      return {
        ...state,
        search: {
          list: action.payload,
          loading: false,
          error: null
        }
      };
    case Types.SEARCH_FAILURE:
      return {
        ...state,
        search: {
          list: [],
          loading: false,
          error: action.payload
        }
      };
    default:
      return state;
  }
}

// Action Creators

/**
 * Get all emails validate from this user
 */
export function get(id) {
  return dispatch => {
    dispatch({ type: Types.GET_REQUEST });
    axios.get("/movie/" + id).then(
      res => {
        dispatch({
          type: Types.GET_SUCCESS,
          payload: res.data
        });
      },
      err => {
        dispatch({
          type: Types.GET_FAILURE,
          payload: (err.response && err.response.data.error) || "Server error"
        });
      }
    );
  };
}

/**
 * Get all emails validate from this user
 */
export function paginate() {
  return (dispatch, getState) => {
    dispatch({ type: Types.PAGINATE_REQUEST });
    let page = getState().movie.paginate.page + 1;

    axios.get("/movies-page/" + page).then(
      res => {
        dispatch({
          type: Types.PAGINATE_SUCCESS,
          payload: res.data
        });
      },
      err => {
        dispatch({
          type: Types.PAGINATE_FAILURE,
          payload: (err.response && err.response.data.error) || "Server error"
        });
      }
    );
  };
}

/**
 * Get all emails validate from this user
 */
export function search(text) {
  return dispatch => {
    dispatch({ type: Types.SEARCH_REQUEST });
    axios.get("/movies-search/" + text).then(
      res => {
        // no results found
        if (!res.data.results.length) {
          return dispatch({
            type: Types.SEARCH_FAILURE,
            payload: "no movies found"
          });
        }

        dispatch({
          type: Types.SEARCH_SUCCESS,
          payload: res.data.results
        });
      },
      err => {
        dispatch({
          type: Types.SEARCH_FAILURE,
          payload: (err.response && err.response.data.error) || "Server error"
        });
      }
    );
  };
}
