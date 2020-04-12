// http://es31-server.appspot.com/guess-melody/questions

import axios from "axios";
import {ActionCreator as UserActionCreator, AuthorizationStatus} from "./reducer/user/user";

const Error = {
  UNAUTHORIZED: 401,
};

class Singleton {
  static getInstance() {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }

    return Singleton.instance;
  }

  constructor() {
    if (!Singleton.instance) {
      Singleton.instance = this;
    }

    this.axios = axios.create({
      baseURL: `http://localhost:1337/api/guess-melody`,
      timeout: 5000,
      withCredentials: true,
    });

    this.handleSuccessResponse = this.handleSuccessResponse.bind(this);
    this.handleErrorResponse = this.handleErrorResponse.bind(this);

    this.setTokenOnRequest = this.setTokenOnRequest.bind(this);

    return Singleton.instance;
  }

  setupInterceptor(store, history) {
    this.store = store;
    this.history = history;

    this.axios.interceptors.response.use(this.handleSuccessResponse, this.handleErrorResponse);

    // this.axios.interceptors.request.use(this.setTokenOnRequest);
  }

  setTokenOnRequest(config) {
    const token = this.store.getState().user.token || localStorage.getItem(`token`);
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  }

  handleSuccessResponse(response) {
    return response;
  }

  handleErrorResponse(err) {
    const {response} = err;
    if (err.message === `timeout of 5000ms exceeded` && !err.response) {
      // eslint-disable-next-line no-console
      console.log(`timeout of 5000ms exceeded`); // можно диспатчить
      return Promise.reject(err);
    }

    // если бы хотели сделать защиту роута /result
    // if (this.history.location.pathname === `/result` && response.status === Error.UNAUTHORIZED) {
    //   this.store.dispatch(UserActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
    //   this.history.push(`/login`);
    // }
    if (response.status === Error.UNAUTHORIZED) {
      this.store.dispatch(UserActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
    }

    return Promise.reject(err);
  }
}


export default Singleton;
