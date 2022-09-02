import React, {useEffect, useState} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';

import {CircularProgress,Dialog,DialogContent,DialogActions,Button,CssBaseline,TextField,Typography,Container,Grid,Link} from '@material-ui/core';
import {LockOutlined} from '@material-ui/icons';
import {Alert} from '@material-ui/lab';

import useStyles from './userProfileStyles';

import { verifyUser, updateUser } from '../../actions/user';

export const UserProfile = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const load = useSelector((state) => state.data.load);
    const error = useSelector((state) => state.data.error);
    const errMsg = useSelector((state)=>state.data.errMsg);
    const user = useSelector((state)=>state.data.user);

    const token = localStorage.getItem("jwtToken");
    console.log("jwtToken",token);

    const [userProfile,setUserProfile] = useState({
      firstName:user?.user.firstName,
      lastName:user?.user.lastName,
      phoneNumber:user?.user.phoneNumber
  });

    let verify = false;
    useEffect(async () =>{
        if(token){
          verify = await dispatch(verifyUser());
        };
      },[]);

    const [updateButton,setUpdateButton] = useState(false);

    const [update,setUpdate] = useState(true);

    const handleEdit = (e) => {
      setUpdateButton(true);
      const value = e.target.value;
      setUserProfile({...userProfile,[e.target.name]:value});
    }

    const [open,setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
  };

    const handleSubmit = async () => {
      if(typeof userProfile.email === "undefined") setUserProfile({...userProfile,email:user.user.email});
      if(typeof userProfile.firstName === "undefined") setUserProfile({...userProfile,firstName:user.user.firstName});
      if(typeof userProfile.lastName === "undefined") setUserProfile({...userProfile,lastName:user.user.lastName});
      if(typeof userProfile.phoneNumber === "undefined") setUserProfile({...userProfile,email:user.user.phoneNumber});
      console.log("userProfile : ",userProfile);
      const up = await dispatch(updateUser(userProfile));
      setUpdate(up);
      setUpdateButton(false);
      console.log("up",up);

    }


    return (
        <div>
          {
            error ? 
            errMsg.message || errMsg.msg 
            :
            <Container component="main" maxWidth="xs">
                <div>
                <CssBaseline></CssBaseline>
                  <Typography component='h1' variant='h5'>
                      User Profile
                  </Typography>
                { load ? <CircularProgress/> :  
                    user ? 
                  <form className={classes.form} noValidate>
                      <TextField
                      variant='outlined'
                      margin='normal'
                      label="username"
                      fullWidth
                      type='text'
                      name="email"
                      disabled={true}
                      value={user.user.email}
                      required="Please enter the email"
                      autoComplete="email"
                      onChange={""}
                      />

                      <TextField
                      variant='outlined'
                      margin='normal'
                      label='First Name'
                      fullWidth
                      type='text'
                      name='firstName'
                      value={userProfile.firstName || user.user.firstName}
                      required="Please enter the password"
                      autoComplete="current-password"
                      onChange={handleEdit}
                      />

                      <TextField
                      variant='outlined'
                      margin='normal'
                      label='Last Name'
                      fullWidth
                      type='text'
                      name='lastName'
                      value={userProfile.lastName || user.user.lastName}
                      required="Please enter the password"
                      autoComplete="current-password"
                      onChange={handleEdit}
                      />

                      <TextField
                      variant='outlined'
                      margin='normal'
                      label='Phone Number'
                      fullWidth
                      type='text'
                      name='phoneNumber'
                      value={userProfile.phoneNumber  || user.user.phoneNumber}
                      required="Please enter the password"
                      autoComplete="current-password"
                      onChange={handleEdit}
                      /> 
                  </form>
                  :
                  null
                  }
                  {
                  updateButton ? 
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={()=>{handleSubmit();handleClickOpen();}}
                    >
                      Update
                  </Button>
                    :
                    null
                  }
                    
                </div>
                <div>
                    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                        <DialogContent dividers>
                        <Typography gutterBottom>
                            {update? "User details updated." : "Error updating user details." }
                        </Typography>
                        </DialogContent>
                        <DialogActions>
                        <Button autoFocus onClick={handleClose}>
                            Ok
                        </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </Container>
            }
        </div>
    );
}
