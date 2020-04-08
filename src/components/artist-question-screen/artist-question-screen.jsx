import React from 'react';
import PropTypes from 'prop-types';

const ArtistQuestionScreen = ({question, onAnswer, renderPlayer}) => {
  const {
    answers,
    song,
  } = question;
  return (
    <section className="game__screen">
      <h2 className="game__title">Кто исполняет эту песню?</h2>
      <div className="game__track">
        <div className="track">
          {renderPlayer(song.src, 1)}
        </div>
      </div>
      <form className="game__artist">
        {answers.map((answer, i) => {
          return (
            <div key={`answer-${answer.artist}`} className="artist">
              <input
                className="artist__input visually-hidden"
                type="radio" name="answer"
                value={`answer-${i}`} id={`answer-${i}`}
                onChange={() => {
                  onAnswer(answer);
                }}
              />
              <label className="artist__name" htmlFor={`answer-${i}`}>
                <img className="artist__picture" src={answer.picture} alt={answer.artist} />
                {answer.artist}
              </label>
            </div>
          );
        })}
      </form>
    </section>
  );
};

ArtistQuestionScreen.propTypes = {
  question: PropTypes.shape({
    type: PropTypes.string.isRequired,
    song: PropTypes.shape({
      artist: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
    }),
    answers: PropTypes.arrayOf(
        PropTypes.shape({
          picture: PropTypes.string,
          artist: PropTypes.string,
        })
    )
  }),
  onAnswer: PropTypes.func.isRequired,
  renderPlayer: PropTypes.func.isRequired,
};

export default ArtistQuestionScreen;
