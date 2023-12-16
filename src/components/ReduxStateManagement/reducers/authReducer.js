import { LOGIN_SUCCESS, SET_TOKEN, SET_USER_DATA } from "../constants";

const initialState = {
  accessToken: null,
  refreshToken: null,
  error: null,
  userId: null,
  firstname: null,
  lastname: null,
  email: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case SET_USER_DATA:
    case SET_TOKEN:
      const newState = {
        ...state,
        // accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        userId: action.payload.userId,
        firstname: action.payload.firstname,
        lastname: action.payload.lastname,
        email: action.payload.email,
        userRole: action.payload.userRole,
      };
      return newState;
    case "LOGIN_FAILURE":
      return {
        ...state,
        accessToken: null,
        refreshToken: null,
        error: action.payload.error,
      };
    case "LOGOUT":
      return {
        user: null,
      };
    default:
      return state;
  }
};

export default authReducer;
