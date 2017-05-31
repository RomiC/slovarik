import React from 'react';
import ReactDOM from 'react-dom';

const RootComponent = () => (
  <div>
    <h1>Hello, World!</h1>
    <p>one more element</p>
  </div>
);

ReactDOM.render(
  <RootComponent />,
  document.getElementById('root')
);
