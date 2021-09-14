import React, { useEffect, useState } from 'react';
import {useSelector} from 'react-redux';

import useStyles from './headerStyles';
import {AppBar,Toolbar,Typography,IconButton,} from '@material-ui/core';
import {AccountCircle} from '@material-ui/icons'

export const Header = () => {
    const classes = useStyles();

    const user = useSelector((state)=>state.data.user);
    console.log(user);

    const [isUser,setisUser] = useState(false);

    const [firstname,setFirstname] = useState(null);

    useEffect(()=>{
        if(user){ 
          setisUser(true);
          setFirstname(user.user.firstName);
          console.log("firstname : ", firstname);
        }
    },[user])


    return(
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar position="dense">
              <Typography variant="h6" color="inherit" className={classes.title}>
                Quiz-App
              </Typography>
              {isUser ?
                <div>
                <span> {firstname} </span>
                <IconButton
                // aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                aria-haspopup="true"
                // onClick={this.handleProfileMenuOpen}
                color="inherit"
                >
                <AccountCircle fontSize="large" />
                </IconButton> 
                </div>
               : null }
            </Toolbar>
          </AppBar>
        </div>
    );
}