import * as api from '../api/api';

export const login = (input) => async (dispatch) => {
    try{
        dispatch({type:"LOAD"});
        console.log("input at login action : ", input);
        console.log("everything stops here");
        const user = await api.login(input);
        console.log("user from login action : ",user.data);
        if(!user){
            dispatch({type:"ERROR",msg:"Server Error"});
            console.log("Server Down");
            return false;
        }
        else{
            dispatch({type:"LOGIN", user:user.data});
            localStorage.setItem("jwtToken",user.data.token);
            return true;
        } 
    }
    catch(err){
        if(!err.response){
            const errmsg = { "msg" : "Server is not reachable!" };
            dispatch({type:"ERROR", msg:errmsg});
        }
        else{
            // console.log("Error in login : ",err);
            const errmsg = err.response.data;
            console.log("Error message : ",errmsg);
            dispatch({type:"ERROR", msg:errmsg});
            return false;
        }
    }
}

export const register = (input) => async (dispatch) => {
    try{
        dispatch({type:"LOAD"});
        console.log("input at register : ",input);
        const user = await api.register(input);
        console.log("user from register action : ",user.data);
        if(!user){
            dispatch({type:"ERROR",msg:"Server Error"});
            return false;
        }
        dispatch({type:"REGISTER", user:user.data});
        return true
    }
    catch(err){
        if(!err.response){
            const errmsg = { "msg" : "Server is not reachable!" };
            dispatch({type:"ERROR", msg:errmsg});
        }
        else{
            const errmsg = err.response.data;
            console.log("Error message : ",err.response);
            dispatch({type:"ERROR", msg:errmsg});
            return false;
        }
    }
}

export const verifyUser = () => async (dispatch) => {
    try{
        console.log("verifyUser called in user/home");
        dispatch({type:"LOAD"});
        const token = localStorage.getItem("jwtToken");
        console.log("token : ",token);
        const user = await api.verifyUser(token);
        if(!user){
            dispatch({type:"ERROR",msg:"Server Error"});
            return false;
        }
        console.log("user in VERIFY action : ",user.data);
        dispatch({type:"VERIFY", user:user.data});
        return true
    }
    catch(err){
        if(!err.response){
            const errmsg = { "msg" : "Server is not reachable!" };
            dispatch({type:"ERROR", msg:errmsg});
        }
        else{
            const errmsg = err.response.data;
            console.log("Error message : ",err.response);
            dispatch({type:"ERROR", msg:errmsg});
            return false;
        }
    }
}

export const updateUser = (updateData) => async (dispatch) => {
    try{
        console.log("updateUser called in user/home");
        dispatch({type:"LOAD"});
        const token = localStorage.getItem("jwtToken");
        console.log("token : ",token);
        const user = await api.updateUser(updateData,token);
        if(!user){
            dispatch({type:"ERROR",msg:"Server Error"});
            return false;
        }
        console.log("user in VERIFY action : ",user.data);
        dispatch({type:"UPDATE_USER", user:user.data});
        return true
    }
    catch(err){
        if(!err.response){
            const errmsg = { "msg" : "Server is not reachable!" };
            dispatch({type:"ERROR", msg:errmsg});
        }
        else{
            const errmsg = err.response.data;
            console.log("Error message : ",err.response);
            dispatch({type:"ERROR", msg:errmsg});
            return false;
        }
    }
}

export const logOutUser = () => (dispatch) => {
    try{
        console.log("logOut action called");
        dispatch({type:"LOAD"});
        dispatch({type:"LOGOUT"});
        return true
    }
    catch(err){
        const errmsg = { "msg" : "Logout Error!" };
        console.log("Error : ",err);
        dispatch({type:"ERROR", msg:errmsg});
    }
}