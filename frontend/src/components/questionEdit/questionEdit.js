import React,{useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

import useStyles from './questionEditStyles';

import {Grid,TextField,Button,CircularProgress,Container} from '@material-ui/core';

import {getQues} from '../../actions/question';

export const  QuestionEdit = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const classes = useStyles();

    const questionId = history.location.state ? history.location.state.questionId : null ;
    console.log("history state questionId : ",questionId);

    const errMsg = useSelector((state)=>state.data.errMsg);
    const error = useSelector((state)=>state.data.error);
    const load = useSelector((state)=>state.data.load); 
    const user = useSelector((state)=>state.data.user);
    const question = useSelector((state)=>state.data.question);

    useEffect( async () =>{
        if(!user) history.push('/');
        const val = await dispatch(getQues(questionId));
        // console.log("val is : ",val);
        // console.log("question : ",question);
        // const val = await dispatch(getQuestion());
        // console.log("val in useEffect : ",val);
    },[]);

    const [ques,setQues] = useState({
        question:'',
        option1:'',
        option2:'',
        option3:'',
        option4:'',
        correctOption:'',
    });

    const handleChange = () => {};
    const handleSubmit = () => {};
    return (
        <div>
            <Container component="main" className={classes.root} maxWidth="sm">
                {error ? <p> {errMsg.msg} </p> : 
                <Grid spacing={2} direction="column" alignItems="center" justify="center">
                    {load || !question ? <CircularProgress/> : 
                    <div>
                    <Grid item className={classes.gridItem} sm={12} xs={12}>
                    <form className={classes.form} fullWidth noValidate onSubmit={handleSubmit}>
                        <TextField
                        className={classes.text}
                        variant="outlined"
                        label="Question"
                        name="name"
                        value={ques.question || question.question.question}
                        onChange={handleChange}
                        ></TextField>
                        <TextField
                        className={classes.text}
                        variant="outlined"
                        label="Option 1"
                        name="name"
                        value={ques.question || question.question.option1}
                        onChange={handleChange}
                        ></TextField>
                        <TextField
                        className={classes.text}
                        variant="outlined"
                        label="Option 2"
                        name="name"
                        value={ques.question || question.question.option2}
                        onChange={handleChange}
                        ></TextField>
                        <TextField
                        className={classes.text}
                        variant="outlined"
                        label="Option 3"
                        name="name"
                        value={ques.question || question.question.option3}
                        onChange={handleChange}
                        ></TextField>
                        <TextField
                        className={classes.text}
                        variant="outlined"
                        label="Option 4"
                        name="name"
                        value={ques.question || question.question.option4}
                        onChange={handleChange}
                        ></TextField>
                        <TextField
                        className={classes.text}
                        variant="outlined"
                        label="Correct Option"
                        name="name"
                        value={ques.question || question.question.correctOption}
                        onChange={handleChange}
                        ></TextField>
                    </form>
                    </Grid>
                    </div>
                    }
                    </Grid>
                }
            </Container>
        </div> 
    )
}