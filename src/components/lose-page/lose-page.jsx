import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';

import {ActionCreator as GameActionCreator} from "../../reducer/game/game";

const loseText = {
  time: {
    title: `Увы и ах!`,
    totalText: `Время вышло! Вы не успели отгадать все мелодии`,
  },
  mistakes: {
    title: `Какая жалость!`,
    totalText: `У вас закончились все попытки. Ничего, повезёт в следующий раз!`,
  }
};

const handleReplayGame = (replayGame) => () => {
  replayGame();
};

const LosePage = (props) => {
  const {replayGame, isFailTime, mistakes, maxMistakes} = props;
  let type = `mistakes`;

  if (isFailTime) {
    type = `time`;
  }

  if (mistakes >= maxMistakes) {
    type = `mistakes`;
  }
  return (
    <section className="result">
      <div className="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width={186} height={83}/></div>
      <h2 className="result__title">{loseText[type].title}</h2>
      <p className="result__total result__total--fail">{loseText[type].totalText}</p>
      <button
        className="replay"
        type="button"
        onClick={handleReplayGame(replayGame, history)}
      >Попробовать ещё раз</button>
    </section>
  );
};

LosePage.propTypes = {
  replayGame: PropTypes.func.isRequired,
  isFailTime: PropTypes.bool.isRequired,
  mistakes: PropTypes.number.isRequired,
  maxMistakes: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => {
  return {
    mistakes: state.game.mistakes,
    isFailTime: state.game.isFailTime,
    maxMistakes: state.game.maxMistakes,
  };
};

const mapDispatchToProps = (dispatch) => ({
  replayGame() {
    dispatch(GameActionCreator.replayGame());
  },
});

export {LosePage};

const LosePageWrapped = withRouter(LosePage);

export default connect(mapStateToProps, mapDispatchToProps)(LosePageWrapped);
