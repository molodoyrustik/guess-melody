import {extend} from "../../utils";

const isArtistAnswerCorrect = (question, userAnswer) => {
  return question.song.artist === userAnswer.artist;
};

const isGenreAnswerCorrect = (question, userAnswer) => {
  return userAnswer.every((it, i) => {
    return it === (question.answers[i].genre === question.genre);
  });
};

const initialState = {
  step: -1,
  mistakes: 0,
  maxMistakes: 3,
  isFailTime: false,
};

export const ActionType = {
  INCREMENT_MISTAKES: `INCREMENT_MISTAKES`,
  INCREMENT_STEP: `INCREMENT_STEP`,
  FAIL_TIME: `FAIL_TIME`,
  REPLAY_GAME: `REPLAY_GAME`,
};

export const ActionCreator = {
  incrementStep: () => ({
    type: ActionType.INCREMENT_STEP,
    payload: 1
  }),
  incrementMistake: (question, userAnswer) => {
    let answerIsCorrect = false;
    switch (question.type) {
      case `artist`:
        answerIsCorrect = isArtistAnswerCorrect(question, userAnswer);
        break;
      case `genre`: {
        answerIsCorrect = isGenreAnswerCorrect(question, userAnswer);
      }
    }

    return {
      type: ActionType.INCREMENT_MISTAKES,
      payload: answerIsCorrect ? 0 : 1,
    };
  },
  failTimeChange: () => {
    return {
      type: ActionType.FAIL_TIME,
      payload: null
    };
  },
  replayGame: () => {
    return {
      type: ActionType.REPLAY_GAME,
      payload: null
    };
  },
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.INCREMENT_STEP:
      return extend(state, {
        step: state.step + action.payload,
      });

    case ActionType.INCREMENT_MISTAKES:
      return extend(state, {
        mistakes: state.mistakes + action.payload,
      });

    case ActionType.FAIL_TIME:
      return extend(state, {isFailTime: true});

    case ActionType.REPLAY_GAME:
      return extend(initialState, {});
  }

  return state;
};

export default gameReducer;
