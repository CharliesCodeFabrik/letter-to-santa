import React, { useState } from 'react';
import { LettersList } from './Components/LettersList';
import { NewLetter } from './Components/NewLetter';

const App = () => {

  return <div>
      <h1>Hey Whats up guys</h1>
      <div><NewLetter/></div>
      <div><LettersList/></div>
  </div>
}

export default App
