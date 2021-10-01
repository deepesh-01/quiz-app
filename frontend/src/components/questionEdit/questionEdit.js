import React,{useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

import useStyles from './questionEditStyles';

import {Grid,TextField,Button,CircularProgress,Container, Dialog, DialogTitle, DialogActions} from '@material-ui/core';

import {getQues, updateQuestion} from '../../actions/question';

export const  QuestionEdit = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const classes = useStyles();

    const questionId = history.location.state ? history.location.state.questionId : null ;
    // console.log("history state questionId : ",questionId);

    const errMsg = useSelector((state)=>state.data.errMsg);
    const error = useSelector((state)=>state.data.error);
    const load = useSelector((state)=>state.data.load); 
    const user = useSelector((state)=>state.data.user);
    const token = useSelector((state)=>state.data.user.token);
    const oldQ = useSelector((state)=>state.data.question);
    
    const [open,setOpen] = useState(false);
    const [success,setSuccess] = useState(false);

    useEffect( async () =>{
        if(!user) history.push('/');
        const val = await dispatch(getQues(questionId));
        console.log("val is : ",val);
        if(oldQ){
            setQues({
                ...ques,
                question : oldQ.question.question,
                option1 : oldQ.question.option1,
                option2 : oldQ.question.option2,
                option3 : oldQ.question.option3,
                option4 : oldQ.question.option4,
                correctOption : oldQ.question.correctOption,
            });
    }
    },[]);

    const [ques,setQues] = useState({
        id:questionId,
        question:"",
        option1:"",
        option2:"",
        option3:"",
        option4:"",
        correctOption:"",
    });

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleChange = (e) => {
        const value = e.target.value;
        setQues({...ques,[e.target.name]:value});
    };
    const handleSubmit = (e) => {
        setSuccess(false);
        e.preventDefault();
        if(!ques.question){
            setQues({...ques,question:oldQ.question.question})
        }
        if(!ques.option1){
            setQues({...ques,option1:oldQ.question.option1})
        }
        if(!ques.option2){
            setQues({...ques,option2:oldQ.question.option2})
        }
        if(!ques.option3){
            setQues({...ques,option3:oldQ.question.option3})
        }
        if(!ques.option4){
            setQues({...ques,option4:oldQ.question.option4})
        }
        if(!ques.correctOption){
            setQues({...ques,correctOption:oldQ.question.correctOption})
        }
        handleOpen();
        console.log(ques);
        console.log(token);
        const val = dispatch(updateQuestion(ques,token));
        setSuccess(val);
    };
    return (
        <div>
            <Container component="main" className={classes.root} maxWidth="sm">
                        <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        >
                        <DialogTitle id="alert-dialog-title">
                        {setSuccess ? "Question updated successfully!" : "Question update failed!"}
                        </DialogTitle>
                        <DialogActions>
                        <Button onClick={handleClose}>Done</Button>
                        </DialogActions>
                    </Dialog>
                {error ? <p> {errMsg.msg} </p> : 
                <Grid spacing={2} direction="column" alignItems="center" justify="center">
                    {load || !oldQ ? <CircularProgress/> : 
                    <div>
                    <Grid item className={classes.gridItem} sm={12} xs={12}>
                    <form className={classes.form} fullWidth noValidate onSubmit={handleSubmit}>
                        <TextField
                        className={classes.text}
                        variant="outlined"
                        label="Question"
                        name="question"
                        value={ques.question || oldQ.question.question}
                        onChange={handleChange}
                        ></TextField>
                        <TextField
                        className={classes.text}
                        variant="outlined"
                        label="Option 1"
                        name="option1"
                        value={ques.option1 || oldQ.question.option1}
                        onChange={handleChange}
                        ></TextField>
                        <TextField
                        className={classes.text}
                        variant="outlined"
                        label="Option2"
                        name="option2"
                        value={ques.option2 || oldQ.question.option2}
                        onChange={handleChange}
                        ></TextField>
                        <TextField
                        className={classes.text}
                        variant="outlined"
                        label="Option 3"
                        name="option3"
                        value={ques.option3 || oldQ.question.option3}
                        onChange={handleChange}
                        ></TextField>
                        <TextField
                        className={classes.text}
                        variant="outlined"
                        label="Option 4"
                        name="option4"
                        value={ques.option4 || oldQ.question.option4}
                        onChange={handleChange}
                        ></TextField>
                        <TextField
                        className={classes.text}
                        variant="outlined"
                        label="Correct Option"
                        name="correctOption"
                        value={ques.correctOption || oldQ.question.correctOption}
                        onChange={handleChange}
                        ></TextField>
                        <Button
                            className={classes.button}
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                        Update Question
                        </Button>
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