import React from 'react'
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react'

import './App.css';

import './fonts/BeaufortforLOLJa-Regular.ttf'


import Home from './pages/Home'

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
        </Routes>
      </Router>
    </ChakraProvider>

  );
}

export default App;
