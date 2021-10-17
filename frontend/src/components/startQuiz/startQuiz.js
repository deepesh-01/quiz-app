import React, {useEffect, useState, useRef} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

import {TextField, Grid, Container, CircularProgress, Card,InputLabel,Select,MenuItem, RadioGroup,Radio,FormControlLabel, Button, Typography} from '@material-ui/core';

import useStyles from './startQuizStyles';

import {getQuiz} from '../../actions/quiz';

export const StartQuiz = () => {

    useEffect( async () =>{
        if(!user || !quizId) history.push('/');
        const val = await dispatch(getQuiz(quizId));
    },[]);

    const history = useHistory();
    const classes = useStyles();
    const dispatch = useDispatch();

    const [answers,setAns] = useState([]);

    const handleAns = async (e) => {
        const questionno = (e.target.name);
        const ans = e.target.value;
        var data = answers;
        const ind = data.find((ans) => ans.id === questionno);
        if(ind !== undefined ){
            const id = parseInt(ind.id);
            data[id-1].answer = ans; 
            return setAns(data);
        }
        return setAns([ ...answers,{
            id : questionno,
            answer : ans,
        }]);
    }

    const handleSubmit = () => {
        console.log("Handle Submit called");
        console.log("answers are : ",answers);
    }

    const quizId = history.location.state ? history.location.state.quizId : null ;

    const errMsg = useSelector((state)=>state.data.errMsg);
    const error = useSelector((state)=>state.data.error);
    const load = useSelector((state)=>state.data.load); 
    const user = useSelector((state)=>state.data.user);
    const quiz = useSelector((state)=>state.data.quiz);


    return (
        <Container component="main" className={classes.root} maxWidth="sm">
        { error ? <p> Error : {errMsg.msg || errMsg.message} </p> : null}
            <Grid spacing={2} direction="column" alignItems="center" justify="center">
                {load || !quiz ? <CircularProgress/> :
                <div>
                    <Grid item className={classes.gridItem} sm={12} xs={12}>
                        <Typography className={classes.title} gutterBottom>
                            {quiz.quiz.name}
                        </Typography>
                    </Grid>
                    <Grid item className={classes.gridItem} sm={12} xs={12}>
                        <Typography className={classes.desc} gutterBottom>
                            {quiz.quiz.description}
                        </Typography>
                    </Grid>
                    <div>
                    {!quiz.quiz.questions.length ? <span> 0 Questions </span> 
                    :
                    quiz.quiz.questions.map((question, index)=>
                            <Grid item className={classes.questionGrid} >
                            <Card variant="outlined">
                            <Typography className={classes.question} gutterBottom>
                                {index+1}. {question.question}
                            </Typography>
                            <RadioGroup 
                                name={index+1}
                                className={classes.radioGroup}
                                aria-label="options"
                                onChange={handleAns}
                            >
                                <FormControlLabel value={question.option1} control={<Radio />} label={question.option1} />
                                <FormControlLabel value={question.option2} control={<Radio />} label={question.option2} />
                                <FormControlLabel value={question.option3} control={<Radio />} label={question.option3} />
                                <FormControlLabel value={question.option4} control={<Radio />} label={question.option4} />
                            </RadioGroup>
                            </Card>
                            </Grid>
                    )}
                    </div>
                <div className={classes.addQ}>
                    <Button className={classes.addQuiz} variant="contained" color="primary" size="small" onClick={handleSubmit}>Submit</Button>
                </div>
                </div>
                }
            </Grid>
        </Container>
    )
}
