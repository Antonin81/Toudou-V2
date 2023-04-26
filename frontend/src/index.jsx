import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/Home';
import Uncomplete from './pages/Uncomplete'
import Complete from './pages/Complete';
import Modify from './pages/Modify'
import Header from './components/Header'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Header/>
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route exact path='/Uncomplete' element={<Uncomplete/>} />
        <Route exact path='/Complete' element={<Complete/>} />
        <Route exact path='/Modify' element={<Modify/>} />
        <Route path='*' element={<p>Rien ne va</p>} />
      </Routes>
    </Router>
  </React.StrictMode>
);
