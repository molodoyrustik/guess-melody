// http://es31-server.appspot.com/guess-melody/questions

import axios from "axios";
import {ActionCreator as UserActionCreator, AuthorizationStatus} from "./reducer/user/user";

const Error = {
  UNAUTHORIZED: 401,
};

export const configreAPI = (dispatch) => {
  const api = axios.create({
    baseURL: `http://localhost:1337/api/guess-melody`,
    timeout: 1000 * 5,
    withCredentials: true,
  });

  const onSuccess = (response) => {
    return response;
  };

  const onFail = (err) => {
    const {response} = err;

    if (response.status === Error.UNAUTHORIZED) {
      dispatch(UserActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
    }

    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
