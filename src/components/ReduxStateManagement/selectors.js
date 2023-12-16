export const getAccessToken = (state) => state.auth.accessToken;
export const getUserData = (state) => {
  return state.auth.firstname, state.auth.lastname;
};
