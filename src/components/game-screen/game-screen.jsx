import React from 'react';
import PropTypes from 'prop-types';

import Mistakes from '../mistakes/mistakes.jsx';
import Timer from '../timer/timer.jsx';

const GameScreen = ({type, children}) => {
  return (
    <section className={`game game--${type}`}>
      <header className="game__header">
        <a className="game__back" href="#">
          <span className="visually-hidden">Сыграть ещё раз</span>
          <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию" />
        </a>
        <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
          <circle className="timer__line" cx={390} cy={390} r={370} style={{filter: `url(#blur)`, transform: `rotate(-90deg) scaleY(-1)`, transformOrigin: `center`}} />
        </svg>
        <Timer gameTime={1}/>
        <Mistakes/>
      </header>
      {children}
    </section>
  );
};

GameScreen.propTypes = {
  type: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default GameScreen;
