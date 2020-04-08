import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const Mistakes = ({mistakesCount}) => {
  const mistakes = new Array(mistakesCount).fill(``);

  return (
    <div className="game__mistakes">
      {mistakes.map((mistake, i) => {
        return <div key={`mistake-${i}`} className="wrong" />;
      })}
    </div>
  );
};

Mistakes.propTypes = {
  mistakesCount: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  mistakesCount: state.game.mistakes,
});

export {Mistakes};
export default connect(mapStateToProps)(Mistakes);
