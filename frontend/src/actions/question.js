import * as api from '../api/api';

export const getQues = (id) => async (dispatch) => {
    try{
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

export const updateQuestion = (changes,token) => async (dispatch) => {
    try{
        const data = {changes, token};
        const updatedQuestion = await api.updateQuestion(data);
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