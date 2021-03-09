import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'

import { decreaseCount, increaseCount } from '../../actions/Counter'
import { CounterState} from '../../actions/authActions'

interface CounterProps {
  readonly increaseCount: () => void
  readonly decreaseCount: () => void
  readonly count: number
}

class Counter extends Component<CounterProps> {
  static mapStateToProps = (state: CounterState): {count: number} => {
    return {
      count: state.count,
    }
  };

  static mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators(
      {
        increaseCount,
        decreaseCount,
      },
      dispatch
    )
  };

  render() {
    const { increaseCount: increase, decreaseCount: decrease, count } = this.props
    return (
      <div>
        <Button
          color="primary"
          onClick={increase}
          size="large"
          variant="contained"
        >
          +
        </Button>
        &nbsp; &nbsp;
        <Button
          color="primary"
          onClick={decrease}
          size="large"
          variant="contained"
        >
          -
        </Button>
        <h1>
          <span>{count}</span>
        </h1>
      </div>
    )
  }
}
export default connect(
  Counter.mapStateToProps,
  Counter.mapDispatchToProps
)(Counter)
