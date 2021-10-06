import { makeStyles } from "@material-ui/core";

export default makeStyles((theme)=>({
    root: {
        marginTop: theme.spacing(4),        
      },
      form: {
        display : 'flex',
        flexDirection: 'column',
        margin: "10px",
        padding:"10px",
        },
      text: {
          margin : "10px",
          width: "100%",
      },
      gridItem: {
        marginRight : "20px",
      },
      submit: {
        paddingLeft : "10px",
      },
      questionGrid: {
        margin : "0px 0px 20px 0px",
        paddingLeft : "10px",
        paddingRight : "10px",
      },
      question:{
        fontSize: 22,
        margin : 15,
      },
      title: {
        marginTop: "10px",
        marginBottom : "10px",
        paddingLeft : "10px", 
        fontSize: 28,
      },
      desc:{
        marginTop: "10px",
        marginBottom : "10px",
        paddingLeft : "10px", 
        fontSize: 18,
      },
      radioGroup: {
        marginBottom: "10px",
        paddingLeft: "10px",
        fontSize: 14,
      },
      button: {
        width: "158px",
        margin: "10px",
      },
      addButton: {
        width: "150px",
        margin: "10px",
        marginLeft: "30px"
      },
      addQ:{
        textAlignLast:"center",
        marginBottom: 20,
      }
}));