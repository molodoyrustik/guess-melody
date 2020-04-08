import React from 'react';
import PropTypes from 'prop-types';

const GenreQuestionScreen = ({question, renderPlayer, userAnswers, onChange, onAnswer}) => {
  const handleOnChange = (i) => (evt) => {
    const value = evt.target.checked;
    onChange(value, i);
  };

  const handleOnSubmit = (evt) => {
    evt.preventDefault();
    onAnswer(userAnswers);
  };

  return (
    <section className="game__screen">
      <h2 className="game__title">Выберите {question.genre} треки</h2>
      <form className="game__tracks" onSubmit={handleOnSubmit}>
        {question.answers.map((item, i) => {
          const {id, src} = item;
          return (
            <div key={`answer-${id}`} className="track">
              {renderPlayer(src, i)}
              <div className="game__answer">
                <input
                  className="game__input visually-hidden"
                  type="checkbox"
                  name={`answer-${id}`}
                  value={`answer-${id}`}
                  id={`answer-${id}`}
                  checked={userAnswers[i]}
                  onChange={handleOnChange(i)}
                />
                <label className="game__check" htmlFor={`answer-${id}`}>Отметить</label>
              </div>
            </div>
          );
        })}
        <button className="game__submit button" type="submit">Ответить</button>
      </form>
    </section>
  );
};

GenreQuestionScreen.propTypes = {
  question: PropTypes.shape({
    type: PropTypes.string.isRequired,
    genre: PropTypes.string,
    answers: PropTypes.arrayOf(PropTypes.shape({
      src: PropTypes.string,
      genre: PropTypes.string,
    }))
  }),
  userAnswers: PropTypes.array.isRequired,
  onAnswer: PropTypes.func.isRequired,
  renderPlayer: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default (GenreQuestionScreen);
