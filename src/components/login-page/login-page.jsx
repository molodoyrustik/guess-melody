import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {Operations as UserOperations} from '../../reducer/user/user';
import {ActionCreator as GameActionCreator} from "../../reducer/game/game";

class LoginPage extends PureComponent {
  constructor(props) {
    super(props);
    this.loginRef = createRef();
    this.passwordRef = createRef();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReplayGame = this.handleReplayGame.bind(this);
  }

  handleSubmit(evt) {
    const {onSubmit} = this.props;

    evt.preventDefault();

    onSubmit({
      login: this.loginRef.current.value,
      password: this.passwordRef.current.value,
    });
  }

  handleReplayGame() {
    const {replayGame} = this.props;

    replayGame();
  }

  render() {

    return (
      <section className="login">
        <div className="login__logo">
          <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83" />
        </div>
        <h2 className="login__title">Вы настоящий меломан!</h2>
        <p className="login__text">Хотите узнать свой результат?
          Представтесь!</p>
        <form className="login__form"
          action=""
          onSubmit={this.handleSubmit}
        >
          <p className="login__field">
            <label className="login__label" htmlFor="name">Логин</label>
            <input className="login__input"
              type="text" name="name"
              id="name"
              ref={this.loginRef} />
          </p>
          <p className="login__field">
            <label className="login__label" htmlFor="password">Пароль</label>
            <input className="login__input"
              type="text" name="password"
              id="password"
              ref={this.passwordRef}
            />
            <span className="login__error">Неверный пароль</span>
          </p>
          <button className="login__button button" type="submit">Войти</button>
        </form>
        <button className="replay" type="button" onClick={this.handleReplayGame}>Сыграть ещё раз</button>
      </section>
    );
  }
}

LoginPage.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  replayGame: PropTypes.func.isRequired,
};

const LosePageWrapped = withRouter(LoginPage);

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (authData) => {
      dispatch(UserOperations.login(authData));
    },
    replayGame() {
      dispatch(GameActionCreator.replayGame());
    },
  };
};

export {LosePageWrapped};

export default connect(null, mapDispatchToProps)(LosePageWrapped);
