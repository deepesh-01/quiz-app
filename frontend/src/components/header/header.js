import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';

import useStyles from './headerStyles';
import {AppBar,Toolbar,Typography,IconButton,Menu,MenuItem, Button} from '@material-ui/core';
import {AccountCircle} from '@material-ui/icons'

import {logOutUser} from '../../actions/user';

export const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  
  const user = useSelector((state)=>state.data.user);
  console.log(user);
  
  const [isUser,setisUser] = useState(false);
  
  const [firstname,setFirstname] = useState(null);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (e) => {
    setAnchorEl(e.currentTarget);
  }

  const handleClose = () => {
  };

  
  useEffect(()=>{
    if(user){ 
      setisUser(true);
      setFirstname(user.user.firstName);
    }
  },[user]);

  const logOut = async () => {
    setisUser(false);
    setAnchorEl(null);
    localStorage.clear();
    const verify = await dispatch(logOutUser());
    console.log("verify : ",verify);
    history.push('/');
  }


    return(
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar position="dense">
              <Typography variant="h6" color="inherit" className={classes.title}>
                Quiz-App
              </Typography>
              {/* <Button onClick={logOut}>
                Log out
              </Button> */}
              {isUser ?
                <div>
                <span> {firstname} </span>
                <IconButton
                aria-haspopup="true"
                color="inherit"
                onClick={handleMenu}
                >
                <AccountCircle fontSize="large" />
                </IconButton> 
                <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={logOut}>Log Out</MenuItem>
              </Menu>
                </div>
               : null }
            </Toolbar>
          </AppBar>
        </div>
    );
}