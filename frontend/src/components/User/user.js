import React, { useEffect, useState} from 'react';
import { useHistory } from 'react-router';
import {useSelector,useDispatch} from 'react-redux';
import moment from 'moment';

import { getAllQuiz } from '../../actions/quiz';

import {CircularProgress,Card,CardContent,Typography,CardActions,Button,Grid} from '@material-ui/core';

import useStyles from './userStyles';

export const User = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const quizes = useSelector((state)=>state.data.quizes);
    const user = useSelector((state)=>state.data.user);
    const load = useSelector((state)=>state.data.load);
    const error = useSelector((state)=>state.data.error);

    console.log("first render quizes : ",quizes);

    useEffect( async () =>{
        if(!user) history.push('/');
        const val = await dispatch(getAllQuiz());
        console.log("val in useEffect : ",val);
    },[]);

    console.log("error : ",error, " load : ",load);

    const editQuiz = (id) => {
        console.log("id : ",id);
        history.push({
            pathname:'/editquiz',
            state: {quizid : id}
        });
    }

    return(
        <div>
        {!quizes ? <CircularProgress/> : 
        <Grid container spacing={3} className={classes.grid}>
            {quizes.quizes.map((quiz)=>
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
                    {console.log("abcd : " , quiz.noOfQue>=10 )}

                    <CardActions>
                        <Button  variant="contained" color="primary" size="small" disabled={quiz.noOfQue>9 ? false : true}>Start</Button>
                        <Button  variant="contained" color="primary" size="small" disabled={!user.user.admin} onClick={() => editQuiz(quiz._id)}>Edit</Button>
                    </CardActions>

                </Card>
            </Grid>
            )}
        </Grid>
        }
        </div>
    );
}