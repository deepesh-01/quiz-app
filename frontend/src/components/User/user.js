import React, {useDebugValue, useState} from 'react';
import {useSelector,useDispatch} from 'react-redux';

import useStyles from './userStyles';

export const User = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    return(
        <div>
            <h1>LoginSuccess</h1>
        </div>
    );
}