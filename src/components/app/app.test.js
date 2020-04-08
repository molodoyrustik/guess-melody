import React from 'react';
import renderer from 'react-test-renderer';
import {App} from './app';

const mocks = [
  {
    type: `genre`,
    genre: `rock`,
    answers: [{
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
      genre: `rock`,
    }, {
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
      genre: `blues`,
    }, {
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
      genre: `jazz`,
    }, {
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
      genre: `rock`,
    }],
  }, {
    type: `artist`,
    song: {
      artist: `Jim Beam`,
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
    },
    answers: [{
      picture: `https://api.adorable.io/avatars/128`,
      artist: `John Jameson`,
    }, {
      picture: `https://api.adorable.io/avatars/128`,
      artist: `Jack Daniels`,
    }, {
      picture: `https://api.adorable.io/avatars/128`,
      artist: `Jim Beam`,
    }],
  }
];

it(`Render App component correctly`, () => {
  const tree = renderer
    .create(<App
      questions={mocks}
      gameTime={5}
      errorCount={3}
      step={-1}
      isFailTime={false}
      mistakes={0}
      maxMistakes={3}
      onWelcomeButtonClick={()=>{}}
      onUserAnswer={() => {}}
    />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

