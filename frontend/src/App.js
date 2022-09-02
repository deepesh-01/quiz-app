import './App.css';

import {BrowserRouter as Router, Switch, Route, } from 'react-router-dom';

import {LogIn} from './components/home/home.js';
import {Header} from './components/header/header.js';
import {User} from './components/User/user.js'
import {Register} from './components/register/register.js';
import {Quiz} from './components/QuizEdit/quizEdit.js';
import {QuestionEdit} from './components/questionEdit/questionEdit';
import {NewQuestion} from './components/newQuestion/newQuestion';
import {NewQuiz} from './components/addQuiz/addQuiz';
import {StartQuiz} from './components/startQuiz/startQuiz';
import {UserProfile} from './components/userProfile/userProfile';

function App() {
  return (
    <Router>
      <div>
          <Header></Header>
          <Switch>
            <Route path="/user"> <User/> </Route>
            <Route path="/userprofile"> <UserProfile/> </Route>
            <Route path="/editquiz"> <Quiz/> </Route>
            <Route path="/register"> <Register/> </Route>
            <Route path="/editquestion"> <QuestionEdit/> </Route>
            <Route path="/newquestion"> <NewQuestion/> </Route>
            <Route path="/addquiz"> <NewQuiz/> </Route>
            <Route path="/startquiz"> <StartQuiz/> </Route>
            <Route path="/"> <LogIn/> </Route>
          </Switch>
        {/* <CircularProgress></CircularProgress> */}
      </div>
    </Router>
  );
}

export default App;
