import React, { useState } from 'react';
import { LettersList } from './Components/LettersList';
import Navba from './Components/Navba';
import { NewLetter } from './Components/NewLetter';
import Stack from 'react-bootstrap/Stack';

const App = () => {

  return <div>
      <Stack gap={3}>
        <div><Navba/></div>
        <div><NewLetter/></div>
        <div><LettersList/></div>
      </Stack>
  </div>
}

export default App
