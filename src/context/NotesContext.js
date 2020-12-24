import createDataContext from "./createDataContext";
import http from "../services/httpService";
const notesReducer = (state, action) => {
  switch (action.type) {
    case "setNotes":
      return { ...state, notesData: action.payload };
    case "setExampaper":
      return { ...state, examData: action.payload };
    default:
      return state;
  }
};

const getNotes = (dispatch) => (userId) => {
  try {
    http
      .get("upload/notes/" + userId)
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        console.log(res);
        dispatch({ type: "setNotes", payload: res.notesData });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log("err", error);
  }
};

const getExampaper = (dispatch) => (userId) => {
  try {
    http
      .get("exam/exampaper/" + userId)
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        console.log(res);
        dispatch({ type: "setExampaper", payload: res.examData });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log("err", error);
  }
};

export const { Provider, Context } = createDataContext(
  notesReducer,
  { getNotes, getExampaper },
  { notesData: [], examData: [] }
);
