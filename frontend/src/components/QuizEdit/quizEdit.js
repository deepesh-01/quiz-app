import React, {useEffect, useState, useRef} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {Alert} from '@material-ui/lab';

import {TextField, Grid, Container, CircularProgress, Card,InputLabel,Select,MenuItem, RadioGroup,Radio,FormControlLabel, Button, Typography, Dialog,DialogActions,DialogContent} from '@material-ui/core';

import {getQuiz, updateQuiz} from '../../actions/quiz';
import {deleteQuestion} from '../../actions/question';
import { verifyUser } from '../../actions/user';

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
    
    
    const token = localStorage.getItem("jwtToken");
    console.log("jwtToken",token);
    
    
    useEffect( async () =>{
        if(!token || !quizId) history.push('/user');
        const val = await dispatch(getQuiz(quizId));
        const verify = await dispatch(verifyUser());
        console.log("dispatch getQuiz val : ",val);
        setEmpty(false);
    },[]);

    const [open,setOpen] = useState(true);

    const handleClickOpen = () => {
      setOpen(true);
    };
    
    const handleClose = () => {
      setOpen(false);
    };
    
    const [field,setField] = useState("");
    const [value,setValue] = useState("");
    const [empty,setEmpty] = useState(false);
    const handleField = (e) => {
        setField(e.target.value);
    }

    const handleValue = (e) => {
        setValue(e.target.value);
    }

    const handleSubmit = (e) => {
        const data = {id : quizId};
        data[field] = value;
        e.preventDefault();
        if(!value){ 
            setEmpty(true);
            console.log(data);
        }
        else{ 
            setEmpty(false);
            console.log("data : ",data);
            dispatch(updateQuiz(data,user.token));
        }
    }


    const editQuestion = (id) => {
        console.log("id : ",id);
        history.push({
            pathname:'/editquestion',
            state: {questionId : id}
        });
    }

    const handleDelete = (id) => {
        const token = user.token;
        console.log("id is : ",id);
        console.log("token is : ",token);
        const val = dispatch(deleteQuestion(id,token));
    }

 
    return(
        <div >
            
            <Container component="main" className={classes.root} maxWidth="sm">
                { error ? 
                    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                        <DialogContent dividers>
                        <Typography gutterBottom>
                                Error
                            </Typography>
                            </DialogContent>
                            <DialogContent dividers>
                            <Typography gutterBottom>
                                {error.msg || errMsg} 
                            </Typography>
                        </DialogContent>
                        <DialogActions>
                        <Button autoFocus onClick={handleClose}>
                            Ok
                        </Button>
                        </DialogActions>
                    </Dialog> 
                    : 
                <Grid spacing={2} direction="column" alignItems="center" justify="center">
                    {load || !quiz ? <CircularProgress/> : 
                <div>
                <form className={classes.form} fullWidth noValidate onSubmit={handleSubmit}>
                    <Grid item className={classes.gridItem} sm={12} xs={12}>
                    <Typography className={classes.title} gutterBottom>
                                    Quiz Name : {quiz.quiz.name}
                                </Typography>
                    </Grid>
                    <Grid item className={classes.gridItem} sm={12} xs={12}>
                    <Typography className={classes.title} gutterBottom>
                        Quiz Description : {quiz.quiz.description}
                    </Typography>
                        <InputLabel style={{marginLeft:"10px"}}>Update Field</InputLabel>
                        <Select
                            style={{marginLeft:"10px"}}
                            label="Age"
                            value={field}
                            onChange={handleField}
                            >
                        <MenuItem value="name">Name</MenuItem>
                        <MenuItem value="description">Description</MenuItem>
                        </Select>
                        <TextField
                            className={classes.text}
                            variant="outlined"
                            label="Enter the value"
                            name="value"
                            onChange={handleValue}
                            multiline
                        ></TextField>

                    </Grid>
                    {empty ? <Alert style={{margin : "0 10px 10px 10px"}} severity="error"> {"Name or description cannot be empty."} </Alert> : null}
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
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    onClick={()=>editQuestion(question._id)}
                                    >Edit Question</Button>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    onClick={()=>handleDelete(question._id)}
                                    >Delete Question</Button>
                                </Card>
                                </Grid>
                            )}
                        </div>
                        <Button
                            fullWidth
                            variant="contained"
                            color="secondary"
                            className={classes.addButton}
                            onClick={()=>
                                history.push({
                                pathname: '/newquestion',
                                state: { quizid: quizId }
                                })
                            }
                        >Add Questions</Button>
                    </div>
                    }    
                </Grid>
                }
            </Container>
        </div>
    )
}