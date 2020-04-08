import {extend} from '../../utils';
// import questions from "../../mocks/questions";

const initialState = {
  questions: [],
};

export const Operations = {
  loadQuestions: () => (dispatch, getState, api) => {
    return api.get(`/questions`)
      .then((response) => {
        return dispatch(ActionCreator.loadQuestions(response.data));
      });
  }
};

export const ActionType = {
  LOAD_QUESTIONS: `LOAD_QUESTIONS`,
};

export const ActionCreator = {
  loadQuestions: (questions) => {
    return {
      type: ActionType.LOAD_QUESTIONS,
      payload: questions,
    };
  },
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_QUESTIONS:
      return extend(state, {questions: action.payload});
  }

  return state;
};

export default dataReducer;
