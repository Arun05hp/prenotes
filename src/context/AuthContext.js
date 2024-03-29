import createDataContext from "./createDataContext";
import SecureStorage from "../helper/SecureStorage";
import http from "../services/httpService";
const authReducer = (state, action) => {
  switch (action.type) {
    case "login":
      return { ...state, loginFlag: action.payload };
    case "logout":
      return { ...state, loginFlag: false, userData: {} };
    case "setUser":
      return { ...state, userData: action.payload };
    case "token":
      return { ...state, token: action.payload };
    default:
      return state;
  }
};

const tryLocalSignin = (dispatch) => async () => {
  try {
    const flag = SecureStorage.getItem("loginFlag");
    const data = SecureStorage.getItem("userData");

    if (flag && data) {
      if (data.token) {
        dispatch({
          type: "login",
          payload: true,
        });
        return data.id;
      }
    }
    return false;
  } catch (error) {
    console.log("err", error);
  }
};

const login = (dispatch) => (flag, user) => {
  console.log(user);
  try {
    SecureStorage.setItem("userData", JSON.stringify(user));
    SecureStorage.setItem("loginFlag", JSON.stringify(flag));
    dispatch({ type: "token", payload: user.token });
    dispatch({ type: "login", payload: flag });
  } catch (error) {
    console.log("err", error);
  }
};

const getUserDetails = (dispatch) => (userId) => {
  try {
    http
      .get("/user/userDetails/" + userId)
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        dispatch({ type: "setUser", payload: res.userDetails });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log("err", error);
  }
};

const logout = (dispatch) => () => {
  console.log("logout");
  try {
    localStorage.clear();
    sessionStorage.clear();

    dispatch({ type: "logout" });
  } catch (error) {
    console.log("err", error);
  }
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { tryLocalSignin, login, logout, getUserDetails },
  { loginFlag: false, userData: {}, token: null }
);
