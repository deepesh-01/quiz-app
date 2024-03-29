import React, {useEffect, useState} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';

import {CircularProgress,Avatar,Button,CssBaseline,TextField,Typography,Container,Grid,Link,Dialog,DialogActions,DialogContent} from '@material-ui/core';
import {LockOutlined} from '@material-ui/icons';
import {Alert} from '@material-ui/lab';

import useStyles from './homeStyles';

import {login} from '../../actions/user';
import { verifyUser } from '../../actions/user';

export const LogIn = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  
  const [inputs,setInputs] = useState({
    email : '',
    password: '',
  });
  
  // console.log("error : ",error);
  // console.log("load : ",load);
  
  const token = localStorage.getItem("jwtToken");
  console.log("jwtToken",token);

  useEffect(async () =>{
    if(token){
      const verify = await dispatch(verifyUser());
      history.push('/user');
    }
  },[])
  
  const [submitted,setSubmitted] = useState(false);
  const [submitCp,setSubmitCp] = useState(false);
  const [dis,setDis] = useState(true);

  const errMsg = useSelector((state)=>state.data.errMsg);
  const error = useSelector((state)=>state.data.error);
    
  const [open,setOpen] = useState(true);

  const handleClickOpen = () => {
      setOpen(true);
  };
    
  const handleClose = () => {
      setOpen(false);
  };

  const handleChange = (e) => {
      const value = e.target.value;
      setInputs({...inputs,[e.target.name]:value});
  }

  const handleSubmit = async (e) => {
      setDis(true);
      e.preventDefault();
      setSubmitted(true);
      setSubmitCp(true);
      if( !inputs.email || !inputs.password ) setSubmitCp(false)
      console.log(inputs);
      
      const val = await dispatch(login(inputs));
      console.log(val);
      setDis(val); 
      setSubmitCp(val);
      console.log("errMsg : ", errMsg);
      {val ? history.push('/user') : history.push('/')}
      // console.log("dispatch value : ",dis);
  }

    // const {email, password} = inputs;

    return(
        <div>
            <Container component="main" maxWidth="xs">
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
                <div>
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
                    {/* <Link to={ !error && !load ? "/user" : null } style={{ textDecoration: 'none' }}> */}

                    {!dis ? <Alert severity="error"> {errMsg.msg || errMsg.error.email || errMsg.error.password } </Alert> : null}
                      <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      >
                        Log In
                      </Button>

                      <Grid container>
                        {/* <Grid item xs>
                          <Link href="#" variant="body2">
                            Forgot password?
                          </Link>
                        </Grid> */}
                          <Grid item >
                            <Link className={classes.center} href='/register' variant="body2">
                              {"Don't have an account? Sign Up"}
                            </Link>
                          </Grid>
                        </Grid>
                    {/* </Link> */}

                      
                  </form>
                </div>
              </div>
            }
            </Container>
        </div>
    );

}

