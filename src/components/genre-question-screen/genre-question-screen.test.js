import React from 'react';
import renderer from 'react-test-renderer';
import GenreQuestionScreen from './genre-question-screen.jsx';

const question = {
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
};

test(`GenreQuestionScreen is rendered correctly`, () => {
  const tree = renderer.create(
      <GenreQuestionScreen
        question={question}
        onAnswer={() => {}}
        onChange={() => {}}
        userAnswers={[false, false, false, false]}
        renderPlayer={() => {}}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
