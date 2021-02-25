import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { increaseCount, decreaseCount } from '../../actions/Counter';
import { CounterState } from '../../actions';

interface CounterProps {
  readonly increaseCount: () => void;
  readonly decreaseCount: () => void;
  readonly count: number;
}

class Counter extends Component<CounterProps> {
  static mapStateToProps = (state: CounterState) => {
    return {
      count: state.count,
    };
  };

  static mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators(
      {
        increaseCount,
        decreaseCount,
      },
      dispatch
    );
  };

  render() {
    const { increaseCount, decreaseCount } = this.props;
    return (
      <div>
        <Button
          variant="contained"
          size="large"
          color="primary"
          onClick={increaseCount}
        >
          +
        </Button>
        &nbsp; &nbsp;
        <Button
          variant="contained"
          size="large"
          color="primary"
          onClick={decreaseCount}
        >
          -
        </Button>
        <h1>
          <span>{this.props.count}</span>
        </h1>
      </div>
    );
  }
}
export default connect(
  Counter.mapStateToProps,
  Counter.mapDispatchToProps
)(Counter);
