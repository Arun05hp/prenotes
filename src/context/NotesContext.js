import createDataContext from "./createDataContext";
import http from "../services/httpService";
const notesReducer = (state, action) => {
  switch (action.type) {
    case "setNotes":
      return { ...state, notesData: action.payload };
    case "setExampaper":
      return { ...state, examData: action.payload };
    case "loading":
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

const getNotes = (dispatch) => (userId) => {
  dispatch({ type: "loading", payload: true });

  http
    .get("upload/notes/" + userId)
    .then((res) => {
      return res.data;
    })
    .then((res) => {
      dispatch({ type: "setNotes", payload: res.notesData });
      dispatch({ type: "loading", payload: false });
    })
    .catch((err) => {
      dispatch({ type: "loading", payload: false });
    });
};

const getExampaper = (dispatch) => (userId) => {
  dispatch({ type: "loading", payload: true });
  http
    .get("exam/exampaper/" + userId)
    .then((res) => {
      return res.data;
    })
    .then((res) => {
      dispatch({ type: "setExampaper", payload: res.examData });
      dispatch({ type: "loading", payload: false });
    })
    .catch((err) => {
      dispatch({ type: "loading", payload: false });
    });
};

export const { Provider, Context } = createDataContext(
  notesReducer,
  { getNotes, getExampaper },
  { notesData: [], examData: [], isLoading: false }
);
