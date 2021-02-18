import React from 'react';
import { Button } from './components/button/Button';

const App: React.FC = () => {
  return (
    <div className="container page" data-test="component-app">
      <h1>Welcome to Project-alpha!</h1>
      <Button />
    </div>
  );
};

export default App;
