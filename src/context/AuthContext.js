import createDataContext from "./createDataContext";

const authReducer = (state, action) => {
  switch (action.type) {
    case "login":
      return { ...state, loginFlag: action.payload };
    case "logout":
      return { ...state, loginFlag: false };
    default:
      return state;
  }
};

const tryLocalSignin = (dispatch) => async () => {
  const token = await localStorage.getItem("token");
  if (token) {
    dispatch({
      type: "login",
      payload: true,
    });
  }
};

const login = (dispatch) => (flag, token) => {
  console.log("req", flag, token);
  try {
    localStorage.setItem("token", token);
    dispatch({ type: "login", payload: flag });
  } catch (error) {
    console.log("err", error);
  }
};

const logout = (dispatch) => () => {
  console.log("logout");
  try {
    localStorage.removeItem("token");
    dispatch({ type: "logout" });
  } catch (error) {
    console.log("err", error);
  }
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { tryLocalSignin, login, logout },
  { loginFlag: false }
);
