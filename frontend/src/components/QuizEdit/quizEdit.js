import React, {useEffect, useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

import {Button,TextField,TextareaAutosize,Grid,Container} from '@material-ui/core';

import {getQuiz} from '../../actions/quiz';

import useStyles from './quizEditStyles';

export const Quiz = (props) =>{
    const history = useHistory();
    const dispatch = useDispatch();
    const classes = useStyles();

    console.log("quizId in quizEdit is : ",history.location.state.quizid);
    const quizId = history.location.state.quizid;

    const  user = useSelector((state)=>state.data.user);
    const  quiz = useSelector((state)=>state.data.quiz);

    useEffect( async () =>{
        if(!user) history.push('/');
        const val = await dispatch(getQuiz(quizId));
        console.log("dispatch getQuiz val : ",val);
    },[]);


    // const quiz = useSelector((state) => state.data.quizes.quizes.filter((quiz)=>quizId));
    console.log(quiz);
    return(
        <div>
            <h1>
                Edit Quiz route is working!
            </h1>
        </div>
    )
}