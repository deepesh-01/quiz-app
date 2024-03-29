import {makeStyles} from '@material-ui/core';

export default makeStyles((theme)=>({
    root: {
        minWidth: 275,
        paddingBottom:"0px"
      },
      button:{
        // flexGrow:1,
        justifyContent:"flex-end",
        alignItems:"flex-end",
      },
      grid:{
        flexGrow:1,
        paddingLeft:"20px",
        paddingTop:"32px",
        width:'100%'
      },
      title: {
        fontSize: 14,
      },
      pos: {
        marginBottom: 6,
        marginTop: 6,
      },
      addQuiz:{
        margin: "10px 10px 10px 0px",

      },
      addQ:{
        textAlignLast:"center"
      },
      attempted: {
        marginTop: 6,
        fontStyle: 'italic',
        fontWeight: 'bold',
        fontSize: 12,
      },
}));