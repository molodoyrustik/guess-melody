import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import WelcomeScreen from './welcome-screen';

Enzyme.configure({adapter: new Adapter()});

it(`Should start game button be pressed`, () => {
  const clickHandler = jest.fn();

  const welcomeScreen = shallow(<WelcomeScreen
    gameTime={0}
    errorCount={0}
    onClick={clickHandler}
  />);

  const startButton = welcomeScreen.find(`button.welcome__button`);
  startButton.simulate(`click`);

  expect(clickHandler).toHaveBeenCalledTimes(1);
});
