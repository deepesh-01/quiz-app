import { makeStyles } from "@material-ui/core";

export default makeStyles((theme)=>({
    form: {
        display : 'flex',
        flexDirection: 'column',
        margin: "10px",
        padding:"10px",
        },
        text: {
            margin : "10px",
            paddingRight : "20px",
            width: "100%",
        },
        gridItem: {
            marginRight : "20px",
        },
        button:{
            marginLeft : "60px",
            marginRight : "30px",
        },
        title: {
            marginTop: "10px",
            marginBottom : "10px", 
            fontSize: 18,
        }

}));