import React from 'react';
import renderer from 'react-test-renderer';

import WelcomeScreen from './welcome-screen';

it(`Render WelcomeScreen`, () => {
  const tree = renderer
    .create(<WelcomeScreen
      gameTime={0}
      errorCount={0}
      onClick={() => { }}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
