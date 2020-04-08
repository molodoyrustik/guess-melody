import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Redirect, withRouter} from 'react-router-dom';

import GameScreen from "../game-screen/game-screen.jsx";
import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';
import GenreQuestionScreen from "../genre-question-screen/genre-question-screen.jsx";
import ArtistQuestionScreen from "../artist-question-screen/artist-question-screen.jsx";

import withActivePlayer from "../../hocs/with-active-player/with-active-player.js";
import withUserAnswer from "../../hocs/with-user-answer/with-user-answer.js";
import {ActionCreator as GameActionCreator} from "../../reducer/game/game";
import {AuthorizationStatus} from "../../reducer/user/user";

const GenreQuestionScreenWrapped = withActivePlayer(withUserAnswer(GenreQuestionScreen));
const ArtistQuestionScreenWrapped = withActivePlayer(ArtistQuestionScreen);

class ScreenManagerPage extends PureComponent {
  componentDidUpdate(prevProps, prevState, snapshot) {
    const {isFailTime, mistakes, maxMistakes, history} = this.props;

    if (mistakes >= maxMistakes) {
      history.push(`/lose`);
    }

    if (isFailTime) {
      history.push(`/lose`);
    }
  }

  render() {
    const {step, questions, authorizationStatus} = this.props;

    if (step === -1) {
      const {onWelcomeButtonClick} = this.props;
      return <WelcomeScreen
        gameTime={5}
        errorCount={3}
        onClick={onWelcomeButtonClick}
      />;
    }

    if (step >= questions.length) {
      if (authorizationStatus === AuthorizationStatus.AUTH) {
        return <Redirect to='/result'/>;
      } else if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
        return <Redirect to='/login'/>;
      }
    }

    const question = questions[step];

    switch (question.type) {
      case `genre`:
        return (
          <GameScreen type={question.type}>
            <GenreQuestionScreenWrapped
              question={question}
              onAnswer={(userAnswer) => this.props.onUserAnswer(
                  question,
                  userAnswer,
              )}
            />
          </GameScreen>
        );
      case `artist`:
        return (
          <GameScreen type={question.type}>
            <ArtistQuestionScreenWrapped
              question={question}
              onAnswer={(userAnswer) => this.props.onUserAnswer(
                  question,
                  userAnswer,
              )}
            />
          </GameScreen>
        );
    }

    return null;
  }
}

ScreenManagerPage.propTypes = {
  step: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string.isRequired,
        genre: PropTypes.string,
        answers: PropTypes.arrayOf(
            PropTypes.shape({
              src: PropTypes.string,
              genre: PropTypes.string,
            })
        ),
      })
  ),
  onWelcomeButtonClick: PropTypes.func.isRequired,
  onUserAnswer: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  step: state.game.step,
  mistakes: state.game.mistakes,
  maxMistakes: state.game.maxMistakes,
  isFailTime: state.game.isFailTime,
  questions: state.data.questions,
  authorizationStatus: state.user.authorizationStatus,
});

const mapDispatchToProps = (dispatch) => ({
  onWelcomeButtonClick() {
    dispatch(GameActionCreator.incrementStep());
  },
  onUserAnswer(question, userAnswer) {
    dispatch(GameActionCreator.incrementMistake(question, userAnswer));
    dispatch(GameActionCreator.incrementStep());
  },
});

export {ScreenManagerPage};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ScreenManagerPage));
