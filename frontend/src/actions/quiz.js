import * as api from '../api/api';

export const getAllQuiz = () => async (dispatch) => {
    try{
        dispatch({type:"LOAD"});
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
        dispatch({type:"LOAD"});
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
        dispatch({type:"LOAD"});
        const data = {changes, token};
        console.log("data fron updateQuiz : ",data);
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
        dispatch({type:"LOAD"});
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


export const deleteQuiz = (id,token) => async (dispatch) => {
    try{
        dispatch({type:"LOAD"});
        const data = {id, token};
        console.log("data is : ",data);
        const updatedQuiz = await api.deleteQuize(data);
        console.log("Delete Quiz from deleteQuiz action : ",updatedQuiz.data);
        if(!updatedQuiz.data){
            dispatch({type:"ERROR",msg:"Server Error"});
            return false;
        }
        else{
            dispatch({type:"DELETE_QUIZ",quiz:updatedQuiz.data});
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

export const submitQuiz = (quizId,token,answers) => async (dispatch)=> {
    try{
    dispatch({type:"LOAD"});
    const data = {quizId,answers};
    console.log("data is : ",data);
    const submittedQuiz = await api.submitQuiz(data,token);
    console.log("submittedQuiz : ",submittedQuiz.data);
    if(!submittedQuiz.data){
        dispatch({type:"ERROR",msg:"Server Error"});
        return false;
    }
    else{
        console.log("submittedQuiz : ",submittedQuiz.data);
        dispatch({type:"SUBMIT_QUIZ",quiz:submittedQuiz.data});
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

