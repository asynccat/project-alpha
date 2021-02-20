import React, { useState } from 'react';

export const Button: React.FC = () => {
  const [count, setCount] = useState(0);

  return (

    <div>
      <button
        onClick={() => setCount(count + 1)}
        className="waves-effect waves-light btn-large"
      >
        Большая зеленая кнопка
      </button>
      <h1 className="counter">
        <span> {count}</span>

      </h1>
    </div>
  );
};
