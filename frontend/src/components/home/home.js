import React, {useState} from 'react';
import useStyles from './homeStyles';

import {useSelector,useDispatch} from 'react-redux';

import {CircularProgress,Avatar,Button,CssBaseline,TextField,FormControlLabel,Checkbox,Link,Grid,Box,Typography,Container} from '@material-ui/core';
import {LockOutlined} from '@material-ui/icons';

import {login} from '../../actions/user';

export const LogIn = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [inputs,setInputs] = useState({
        email : '',
        password: '',
    });

    const [submitted,setSubmitted] = useState(false);
    const [submitCp,setSubmitCp] = useState(false);



    const handleChange = (e) => {
        const value = e.target.value;
        setInputs({...inputs,[e.target.name]:value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setSubmitCp(true);
        if( !inputs.email || !inputs.password ) setSubmitCp(false)
        console.log(inputs);
        dispatch(login(inputs));
    }

    // const {email, password} = inputs;

    return(
        <div>
            <Container component="main" maxWidth="xs">
                <CssBaseline></CssBaseline>
                <div className={classes.paper}>
                  {submitCp ? <CircularProgress className={classes.circular}/> : 
                    <Avatar className={classes.avatar}>
                        <LockOutlined/>
                    </Avatar>
                  }
                  <Typography component='h1' variant='h5'>
                      Log In
                  </Typography>
                  <form className={classes.form} noValidate onSubmit={handleSubmit}>
                      <TextField
                      variant='outlined'
                      margin='normal'
                      label="E-mail"
                      fullWidth
                      type='text'
                      name="email"
                      value={inputs.email}
                      required="Please enter the email"
                      autoComplete="email"
                      onChange={handleChange}
                      />
                      {submitted && !inputs.email ? <span style={{color:'red'}}>Please enter the email</span> : null}

                      <TextField
                      variant='outlined'
                      margin='normal'
                      label='Password'
                      fullWidth
                      type='password'
                      name='password'
                      value={inputs.password}
                      required="Please enter the password"
                      autoComplete="current-password"
                      onChange={handleChange}
                      />
                      {submitted && !inputs.password ? <span style={{color:'red'}}>Please enter the password</span> : null}

                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    >
                        Log In
                    </Button>

                      
                  </form>
                </div>
            </Container>
        </div>
    );

}

