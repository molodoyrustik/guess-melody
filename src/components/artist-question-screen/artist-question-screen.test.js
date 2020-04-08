import React from 'react';
import renderer from 'react-test-renderer';
import ArtistQuestionScreen from './artist-question-screen';
import GenreQuestionScreen from "../genre-question-screen/genre-question-screen";

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

it(`Render ArtistQuestionScreen component correctly`, () => {
  const tree = renderer
    .create(
        <ArtistQuestionScreen
          question={mock}
          onAnswer={() => { }}
          renderPlayer={() => {}}
        />,
        {
          createNodeMock: () => {
            return {};
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
