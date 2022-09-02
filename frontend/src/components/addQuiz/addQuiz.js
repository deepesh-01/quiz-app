import React,{useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

import {Container,TextField,Button,Grid,CircularProgress,Typography,Dialog,DialogActions,DialogContent} from '@material-ui/core';
import {Alert} from '@material-ui/lab';

import {newQuiz} from '../../actions/quiz';
import { verifyUser } from '../../actions/user';

import useStyles from './addQuizStyles';

export const NewQuiz = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const classes = useStyles();

    const errMsg = useSelector((state)=>state.data.errMsg);
    const error = useSelector((state)=>state.data.error);
    const load = useSelector((state)=>state.data.load); 
    const user = useSelector((state)=>state.data.user);
    const quiz = useSelector((state)=>state.data.quiz);

    const token = localStorage.getItem("jwtToken");
    console.log("jwtToken",token);

    useEffect(async ()=>{
        if(!token) history.push('/');
        else{
        const verify = await dispatch(verifyUser());
        }
    },[]);

    const [open,setOpen] = useState(true);

    const handleClickOpen = () => {
        setOpen(true);
    };
      
    const handleClose = () => {
        setOpen(false);
    };



    const [empty,setEmpty] = useState(false);

    const [inputs,setInputs] = useState({createdBy:user.user._id,name:'',description:''});

    const handleChange = (e) => {
        const value = e.target.value;
        setInputs({...inputs,[e.target.name]: value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEmpty(false);
        if(!inputs.createdBy) setInputs({...inputs,createdBy:user.user._id});
        if(!inputs.name || !inputs.description || !inputs.createdBy){ 
            setEmpty(true);
        }
        else{
            console.log("Inputs are : ",inputs);
            const token = localStorage.getItem("jwtToken");
            console.log("User token is : ",token);
            console.log("User is : ",user.user);
            console.log("userId : ",user.user._id);
            console.log("Inputs are : ",inputs);
            const val =await dispatch(newQuiz(inputs,token));
            setEmpty(val);
            if(val) history.goBack();
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
            null }
            <Grid spacing={2} direction="column" alignItems="center" justify="center">
                {load || !user ? <CircularProgress/> :  
                <Grid item className={classes.gridItem} sm={12} xs={12}>
                <Typography className={classes.title} gutterBottom>
                    Add New Quiz
                </Typography>
                <TextField
                        className={classes.text}
                        variant="outlined"
                        label="Quiz Name"
                        name="name"
                        onChange={handleChange}
                        multiline
                    ></TextField>
                    <TextField
                        className={classes.text}
                        variant="outlined"
                        label="Descrition"
                        name="description"
                        onChange={handleChange}
                        multiline
                    ></TextField>
                    {empty ? <Alert style={{marginLeft : "20px"}} severity="error"> {"Please fill all the fields."} </Alert> : null}
                <Button fullWidth className={classes.addQuiz}  variant="contained" color="primary" size="small" disabled={!user.user.admin} onClick={handleSubmit}>Add New Quiz</Button>
                </Grid>
                }
            </Grid>
        </Container>
        </div>
    )
}