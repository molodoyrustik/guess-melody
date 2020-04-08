import {reducer, ActionType, ActionCreator} from "./game";

test(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    mistakes: 0,
    step: -1,
    maxMistakes: 3
  });
});

test(`Reducer should increment current step by a given value`, () => {
  expect(reducer({
    mistakes: 0,
    step: -1
  }, {
    type: ActionType.INCREMENT_STEP,
    payload: 1
  })).toEqual({
    mistakes: 0,
    step: 0
  });

  expect(reducer({
    mistakes: 0,
    step: -1
  }, {
    type: ActionType.INCREMENT_STEP,
    payload: 0
  })).toEqual({
    mistakes: 0,
    step: -1
  });
});

test(`Reducer should increment number of mistakes by a given value`, () => {
  expect(reducer({
    mistakes: 0,
    step: -1
  }, {
    type: ActionType.INCREMENT_MISTAKES,
    payload: 1
  })).toEqual({
    mistakes: 1,
    step: -1
  });

  expect(reducer({
    mistakes: 0,
    step: -1
  }, {
    type: ActionType.INCREMENT_MISTAKES,
    payload: 0
  })).toEqual({
    mistakes: 0,
    step: -1
  });
});

test(`Reducer should return default`, () => {
  expect(reducer({
    step: 5,
    mistakes: 1,
  }, {
    type: ActionType.RESET,
    payload: null,
  })).toEqual({
    step: 0,
    mistakes: 0,
    maxMistakes: 3,
  });

  expect(reducer({
    step: 0,
    mistakes: 0,
  }, {
    type: ActionType.RESET,
    payload: null,
  })).toEqual({
    step: 0,
    mistakes: 0,
    maxMistakes: 3,
  });

  expect(reducer({
    step: -1,
    mistakes: 0,
  }, {
    type: ActionType.RESET,
    payload: null,
  })).toEqual({
    step: 0,
    mistakes: 0,
    maxMistakes: 3,
  });
});

describe(`ActionCreator work correctly`, () => {
  test(`ActionCreator for incrementing step returns correct action`, () => {
    expect(ActionCreator.incrementStep()).toEqual({
      type: ActionType.INCREMENT_STEP,
      payload: 1,
    });
  });

  test(`ActionCreator for incrementing mistake returns action with payload 0 if answer is correct`, () => {
    expect(ActionCreator.incrementMistake(
        {
          type: `artist`,
          song: {
            artist: `correct`,
            src: ``,
          },
          answers: [
            {
              artist: `correct`,
              picture: ``,
            }, {
              artist: `incorrect`,
              picture: ``,
            }, {
              artist: `incorrect-2`,
              picture: ``,
            },
          ]
        },
        {
          artist: `correct`,
          picture: ``,
        }
    )).toEqual({
      type: ActionType.INCREMENT_MISTAKES,
      payload: 0,
    });
  });

  test(`ActionCreator for incrementing mistake returns action with payload 1 if answer is incorrect`, () => {
    expect(ActionCreator.incrementMistake(
        {
          type: `artist`,
          song: {
            artist: `correct`,
            src: ``,
          },
          answers: [
            {
              artist: `correct`,
              picture: ``,
            }, {
              artist: `incorrect`,
              picture: ``,
            }, {
              artist: `incorrect-2`,
              picture: ``,
            },
          ]
        },
        {
          artist: `incorrect`,
          picture: ``,
        }
    )).toEqual({
      type: ActionType.INCREMENT_MISTAKES,
      payload: 1,
    });
  });

  test(`ActionCreator for incrementing mistake returns action with payload 0 if answer for genre is correct`, () => {
    expect(ActionCreator.incrementMistake(
        {
          type: `genre`,
          genre: `jazz`,
          answers: [
            {
              genre: `rock`,
              src: ``,
            }, {
              genre: `jazz`,
              src: ``,
            }, {
              genre: `blues`,
              src: ``,
            }, {
              genre: `blues`,
              src: ``,
            },
          ]
        }, [false, true, false, false]
    )).toEqual({
      type: ActionType.INCREMENT_MISTAKES,
      payload: 0,
    });
  });

  test(`ActionCreator for incrementing mistake returns action with payload 1 if answer for genre is incorrect`, () => {
    expect(ActionCreator.incrementMistake(
        {
          type: `genre`,
          genre: `jazz`,
          answers: [
            {
              genre: `rock`,
              src: ``,
            }, {
              genre: `jazz`,
              src: ``,
            }, {
              genre: `blues`,
              src: ``,
            }, {
              genre: `blues`,
              src: ``,
            },
          ]
        }, [true, false, false, true]
    )).toEqual({
      type: ActionType.INCREMENT_MISTAKES,
      payload: 1,
    });
  });

  test(`Action creator for reset game returns action with null payload`, () => {
    expect(ActionCreator.resetGame())
      .toEqual({
        type: ActionType.RESET,
        payload: null,
      });
  });
});
