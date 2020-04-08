import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ActionCreator as GameActionCreator} from "../../reducer/game/game";
import {connect} from "react-redux";

class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      total: null,
      minutes: props.gameTime,
      seconds: 0,
      isRunning: false,
    };

    this.endTime = new Date(Date.parse(new Date()) + props.gameTime * 60 * 1000);
    this.tick = this.tick.bind(this);
  }

  getTimeRemaining() {
    const diff = Date.parse(this.endTime) - Date.parse(new Date());
    const seconds = Math.floor((diff / 1000) % 60);
    const minutes = Math.floor((diff / 1000 / 60) % 60);

    return {
      total: diff,
      minutes,
      seconds
    };
  }


  tick() {
    const {isRunning} = this.state;
    if (isRunning) {
      const time = this.getTimeRemaining(this.endTime);
      this.setState({...time});

      if (time.total <= 0) {
        const {failTimeChange} = this.props;

        this.setState({isRunning: false});
        clearInterval(this.interval);
        failTimeChange(true);
      }
    }
  }

  render() {
    const {minutes, seconds} = this.state;
    return (
      <div className="timer__value">
        <span className="timer__mins">0{minutes}</span>
        <span className="timer__dots">:</span>
        <span className="timer__secs">{seconds > 9 ? seconds : `0` + seconds}</span>
      </div>
    );
  }

  componentDidMount() {
    this.setState({isRunning: true}, () => {
      this.tick();
      this.interval = setInterval(this.tick, 1000);
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
}

Timer.propTypes = {
  gameTime: PropTypes.number.isRequired,
  failTimeChange: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  failTimeChange(flag) {
    dispatch(GameActionCreator.failTimeChange(flag));
  },
});

export {Timer};

export default connect(null, mapDispatchToProps)(Timer);
