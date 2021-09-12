import './App.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {CircularProgress} from '@material-ui/core';

import {LogIn} from './components/home/home.js';

function App() {
  return (
    <div >
        <LogIn></LogIn>
      {/* <CircularProgress></CircularProgress> */}
    </div>
  );
}

export default App;
