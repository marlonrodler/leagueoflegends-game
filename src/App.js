import React from 'react'
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react'

import './App.css';

import Game from './pages/Game'

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Game/>} />
        </Routes>
      </Router>
    </ChakraProvider>

  );
}

export default App;
