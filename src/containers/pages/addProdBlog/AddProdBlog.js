import React from 'react';
import Card from '../../card/card';
import IconButton from '@material-ui/core/IconButton';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import Icon from '@material-ui/core/Icon';
import Fields from './Fields/fields';
import {connect} from 'react-redux';
import * as actionTypes from './store/actions';


const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));



const AddProdBlog =(props) => {

    const getField = (type) => {
        const data = {value:"" ,currentRowLevel:props.currentLevel, type:type}
        props.add_form_row(data);
        setShowInputOptions(false);
    }
      const classes = useStyles();

      const [showInputOptions, setShowInputOptions] = React.useState(false);

     
      
      const buttonOptions = (
      <div>
        <h5> What Type Of Input Do You Want</h5>
        <br/>  
        <Button variant="contained" color="primary" onClick={() => getField('Input')} component="span">
          Input
        </Button> {" "}
        <Button variant="contained" color="primary" onClick={() => getField('TextArea')} component="span">
          Text Area
        </Button> {" "}
        <Button variant="contained" color="primary" onClick={() => getField('Image')}  component="span">
          Image Upload</Button> 
       </div>
      );

    return( <Card>
               <div className="d-flex justify-content-center">
                   <div>
                       <h3>Add Products For Blog</h3>
                       <br/>
                   </div>

               </div>
               <div style={{paddingLeft: '10%'}}>

               
             
              {/* <TextField id="outlined-basic"  label="Product Name" variant="outlined" />  */}
              {Object.keys(props.form).map((container, i) => {
           return (
         <div key={i}>
             <IconButton aria-label="delete" onClick={()=> props.remove_form_row(container) } className={classes.margin}>
          <DeleteIcon />
        </IconButton>
             <Fields type={props.form[container].type} label={'Row ' +props.form[container].currentRowLevel} changed={(event) =>console.log(event.target.value)}></Fields>
             <br/>    <br/>
           </div>);
         })}
         <br/>
               <Button variant="outlined" color="primary" onClick={()=> setShowInputOptions(true)}>
                 Add Row 
                </Button>
                 
                   
              {showInputOptions ? buttonOptions:"" }
         
               </div>
<div className="d-flex justify-content-center">
    <div>
    <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<DeleteIcon />}
      >Clear</Button>

<Button
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<Icon>send</Icon>}
      >
       Save
      </Button>
    </div>
    </div>
            </Card>
            );

}

const mapStateToProps =(state) => {
    return {
        currentLevel : state.currentRowLevel,
        form: state.form
    }
}
const mapDispatchToActions = (dispatch) => {
    return {
        add_form_row: (data) =>dispatch({type: actionTypes.ADD_ROW , row: data}),
        remove_form_row: (data) =>dispatch({type: actionTypes.REMOVE_ROW , key: data})
    }
}

export default connect(mapStateToProps,mapDispatchToActions)(AddProdBlog);