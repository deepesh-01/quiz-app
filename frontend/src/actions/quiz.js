import * as api from '../api/api';

export const getAllQuiz = () => async (dispatch) => {
    try{
        const quiz = await api.getAllQuiz();
        console.log("Quiz from getAllQuiz action : ",quiz.data);
        if(!quiz){
            dispatch({type:"ERROR",msg:"Server Error"});
            return false;
        }
        else{
            dispatch({type:"GET_ALL_QUIZ",quiz:quiz.data});
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

export const getQuiz = (id) => async (dispatch) => {
    try{
        console.log("id in getQuiz action : ",id);
        const quiz = await api.getQuiz(id);
        console.log("Quiz from getQuiz action : ",quiz.data);
        if(!quiz){
            dispatch({type:"ERROR",msg:"Server Error"});
            return false;
        }
        else{
            dispatch({type:"GET_QUIZ",quiz:quiz.data});
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

export const updateQuiz = (changes,token) => async (dispatch) => {
    try{
        console.log("changes in updateQuiz Action is : ",changes);
        console.log("token in updateQuiz Action is : ",token);
        const data = {changes, token};
        const updatedQuiz = await api.updateQuiz(data);
        console.log("Updated Quiz from updateQuiz action : ",updatedQuiz);
        if(!updatedQuiz.data){
            dispatch({type:"ERROR",msg:"Server Error"});
            return false;
        }
        else{
            dispatch({type:"UPDATE_QUIZ",quiz:updatedQuiz.data});
            return true;
        }
    }
    catch(err){
        if(!err.response){
            console.log(err);
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

export const newQuiz = (nQuiz,token) => async (dispatch) => {
    try{
        const data = {nQuiz, token};
        console.log("data is : ",data);
        const newQuiz1 = await api.newQuiz(data);
        console.log("Updated Quiz from updateQuiz action : ",newQuiz1.data);
        if(!newQuiz1.data){
            dispatch({type:"ERROR",msg:"Server Error"});
            return false;
        }
        else{
            dispatch({type:"UPDATE_QUIZ",quiz:newQuiz1.data});
            return true;
        }
    }
    catch(err){
        if(!err.response){
            console.log(err);
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

