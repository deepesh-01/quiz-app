import React,{useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

import useStyles from './questionEditStyles';

import {Grid,TextField,Typography,Button,CircularProgress,Container, Dialog, DialogTitle, DialogActions, DialogContent,Select,InputLabel,MenuItem, Radio,RadioGroup,FormControlLabel} from '@material-ui/core';
import {Alert} from '@material-ui/lab';

import {getQues, updateQuestion} from '../../actions/question';
import { verifyUser } from '../../actions/user';

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
    const oldQ = useSelector((state)=>state.data.question);
    
    const [openUpdtae,setOpenUpdtae] = useState(false);
    const [success,setSuccess] = useState(false);
    
    let val = false;
    
    const token = localStorage.getItem("jwtToken");
    console.log("jwtToken",token);
    
    useEffect( async () =>{
        if(!token) history.push('/');
        val = await dispatch(getQues(questionId));
        const verify = await dispatch(verifyUser());
        console.log("val is : ",val);
        
    },[]);

    const [field,setField] = useState("");
    const [value,setValue] = useState("");
    const [empty,setEmpty] = useState(false);


    const handleOpenUpdate = () => {
        setOpenUpdtae(true);
    }

    const handleCloseUpdate = () => {
        setOpenUpdtae(false);
    }

    const handleField = (e) => {
        setField(e.target.value);
    }

    const handleValue = (e) => {
        setValue(e.target.value);
    }

    const [open,setOpen] = useState(true);

    const handleClickOpen = () => {
      setOpen(true);
    };
    
    const handleClose = () => {
      setOpen(false);
    };

    let data = {};
    const handleSubmit = async (e) => {
        setEmpty(false)
        e.preventDefault();
        data["id"] = questionId;
        data[field] = value;
        console.log(data);
        if(value){
        handleOpenUpdate();
        const token = localStorage.getItem("jwtToken");
        const val = await dispatch(updateQuestion(data,token));
        console.log("val",val);
        setSuccess(val);
        console.log("setSuccess",success);
        }
        else{
            setEmpty(true)
        }
    };

    if(error) console.log(errMsg);
    return (
        <div>
            <Container component="main" className={classes.root} maxWidth="sm">
                        <Dialog
                        open={openUpdtae}
                        onClose={handleCloseUpdate}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        >
                        <DialogTitle id="alert-dialog-title">
                        {success ? "Question updated successfully!" : "Question update failed!"}
                        </DialogTitle>
                        <DialogActions>
                        <Button onClick={handleCloseUpdate}>Done</Button>
                        </DialogActions>
                    </Dialog>
                    {error ? 
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
                    {load || !oldQ ? <CircularProgress/> : 
                    <div>
                    <Grid item className={classes.gridItem} sm={12} xs={12}>
                    <form className={classes.form} fullWidth noValidate>
                        <Typography style={{marginLeft:"10px"}} className={classes.title} gutterBottom>
                                {oldQ.question.question}
                            </Typography>
                            <RadioGroup 
                                style={{marginLeft:"10px"}}
                                className={classes.radioGroup}
                                aria-label="options"
                                defaultValue={oldQ.question.correctOption}
                                name="radio-buttons-group"
                            >
                                <FormControlLabel value="option1" control={<Radio  />} label={oldQ.question.option1} />
                                <FormControlLabel value="option2" control={<Radio />} label={oldQ.question.option2} />
                                <FormControlLabel value="option3" control={<Radio />} label={oldQ.question.option3} />
                                <FormControlLabel value="option4" control={<Radio />} label={oldQ.question.option4} />
                            </RadioGroup>
                            <Typography style={{marginLeft:"10px"}} className={classes.title} gutterBottom>
                                Correct Answer : {oldQ.question.correctOption}
                            </Typography>
                        <div>
                        <InputLabel style={{marginLeft:"10px"}}>Update Field</InputLabel>
                            <Select
                                style={{marginLeft:"10px",minWidth:"80px"}}
                                label="Age"
                                value={field || "field"}
                                onChange={handleField}
                                >
                            <MenuItem value="question">Question</MenuItem>
                            <MenuItem value="option1">Option 1</MenuItem>
                            <MenuItem value="option2">Option 2</MenuItem>
                            <MenuItem value="option3">Option 3</MenuItem>
                            <MenuItem value="option4">Option 4</MenuItem>
                            <MenuItem value="correctOption">Correct Option</MenuItem>
                            </Select>

                            <TextField
                                className={classes.text}
                                variant="outlined"
                                label="Enter the value"
                                name="value"
                                onChange={handleValue}
                                multiline
                            ></TextField>
                            {empty ? <Alert style={{marginLeft : "10px",marginBottom:"10px"}} severity="error"> {"Enter The value."} </Alert> : null}
                        </div>
                        <Button
                            className={classes.button}
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
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