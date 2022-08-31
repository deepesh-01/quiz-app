import React, {useEffect, useState, useRef} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

import {Grid, Container, CircularProgress, Card, RadioGroup,Radio,FormControlLabel, Button, Typography, Dialog, DialogTitle,DialogActions,DialogContent} from '@material-ui/core';

import useStyles from './startQuizStyles';

import {getQuiz,submitQuiz} from '../../actions/quiz';
import { verifyUser } from '../../actions/user';

export const StartQuiz = () => {

    const errMsg = useSelector((state)=>state.data.errMsg);
    const error = useSelector((state)=>state.data.error);
    const load = useSelector((state)=>state.data.load); 
    const user = useSelector((state)=>state.data.user);
    const quiz = useSelector((state)=>state.data.quiz);
    const score = useSelector((state)=>state.data.score);

    const token = localStorage.getItem("jwtToken");
    console.log("jwtToken",token);

    useEffect( async () =>{
        if(!token || !quizId) history.push('/');
        const val = await dispatch(getQuiz(quizId));
        const verify = await dispatch(verifyUser());
    },[score]);

    const history = useHistory();
    const classes = useStyles();
    const dispatch = useDispatch();

    const [answers,setAns] = useState([]);

    const handleAns = async (e) => {
        const questionno = (e.target.name);
        const ans = e.target.value;
        var data = answers;
        // const ind = data.find((ans) => ans.id === questionno);
        const index = data.findIndex((ans) => ans.id === questionno);
        console.log(index);
        if(index !== -1 ){
            console.log("in if index is -> ",index);
            console.log("in if data is -> ",data);
            // const id = parseInt(ind.id);

            data[index].answer = ans; 
            return setAns(data);
        }
        return setAns([ ...answers,{
            id : questionno,
            answer : ans,
        }]);
    }

    const handleSubmit = () => {
        const token = localStorage.getItem("jwtToken");
        console.log("jwtToken : ",token);
        console.log("quizId : ",quizId);
        console.log("answer : ",answers);
        const val = dispatch(submitQuiz(quizId,token,answers));
        if(val) console.log("submitQuiz action dispatched successfully");
    }

    const quizId = history.location.state ? history.location.state.quizId : null ;

    const [open,setOpen] = useState(false);

    const handleClickOpen = () => {
        console.log("set open clicked");
        console.log("Score : ", score);
        setOpen(true);
    };
      
    const handleClose = () => {
        setOpen(false);
        history.push("/user");
    };

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
                    <Button className={classes.addQuiz} variant="contained" color="primary" size="small" onClick={()=>{handleSubmit();handleClickOpen();}}>Submit</Button>
                </div>
                <div>
                    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                        <DialogTitle> Review </DialogTitle>
                        <DialogContent dividers>
                        <Typography gutterBottom>
                            Questions Attempted : {score ? score.score.questionsAttempted.length : ""}
                        </Typography>
                        <Typography gutterBottom>
                            Questions Correct : {score ? score.score.correctAnswers.length : ""}
                        </Typography>
                        <Typography gutterBottom>
                            Score : {score ? score.score.correctAnswers.length : ""}
                        </Typography>
                        </DialogContent>
                        <DialogActions>
                        <Button autoFocus onClick={handleClose}>
                            Home
                        </Button>
                        </DialogActions>
                    </Dialog>
                </div>
                </div>
                }
            </Grid>
        </Container>
    )
}
