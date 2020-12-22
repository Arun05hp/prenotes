import createDataContext from "./createDataContext";
import http from "../services/httpService";

const bookReducer = (state, action) => {
  switch (action.type) {
    case "setBooks":
      return { ...state, booksData: action.payload };
    default:
      return state;
  }
};

const getBooks = (dispatch) => (userId) => {
  try {
    http
      .get("upload/books/" + userId)
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        console.log(res);
        dispatch({ type: "setBooks", payload: res.booksData });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log("err", error);
  }
};

export const { Provider, Context } = createDataContext(
  bookReducer,
  { getBooks },
  { booksData: [] }
);
