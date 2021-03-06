import React, { useState, useEffect } from 'react';
import logo from './listenlater.jpg';
import './App.css';

import useValidator from './useValidator';

import Footer from './Footer';

function App() {
  const [userInput, setUserInput] = useState();
  const [submittedInput, setSubmittedInput] = useState();
  const [feedURL, setFeedURL] = useState('Podcast feed URL');

  const { isValid } = useValidator(submittedInput);

  const handleInput = event => {
    const value = event.currentTarget.value;
    setUserInput(value);
    setFeedURL('Podcast feed URL');
    window.scrollTo(0, 0);
  };

  const handleSubmit = () => {
    setSubmittedInput(userInput);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (submittedInput && isValid) {
      const params = submittedInput.split('=')[1];
      const id = params.split('&')[0];
      setFeedURL(`https://listenlater.netlify.com/feeds/${id}`);
    } else {
      setFeedURL('Podcast feed URL');
    }
  }, [submittedInput, isValid]);

  const handleCopy = () => {
    const copyText = document.getElementById('feedURL');
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand('copy');
    window.scrollTo(0, 0);
    alert('URL copied to clipboard');
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div className="App-Input">
        <div>
          <input
            type="text"
            placeholder="Paste Youtube playlist link here"
            size="25"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            onChange={handleInput}
          ></input>
          <button onClick={handleSubmit}>Submit</button>
        </div>
        <br></br>
        <div>
          <input id="feedURL" size="23" value={feedURL} readonly></input>
          <button onClick={handleCopy}>Copy URL</button>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
