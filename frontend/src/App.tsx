import React, {useEffect} from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Counter from './components/counter/Counter';
import counterReducer from '../src/reducers/counterReducer';
const store = createStore(counterReducer);

const App: React.FC = () => {
  useEffect(() => {
    fetch(`${process.env.REACT_APP_DJANGO_SERVER}/api/v1/hello/`)
  })
  return (
    <div className="container page">
      <h1>Welcome to Project-alpha!</h1>
      <h3>Redux-counter</h3>
      <Provider store={store}>
        <Counter />
      </Provider>
    </div>
  );
};

export default App;
