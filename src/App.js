import React, { useState } from 'react';
import logo from './listenlater.jpg';
import './App.css';

import LambdaDemo from './components/LambdaDemo';

function App() {
  const [loading, setLoading] = useState({ loading: false, msg: null });

  const handleClick = event => {
    const value = event.currentTarget.value;
    event.preventDefault();
    setLoading({ loading: true });
    fetch('/.netlify/functions/' + value)
      .then(response => response.json())
      .then(json => setLoading({ loading: false, msg: json.msg }));
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <LambdaDemo
          handleClick={handleClick}
          loading={loading.loading}
          message={loading.msg}
        />
      </header>
    </div>
  );
}

export default App;
