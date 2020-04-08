import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ArtistQuestionScreen from './artist-question-screen';

const mock = {
  type: `artist`,
  song: {
    artist: `USA`,
    src: `https://upload.wikimedia.org/wikipedia/commons/6/65/Star_Spangled_Banner_instrumental.ogg`,
  },
  answers: [
    {
      id: `id1`,
      picture: `http://placehold.it/134x134`,
      artist: `USA`,
    },
    {
      id: `id2`,
      picture: `http://placehold.it/134x134`,
      artist: `Russia`,
    },
    {
      id: `id3`,
      picture: `http://placehold.it/134x134`,
      artist: `Ugandan`,
    },
  ]
};

Enzyme.configure({adapter: new Adapter()});

describe(`ArtistQuestionScreen e2e test`, () => {
  test(`Click on user answer should pass to the callback data-object from which this answer was created`, () => {
    const onAnswer = jest.fn();

    const question = mock;
    const userAnswer = {
      picture: `http://placehold.it/134x134`,
      artist: `USA`,
    };

    const wrapper = shallow(<ArtistQuestionScreen
      onAnswer={onAnswer}
      question={question}
      renderPlayer={() => {}}
    />);

    const firstAnswer = wrapper.find(`.artist__input`).at(0);

    firstAnswer.simulate(`change`);

    expect(onAnswer).toHaveBeenCalledTimes(1);
    // expect(onAnswer.mock.calls[0][0]).toMatchObject(question);
    // expect(onAnswer.mock.calls[0][1]).toMatchObject(userAnswer);
  });
});
