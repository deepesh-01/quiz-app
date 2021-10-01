export default (initialState = {user:null,quizes:null,questions:[],load:false,error:false,errMsg:"This is error",quiz:null,question:null}, action) => {
    switch(action.type){
        case "LOGIN":
            return {...initialState,user:action.user,load:false,error:false}
        case "LOGOUT":
            return {...initialState,user:null,load:false,error:false}
        case "REGISTER":
            return {...initialState,user:action.user,load:false,error:false}
        case "GET_ALL_QUIZ":
            return {...initialState,quizes:action.quiz,load:false,error:false}
        case "GET_QUIZ":
            return {...initialState,quiz:action.quiz,load:false,error:false}
        case "UPDATE_QUIZ":
            return {...initialState,quiz:action.updatedQuiz,load:false,error:false}
        case "GET_QUESTION":
            return {...initialState,question:action.question,load:false,error:false}
        case "UPDATE_QUESTION":
            return {...initialState,question:action.updatedQuestion,load:false,error:false}
        case "LOAD":
            return {...initialState,load:true,error:false,errMsg:null}
        case "ERROR":
            return {...initialState,load:false,error:true,errMsg:action.msg}
        default :
            return {...initialState}
    }
}