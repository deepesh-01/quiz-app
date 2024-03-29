import * as api from '../api/api';

export const getQues = (id) => async (dispatch) => {
    try{
        dispatch({type:"LOAD"});
        const quesId = id;
        const question = await api.getQuestion(quesId);
        console.log("question is : ", question.data);
        if(question.data){
            dispatch({type:"GET_QUESTION",question:question.data});
            return true;
        }
        else{
            dispatch({type:"ERROR",msg:"Server Error"});
            return false;
        }
    }
    catch(err){
        if(!err.response){
            const errmsg = { "msg" : "Server is not reachable!" };
            dispatch({type:"ERROR", msg:errmsg.msg});
        }
        else{
            // console.log("Error in login : ",err);
            const errmsg = err.response.data;
            console.log("Error message : ",errmsg);
            dispatch({type:"ERROR", msg:errmsg.msg});
            return false;
        }
    }
}

export const updateQuestion = (changes,token) => async (dispatch) => {
    try{
        dispatch({type:"LOAD"});
        const data = {changes, token};
        console.log(changes);
        console.log(token);
        const updatedQuestion = await api.updateQuestion(data);
        console.log(updatedQuestion.data.question);
        if(!updatedQuestion.data){
            dispatch({type:"ERROR",msg:"Server Error"});
            return false;
        }
        else{
            dispatch({type:"UPDATE_QUESTION",updatedQuestion:updatedQuestion.data});
            return true;
        }
    }
    catch(err){
        if(!err.response){
            const errmsg = { "msg" : "Server is not reachable!" };
            dispatch({type:"ERROR", msg:errmsg.msg});
        }
        else{
            // console.log("Error in login : ",err);
            const errmsg = err.response.data;
            console.log("Error message : ",errmsg);
            dispatch({type:"ERROR", msg:errmsg.msg});
            return false;
        }
    }
}

export const newQuestion = (changes,token) => async (dispatch) => {
    try{
        dispatch({type:"LOAD"});
        const data = {changes, token};
        // console.log(changes);
        const updatedQuiz = await api.newQuestion(data);
        console.log("updated Quiz is : ",updatedQuiz.data);
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
            const errmsg = { "msg" : "Server is not reachable!" };
            dispatch({type:"ERROR", msg:errmsg.msg});
        }
        else{
            // console.log("Error in login : ",err);
            const errmsg = err.response.data;
            console.log("Error message : ",errmsg);
            dispatch({type:"ERROR", msg:errmsg.message});
            return false;
        }
    }
}

export const deleteQuestion = (id,token) => async (dispatch) => {
    try{
        dispatch({type:"LOAD"});
        const data = {id, token};
        console.log(data);
        const updatedQuiz = await api.deleteQuestion(data);
        console.log("updated Quiz is : ",updatedQuiz.data.quiz);
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
            console.log("err is : ",err);
            const errmsg = { "msg" : "Server is not reachable!" };
            dispatch({type:"ERROR", msg:errmsg.msg});
        }
        else{
            // console.log("Error in login : ",err);
            const errmsg = err.response.data;
            console.log("Error message : ",errmsg);
            dispatch({type:"ERROR", msg:errmsg.msg});
            return false;
        }
    }
}