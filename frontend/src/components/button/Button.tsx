import React, { useState } from 'react';
import Button from '@material-ui/core/Button';

export const BlueButton: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Button
        variant="contained"
        size="large"
        color="primary"
        onClick={() => setCount(count + 1)}
      >
        Большая синяя кнопка
      </Button>

      <h1 className="counter">
        <span> {count}</span>
      </h1>
    </div>
  );
};
