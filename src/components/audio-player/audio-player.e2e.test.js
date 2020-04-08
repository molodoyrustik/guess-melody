import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import AudioPlayer from './audio-player';

Enzyme.configure({adapter: new Adapter()});

const mock = {
  song: {
    src: `https://upload.wikimedia.org/wikipedia/commons/1/1f/Uganda_flag_and_national_anthem_-_Oh_Uganda_Land_o.ogg`
  }
};

const state = {
  isPlaying: false,
};

describe(`AudioPlayer e2e test`, () => {
  test(`By click on button it should change from play to pause and back`, () => {
    const onPlayButtonClick = jest.fn();
    const {song} = mock;
    const {isPlaying} = state;

    jest
      .spyOn(window.HTMLMediaElement.prototype, `play`)
      .mockImplementation(() => { });

    jest
      .spyOn(window.HTMLMediaElement.prototype, `pause`)
      .mockImplementation(() => { });


    const wrapper = mount(<AudioPlayer
      src={song.src}
      isPlaying={isPlaying}
      onPlayButtonClick={onPlayButtonClick}
    />);

    wrapper.setState({isLoading: false});

    const buttonElement = wrapper.find(`.track__button`);
    buttonElement.simulate(`click`);

    expect(wrapper.state().isPlaying).toBeTruthy();

    buttonElement.simulate(`click`);

    expect(wrapper.state().isPlaying).toBeFalsy();

    expect(onPlayButtonClick).toHaveBeenCalledTimes(2);

    // expect(playStub).toHaveBeenCalled()
    // playStub.mockRestore()
    // expect(pauseStub).toHaveBeenCalled()
    // pauseStub.mockRestore()
  });
});
