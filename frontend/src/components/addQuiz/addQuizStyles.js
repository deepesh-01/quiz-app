import { makeStyles } from "@material-ui/core";

export default makeStyles((theme)=>({
    root: {
        marginTop: theme.spacing(4),        
    },
    gridItem: {
        marginRight : "20px",
    },
    text: {
        margin : "10px",
        width: "100%",
    },
    title: {
        marginTop: "10px",
        paddingLeft : "10px", 
        fontSize: 26,
    },
    button:{
        marginLeft:"10px",
    },
    addQuiz:{
        margin: "10px",
        paddingRight:"20px",
    },
}));