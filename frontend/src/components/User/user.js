import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

import { getAllQuiz, deleteQuiz } from '../../actions/quiz';

import { CircularProgress, Card, CardContent, Typography, CardActions, Button, Grid, Dialog, DialogTitle, DialogActions } from '@material-ui/core';

import useStyles from './userStyles';

export const User = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const quizes = useSelector((state) => state.data.quizes);
    const user = useSelector((state) => state.data.user);
    const load = useSelector((state) => state.data.load);
    const error = useSelector((state) => state.data.error);

    const [deleteq, setDeleteq] = useState(false);
    
    const [open, setOpen] = useState(false);

    useEffect(async () => {
        if (!user) history.push('/');
        const val = await dispatch(getAllQuiz());
        console.log("val in useEffect : ", val);
        console.log("quizes after useEffect : ", quizes);
    }, []);


    console.log("error : ", error, " load : ", load);

    const editQuiz = (id) => {
        console.log("id : ", id);
        history.push({
            pathname: '/editquiz',
            state: { quizid: id }
        });
    }

    const [quizId,setQuizId] = useState('');

    const addQuiz = () => {
        history.push('/addquiz');
    }

    const handleClickOpen = (id) => {
        setQuizId({...quizId,id});
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const deleteQuize = async () => {
        handleClose();
        setDeleteq(false);
        if (quizId) {
            const token = user.token;
            console.log("id in deleteQuize is : ", quizId);
            console.log("token in deleteQuize is : ", token);
            const val = await dispatch(deleteQuiz(quizId.id, token));
            setDeleteq(val);
            console.log("val in after deleteQuize : ", val);
            history.push('/user');
        }
        else{
            console.log("Quiz id is empty");
        }
    }

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle id="alert-dialog-title">
                    Do you really want to delete?
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}>Do Not Delete</Button>
                    <Button onClick={deleteQuize} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
            {load || !quizes || !user ? <CircularProgress /> :
                <Grid container spacing={3} className={classes.grid}>
                    {quizes.quizes.map((quiz) =>
                        <Grid item xs={12} sm={6} md={4} >
                            <Card className={classes.root}>
                                <CardContent>
                                    <Typography variant="h5" component="h2">
                                        {quiz.name}
                                    </Typography>
                                    <Typography className={classes.pos} >
                                        Questions : {quiz.noOfQue}
                                    </Typography>
                                    <Typography className={classes.pos} >
                                        {quiz.description}
                                    </Typography>
                                    <Typography variant="body1" color="textSecondary">
                                        By - {quiz.createdBy.firstName} {quiz.createdBy.lastName}
                                    </Typography>
                                    <Typography variant="body2" className={classes.pos} color="textSecondary">
                                        {moment(quiz.createdAt).calendar()}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button variant="contained" color="primary" size="small" disabled={quiz.noOfQue > 9 ? false : true}>Start Quiz</Button>
                                    <Button variant="contained" color="primary" size="small" disabled={!user.user.admin} onClick={() => editQuiz(quiz._id)}>Edit Quiz</Button>
                                    <Button variant="contained" color="primary" size="small" disabled={!user.user.admin} onClick={() => handleClickOpen(quiz._id)}>Delete Quiz</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    )}
                </Grid>
            }
            {!user ? <span> No user present </span> :
                <div className={classes.addQ}>
                    <Button className={classes.addQuiz} variant="contained" color="primary" size="small" disabled={!user.user.admin} onClick={addQuiz}>Add New Quiz</Button>
                </div>
            }
        </div>
    );
}