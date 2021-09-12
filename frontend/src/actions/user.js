import * as api from '../api/api';

export const login = (input) => async (dispatch) => {
    try{

        dispatch({type:"LOAD"});
        console.log("input at login action : ", input);
        const user = await api.login(input);
        console.log("user from login action : ",user.data);
        if(!user){
            dispatch({type:"Error"});
            console.log("Login error");
        }
        else{
            dispatch({type:"LOGIN", user:user.data});
        } 
    }
    catch(error){
        console.log("Error in login : ",error);
    }
}