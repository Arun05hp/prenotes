import createDataContext from "./createDataContext";
import http from "../services/httpService";

const bookReducer = (state, action) => {
  switch (action.type) {
    case "setBooks":
      return { ...state, booksData: action.payload };
    case "loading":
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

const getBooks = (dispatch) => (userId) => {
  dispatch({ type: "loading", payload: true });
  http
    .get("upload/books/" + userId)
    .then((res) => {
      return res.data;
    })
    .then((res) => {
      console.log(res);
      dispatch({ type: "setBooks", payload: res.booksData });
      dispatch({ type: "loading", payload: false });
    })
    .catch((err) => {
      dispatch({ type: "loading", payload: false });
    });
};

export const { Provider, Context } = createDataContext(
  bookReducer,
  { getBooks },
  { booksData: [], isLoading: false }
);
