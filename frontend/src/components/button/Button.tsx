import React, { useState } from 'react';

export const Button: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div data-test="component-button">
      <button
        onClick={() => setCount(count + 1)}
        className="waves-effect waves-light btn-large"
        data-test="increment-button"
      >
        Большая зеленая кнопка
      </button>
      <h1 data-test="counter-display" className="counter">
        <span data-test="count">{count}</span>
      </h1>
    </div>
  );
};
