export default (initialState = {user:null,quizes:[],questions:[],load:true,error:false}, action) => {
    switch(action.type){
        case "LOGIN":
            return {...initialState,user:action.user,load:false,error:false}
        case "LOGOUT":
            return {...initialState,user:null,load:false,error:false}
        case "LOAD":
            return {...initialState,load:true}
        case "ERROR":
            return {...initialState,load:false,error:true}
        default :
            return {...initialState,load:true}
    }
}