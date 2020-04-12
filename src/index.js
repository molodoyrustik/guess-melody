import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {Router} from "react-router-dom";
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import App from './components/app/app.jsx';
import reducer from './reducer/reducer';
import {Operations as DataOperations} from './reducer/data/data';
import {Operations as UserOperations} from './reducer/user/user';
import API from './api';
import history from "./history";

const api = new API();

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(
            thunk.withExtraArgument(api.axios)
        )
    ),
);

api.setupInterceptor(store, history);

store.dispatch(DataOperations.loadQuestions());
store.dispatch(UserOperations.checkAuth())
  .then(() => {
    ReactDOM.render(<Provider store={store}>
      <Router history={history}>
        <App/>
      </Router>
    </Provider>,
    document.querySelector(`#root`)
    );
  });
