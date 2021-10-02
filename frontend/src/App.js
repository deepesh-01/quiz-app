import './App.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {CircularProgress} from '@material-ui/core';

import {BrowserRouter as Router, Switch, Route, } from 'react-router-dom';

import {LogIn} from './components/home/home.js';
import {Header} from './components/header/header.js';
import {User} from './components/User/user.js'
import {Register} from './components/register/register.js';
import {Quiz} from './components/QuizEdit/quizEdit.js';
import {QuestionEdit} from './components/questionEdit/questionEdit';
import {NewQuestion} from './components/newQuestion/newQuestion';

function App() {
  return (
    <Router>
      <div>
          <Header></Header>
          <Switch>
            <Route path="/user"> <User/> </Route>
            <Route path="/editquiz"> <Quiz/> </Route>
            <Route path="/register"> <Register/> </Route>
            <Route path="/editquestion"> <QuestionEdit/> </Route>
            <Route path="/newquestion"> <NewQuestion/> </Route>
            <Route path="/"> <LogIn/> </Route>
          </Switch>
        {/* <CircularProgress></CircularProgress> */}
      </div>
    </Router>
  );
}

export default App;
