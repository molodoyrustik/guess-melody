import React from "react";
import PropTypes from "prop-types";

const withUserAnswer = (Component) => {
  class WithUserAnswer extends React.Component {
    constructor(props) {
      super(props);

      const {question} = props;

      this.state = {
        userAnswers: new Array(question.answers.length).fill(false),
      };

      this._handleChange = this._handleChange.bind(this);
      this._handleAnswer = this._handleAnswer.bind(this);
    }

    componentDidUpdate(prevProps) {
      const {question} = this.props;

      if (question.id !== prevProps.question.id) {
        this.setState({
          userAnswers: new Array(question.answers.length).fill(false)
        });
      }
    }

    _handleAnswer() {
      const {onAnswer} = this.props;
      const {userAnswers} = this.state;

      onAnswer(userAnswers);
    }

    _handleChange(value, i) {
      const {userAnswers} = this.state;

      const copyUserAnswers = userAnswers.concat();
      copyUserAnswers[i] = value;

      this.setState({
        userAnswers: copyUserAnswers,
      });
    }

    render() {
      return (
        <Component
          {...this.state}
          {...this.props}
          onChange={this._handleChange}
          onAnswer={this._handleAnswer}
        />
      );
    }
  }

  WithUserAnswer.propTypes = {
    question: PropTypes.object.isRequired,
    onAnswer: PropTypes.func.isRequired,
  };

  return WithUserAnswer;
};

export default withUserAnswer;
