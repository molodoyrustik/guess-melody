import React from "react";
import GenreQuestionScreen from "./genre-question-screen";
import {configure, shallow, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({adapter: new Adapter()});

const mock = {
  question: {
    type: `genre`,
    genre: `rock`,
    answers: [
      {
        id: `1`,
        src: `path`,
        genre: `rock`,
      },
      {
        id: `2`,
        src: `path`,
        genre: `jazz`,
      },
      {
        id: `3`,
        src: `path`,
        genre: `jazz`,
      },
      {
        id: `4`,
        src: `path`,
        genre: `blues`,
      },
    ],
  },
};

test(`When user answers genre question form is not sent`, () => {
  const onAnswer = jest.fn();
  const {question} = mock;

  const wrapper = shallow(<GenreQuestionScreen
    onAnswer={onAnswer}
    onChange={()=>{}}
    question={question}
    renderPlayer={() => {}}
    userAnswers={[false, false, false, false]}
  />);

  const genreQuestion = wrapper.find(`form`);
  const formSubmitPrevent = jest.fn();
  genreQuestion.simulate(`submit`, {
    preventDefault: formSubmitPrevent,
  });

  expect(onAnswer).toHaveBeenCalledTimes(1);
  expect(formSubmitPrevent).toHaveBeenCalledTimes(1);
});

test(`User answer passed to callback is consistent with "userAnswer" prop`, () => {
  const onAnswer = jest.fn((...args) => [...args]);
  const {question} = mock;
  const userAnswer = [false, true, false, false];

  const wrapper = mount(<GenreQuestionScreen
    onAnswer={onAnswer}
    onChange={()=>{}}
    question={question}
    renderPlayer={() => {}}
    userAnswers={userAnswer}
  />);

  const genreQuestion = wrapper.find(`form`);
  const inputTwo = wrapper.find(`input`).at(1);

  inputTwo.simulate(`change`, {target: {checked: true}});
  genreQuestion.simulate(`submit`, {preventDefault() {}});

  expect(onAnswer).toHaveBeenCalledTimes(1);

  // expect(onAnswer.mock.calls[0][0]).toEqual(void 0);

  expect(wrapper.find(`input`).map((it) => it.prop(`checked`))).toEqual(userAnswer);
});
