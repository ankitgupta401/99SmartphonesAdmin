import React from 'react'
import Typography from '@material-ui/core/Typography';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Icon from '@material-ui/core/Icon';
import {connect} from 'react-redux';


export const Fields = (props) => {
    

 switch(props.type){
       case 'TextArea':
        return (
      
        <TextareaAutosize
        rowsMax="10"
        aria-label="maximum height"
        placeholder={props.label}
        onChange={props.changed} 
        style={{width:"80%"}}
      />
     )
      case 'Input':
         return (
           
            <TextField id="outlined-basic"  style={{width:"80%"}} label={props.label} variant="outlined" onChange={props.changed} /> 
          
          )
      case 'Image':
          return (
          
            <Button  variant="contained" color="primary" component="span" onChange={props.changed} >
            Upload
          </Button>
         
          )

    default :
    return (" ");
 }

}

const mapStateToprops =(state)=>{
    return {
      fieldTypes: state.tags
    }
}

export default connect(mapStateToprops)(Fields)