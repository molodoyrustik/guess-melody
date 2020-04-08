import React from "react";
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {ActionCreator as GameActionCreator} from "../../reducer/game/game";

const handleReplayGame = (replayGame, history) => () => {
  replayGame();
  history.push(`/`);
};

const WinPage = (props) => {
  const {questionsCount, mistakesCount, replayGame, history} = props;
  const correctlyQuestionsCount = questionsCount - mistakesCount;

  return (
    <section className="result">
      <div className="result__logo">
        <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83" />
      </div>
      <h2 className="result__title">Вы настоящий меломан!</h2>
      <p className="result__total">Вы ответили правильно на {correctlyQuestionsCount} вопросов и
        совершили {mistakesCount} ошибки</p>
      <button
        className="replay"
        type="button"
        onClick={handleReplayGame(replayGame, history)}
      >
        Сыграть ещё раз
      </button>
    </section>
  );
};

WinPage.propTypes = {
  questionsCount: PropTypes.number.isRequired,
  mistakesCount: PropTypes.number.isRequired,
  replayGame: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => {
  return {
    questionsCount: state.data.questions.length,
    mistakesCount: state.game.mistakes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    replayGame() {
      dispatch(GameActionCreator.replayGame());
    },
  };
};

export {WinPage};

const WinScreenWrapped = withRouter(WinPage);

export default connect(mapStateToProps, mapDispatchToProps)(WinScreenWrapped);
