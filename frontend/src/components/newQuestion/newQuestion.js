import React,{useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

import {Container,TextField,Button,Grid,CircularProgress,Typography,Dialog,DialogActions,DialogContent} from '@material-ui/core';
import {Alert} from '@material-ui/lab';

import {newQuestion} from '../../actions/question';
import { verifyUser } from '../../actions/user';
import {getQuiz, updateQuiz} from '../../actions/quiz';

import useStyles from './newQuestionStyles';

export const NewQuestion = () => {
    
    const history = useHistory();
    const dispatch = useDispatch();
    const classes = useStyles();
    
    const errMsg = useSelector((state)=>state.data.errMsg);
    const error = useSelector((state)=>state.data.error);
    const load = useSelector((state)=>state.data.load); 
    const user = useSelector((state)=>state.data.user);
    const quiz = useSelector((state)=>state.data.quiz);

    const quizId = history.location.state ? history.location.state.quizid : null ;
    
    const [empty,setEmpty] = useState(false);
    
    const token = localStorage.getItem("jwtToken");
    console.log("jwtToken",token);
    
    useEffect( async () =>{
        if(!token || !quizId) history.push('/editquiz');
        else{
            const verify = await dispatch(verifyUser());
            const val = await dispatch(getQuiz(quizId));
            console.log("quizId",quizId);
            setInputs({...inputs,quizId:quizId,createdBy:user.user._id});
        }
    },[]);

    const [open,setOpen] = useState(true);

    const handleClickOpen = () => {
      setOpen(true);
    };
    
    const handleClose = () => {
      setOpen(false);
    };

    const [inputs,setInputs] = useState({
        quizId:'',
        createdBy:'',
        question:'',
        option1:'',
        option2:'',
        option3:'',
        option4:'',
        correctOption:'',
    });

    const handleChange = (e) => {
        const value = e.target.value;
        setInputs({...inputs,[e.target.name]: value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!inputs.quizId || !inputs.createdBy) setInputs({...inputs,quizId:quizId,createdBy:user.user._id});
        setEmpty(false);
        if(!inputs.question || !inputs.option1 || !inputs.option2 || !inputs.option3 || !inputs.option4 || !inputs.correctOption){
            setEmpty(true);
        }
        else{
        setEmpty(false);
        console.log("Inputs are : ",inputs);
        const token = localStorage.getItem("jwtToken");
        console.log("userId",user.user._id);
        console.log("quizId",quizId);
        console.log(inputs);
        const val = await dispatch(newQuestion(inputs,token));
        if(val) history.goBack();
        console.log("val of newQuestion : ",val);
        }
    }


    return (
        <div>
            <Container component="main" className={classes.root} maxWidth="sm">
                { error ? <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
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
                    {load || !user ? <CircularProgress/> : 
                    <Grid item className={classes.gridItem} sm={12} xs={12}>
                    <Typography className={classes.title} gutterBottom>
                        Add New Question
                    </Typography>
                    <TextField
                            className={classes.text}
                            variant="outlined"
                            label="Question Name"
                            name="question"
                            onChange={handleChange}
                            multiline
                        ></TextField>
                        <TextField
                            className={classes.text}
                            variant="outlined"
                            label="Option 1"
                            name="option1"
                            onChange={handleChange}
                            multiline
                        ></TextField>
                        <TextField
                            className={classes.text}
                            variant="outlined"
                            label="Option 2"
                            name="option2"
                            onChange={handleChange}
                            multiline
                        ></TextField>
                        <TextField
                            className={classes.text}
                            variant="outlined"
                            label="Option 3"
                            name="option3"
                            onChange={handleChange}
                            multiline
                        ></TextField>
                        <TextField
                            className={classes.text}
                            variant="outlined"
                            label="Option 4"
                            name="option4"
                            onChange={handleChange}
                            multiline
                        ></TextField>
                        <TextField
                            className={classes.text}
                            variant="outlined"
                            label="Correct Option"
                            name="correctOption"
                            onChange={handleChange}
                            multiline
                        ></TextField>
                        {empty ? <Alert style={{margin : "0 10px 10px 10px"}} severity="error"> {"Please fill all the fields."} </Alert> : null}
                        <Button
                            className={classes.button}
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                        >
                        Add Question
                        </Button>
                    </Grid>
                    }
                </Grid>
                }
            </Container>
        </div>
    )
}