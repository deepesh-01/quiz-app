import React, {useEffect, useState, useRef} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {Alert} from '@material-ui/lab';

import {TextField, Grid, Container, CircularProgress, Card, CardContent, RadioGroup,Radio,FormControlLabel, Button, Typography} from '@material-ui/core';

import {getQuiz, updateQuiz} from '../../actions/quiz';

import useStyles from './quizEditStyles';

export const Quiz = (props) =>{
    const history = useHistory();
    const dispatch = useDispatch();
    const classes = useStyles();

    const quizId = history.location.state ? history.location.state.quizid : null ;
    // console.log("quizId in quizEdit is : ",quizId);
    const errMsg = useSelector((state)=>state.data.errMsg);
    const error = useSelector((state)=>state.data.error);
    const load = useSelector((state)=>state.data.load); 
    const user = useSelector((state)=>state.data.user);
    const quiz = useSelector((state)=>state.data.quiz);

    const name = useRef();
    const description = useRef();

    const [empty,setEmpty] = useState(false);

    useEffect( async () =>{
        if(!user) history.push('/');
        const val = await dispatch(getQuiz(quizId));
        console.log("dispatch getQuiz val : ",val);
        setEmpty(false);
        if(quiz){
        setQuizChange({...quizChanges,name:quiz.quiz.name,description:quiz.quiz.description});
        }
    },[]);


    const [quizChanges,setQuizChange] = useState({
        id : quizId,
        name : '',
        description: '',
    })

    console.log(quiz);
    console.log("quizChanges : ",quizChanges)

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!quizChanges.name || !quizChanges.description) setEmpty(true);
        else{ setEmpty(false);
        console.log("Quiz Changes : ",quizChanges);
        dispatch(updateQuiz(quizChanges,user.token));}
    }

    const handleChange = (e) => {
        const value = e.target.value;
        setQuizChange({...quizChanges,[e.target.name]:value});
    }
 
    // const quiz = useSelector((state) => state.data.quizes.quizes.filter((quiz)=>quizId));
    return(
        <div >
            
            <Container component="main" className={classes.root} maxWidth="sm">
                { error ? <p> {errMsg.msg} </p> : 
                <Grid spacing={2} direction="column" alignItems="center" justify="center">
                    {load || !quiz ? <CircularProgress/> : 
                <div>
                <form className={classes.form} fullWidth noValidate onSubmit={handleSubmit}>
                    <Grid item className={classes.gridItem} sm={12} xs={12}>
                    <Typography className={classes.title} gutterBottom>
                                    Quiz Name : {quiz.quiz.name}
                                </Typography>
                        <TextField
                        className={classes.text}
                        variant="outlined"
                        label="Quiz Name"
                        name="name"
                        ref={name}
                        value={quizChanges.name || quiz.quiz.name}
                        onChange={handleChange}
                        >
                        </TextField>
                    </Grid>
                    <Grid item className={classes.gridItem} sm={12} xs={12}>
                    <Typography className={classes.title} gutterBottom>
                                    Quiz Description : {quiz.quiz.description}
                                </Typography>
                    <TextField
                        className={classes.text}
                        variant="outlined"
                        label="Quiz Description"
                        multiline="true"
                        name="description"
                        ref={description}
                        value={quizChanges.description || quiz.quiz.description}
                        onChange={handleChange}
                        />
                    </Grid>
                    {empty ? <Alert severity="error"> {"Name or description cannot be empty."} </Alert> : null}
                    <Grid item className={classes.submit} sm={12} xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                        Save
                        </Button>
                    </Grid>
                    </form>
                        <div>
                            {!quiz.quiz.questions.length ? <span> 0 Questions </span> 
                            :
                            quiz.quiz.questions.map((question, index)=>
                                <Grid item className={classes.questionGrid} >
                                <Card variant="outlined">
                                <Typography className={classes.title} gutterBottom>
                                    {index+1}. {question.question}
                                </Typography>
                                <RadioGroup 
                                    className={classes.radioGroup}
                                    aria-label="options"
                                    defaultValue={question.correctOption}
                                    name="radio-buttons-group"
                                >
                                    <FormControlLabel value="option1" control={<Radio />} label={question.option1} />
                                    <FormControlLabel value="option2" control={<Radio />} label={question.option2} />
                                    <FormControlLabel value="option3" control={<Radio />} label={question.option3} />
                                    <FormControlLabel value="option4" control={<Radio />} label={question.option4} />
                                </RadioGroup>
                                <Typography className={classes.title} gutterBottom>
                                    Correct Answer : {question.correctOption}
                                </Typography>
                                </Card>
                                </Grid>
                            )}
                        </div>
                    </div>
                    }    
                </Grid>
                }
            </Container>
        </div>
    )
}