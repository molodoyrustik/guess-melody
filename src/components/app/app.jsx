import React from 'react';
import {Switch, Route} from 'react-router-dom';

import withAuth from "../../hocs/with-auth/with-auth";

import ScreenManagerPage from "../screen-manager-page/screen-manager-page.jsx";
import LoginPage from "../login-page/login-page.jsx";
import LosePage from '../lose-page/lose-page.jsx';
import WinPage from "../win-page/win-page.jsx";
import NotFoundPage from "../not-found-page/not-found-page.jsx";

const WinPageAuthWrapped = withAuth(WinPage);

const App = () => {
  return (
    <Switch>
      <Route exact path="/">
        <ScreenManagerPage/>
      </Route>
      <Route path="/login">
        <LoginPage/>
      </Route>
      <Route path="/lose">
        <LosePage/>
      </Route>
      <Route path="/result">
        <WinPageAuthWrapped/>
      </Route>
      <Route path="*">
        <NotFoundPage />
      </Route>
    </Switch>
  );
};

export default App;
