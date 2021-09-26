import React, {useEffect, useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

import {TextField, Grid, Container, CircularProgress, Card, CardContent, RadioGroup,Radio,FormControlLabel, Button, Typography} from '@material-ui/core';

import {getQuiz, updateQuiz} from '../../actions/quiz';

import useStyles from './quizEditStyles';

export const Quiz = (props) =>{
    const history = useHistory();
    const dispatch = useDispatch();
    const classes = useStyles();

    const quizId = history.location.state ? history.location.state.quizid : null ;
    // console.log("quizId in quizEdit is : ",quizId);

    const  user = useSelector((state)=>state.data.user);
    const  quiz = useSelector((state)=>state.data.quiz);

    useEffect( async () =>{
        if(!user) history.push('/');
        const val = await dispatch(getQuiz(quizId));
        console.log("dispatch getQuiz val : ",val);
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Quiz Changes : ",quizChanges);
        dispatch(updateQuiz(quizChanges,user.token));
    }

    const handleChange = (e) => {
        const value = e.target.value;
        setQuizChange({...quizChanges,[e.target.name]:value});
    }
 
    // const quiz = useSelector((state) => state.data.quizes.quizes.filter((quiz)=>quizId));
    return(
        <div >
            <Container component="main" className={classes.root} maxWidth="sm">
                <Grid spacing={2} direction="column" alignItems="center" justify="center">
                    {!quiz ? <CircularProgress/> : 
                <div>
                <form className={classes.form} fullWidth noValidate onSubmit={handleSubmit}>
                    <Grid item className={classes.gridItem} sm={12} xs={12}>
                        <TextField
                        className={classes.text}
                        variant="outlined"
                        label="Quiz Name"
                        name="name"
                        value={quizChanges.name}
                        onChange={handleChange}
                        >
                        </TextField>
                    </Grid>
                    <Grid item className={classes.gridItem} sm={12} xs={12}>
                    <TextField
                        className={classes.text}
                        variant="outlined"
                        label="Quiz Description"
                        multiline="true"
                        name="description"
                        value={quizChanges.description}
                        onChange={handleChange}
                        />
                    </Grid>
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
            </Container>
        </div>
    )
}