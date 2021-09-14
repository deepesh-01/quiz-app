import './App.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {CircularProgress} from '@material-ui/core';

import {BrowserRouter as Router, Switch, Route, } from 'react-router-dom';

import {LogIn} from './components/home/home.js';
import {Header} from './components/header/header.js';
import {User} from './components/User/user.js'

function App() {
  return (
    <Router>
      <div>
          <Header></Header>
          <Switch>
            <Route exact path="/"> <LogIn/> </Route>
            <Route path="/user"> <User/> </Route>
          </Switch>
        {/* <CircularProgress></CircularProgress> */}
      </div>
    </Router>
  );
}

export default App;
