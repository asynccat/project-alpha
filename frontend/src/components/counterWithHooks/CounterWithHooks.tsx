import React from 'react';
import Button from '@material-ui/core/Button';
import {useDispatch, useSelector} from "react-redux";
import {CounterTypes} from "../../actions";
import {AppStateType} from "../../index";

export default function CounterWithHooks () {
    const dispatch = useDispatch()
    const count = useSelector<AppStateType, number>(state => state.counter.count)

    const increment = () => {
        dispatch({
            type: CounterTypes.INCREASE_COUNT,
        })
    }
    const decrement = () => {
        dispatch({
            type: CounterTypes.DECREASE_COUNT,
        })
    }
    return (
      <div>
        <Button
          variant="contained"
          size="large"
          color="primary"
          onClick={increment}
        >
          +
        </Button>
        &nbsp; &nbsp;
        <Button
          variant="contained"
          size="large"
          color="primary"
          onClick={decrement}
        >
          -
        </Button>
        <h1>
          <span>{count}</span>
        </h1>
      </div>
    );
  }