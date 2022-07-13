import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Page1 from './Page1';
import Page2 from './Page2';

function App() {
  
  return (
    <>
      
        <Routes>
          <Route path='/Page2' element={<Page2 />} />
          <Route path='/' element={<Page1 />} />

        </Routes>
        
      
      
      
    </>
  );
}

export default App;
