import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/Home';
import Uncomplete from './pages/Uncomplete'
import Complete from './pages/Complete';
//import Modify from './pages/Modify'
import Header from './components/Header'
import Landing from './pages/Landing';
import CreateCategory from './pages/CreateCategory'
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Connection from './pages/Connection';
import MentionLegales from './pages/MentionsLegales';
import { createGlobalStyle } from 'styled-components';
import colors from './utils/style/colors';
import CreateTask from './pages/CreateTask';
import ModifiyCategory from './pages/ModifyCategory';
import ModifyTask from './pages/ModifyTask';

const GlobalStyle = createGlobalStyle`
  *{
    margin:0;
    box-sizing:border-box;
  }
  body{
    background-color:${colors.light_gray};
  }
`

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <GlobalStyle/>
      <Routes>
        <Route exact path='/' element={<Landing/>} />
        <Route exact path='/Connection' element={<Connection/>} />
        <Route exact path='/Home' element={<React.Fragment><Header/><Home/><Footer/></React.Fragment>} />
        <Route exact path='/Uncomplete' element={<React.Fragment><Header/><Uncomplete/><Footer/></React.Fragment>} />
        <Route exact path='/Complete' element={<React.Fragment><Header/><Complete/><Footer/></React.Fragment>} />
        {/* <Route exact path='/Modify' element={<React.Fragment><Header/><Modify/><Footer/></React.Fragment>} /> */}
        <Route exact path='/MentionsLegales' element={<React.Fragment><Header/><MentionLegales/><Footer/></React.Fragment>} />
        <Route exact path='/CreateCategory/:selectedCategory' element={<React.Fragment><Header/><CreateCategory/><Footer/></React.Fragment>}  />
        <Route exact path='/CreateTask/:selectedCategory' element={<React.Fragment><Header/><CreateTask/><Footer/></React.Fragment>}  />
        <Route exact path='/UpdateCategory/:selectedCategory' element={<React.Fragment><Header/><ModifiyCategory/><Footer/></React.Fragment>}  />
        <Route exact path='/UpdateTask/:selectedTask' element={<React.Fragment><Header/><ModifyTask/><Footer/></React.Fragment>}  />
        <Route path='*' element={<p>Oupsi error 404</p>} />
      </Routes>
    </Router>
  </React.StrictMode>
);
