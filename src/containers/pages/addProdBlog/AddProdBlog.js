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

const proChange = (data) => {
props.add_pro(data);
  console.log(data);
}

const conChange = (data) => {
  props.add_con(data);
    console.log(data);
  }
    const getField = (type) => {
      console.log(props.currentConLevel)
        let data = {value:"" ,currentRowLevel:props.currentLevel, type:type}
        if(type === 'Pros'){
          data ={...data, currentProLevel:props.currentProLevel , currentConLevel: props.currentConLevel};
        } else if(type === 'Cons'){
          data ={...data, currentProLevel:props.currentProLevel , currentConLevel: props.currentConLevel};
        }
        props.add_form_row(data);
        setShowInputOptions(false);
    }
      const classes = useStyles();

      const [showInputOptions, setShowInputOptions] = React.useState(false);

     
      
      const buttonOptions = (
      <div>
        <h5> What Type Of Input Do You Want</h5>
        <br/>  
        <Button style={{padding:'4px'}} variant="contained" color="primary" onClick={() => getField('Input')} component="span">
          Input
        </Button> {" "}
        <Button style={{padding:'4px'}} variant="contained" color="primary" onClick={() => getField('TextArea')} component="span">
          Text Area
        </Button> {" "}
        <Button style={{padding:'4px'}} variant="contained" color="primary" onClick={() => getField('Image')}  component="span">
          Image Upload</Button> {" "}
          <Button style={{padding:'4px'}} variant="contained" color="primary" onClick={() => getField('Specs')}  component="span">
         Add Speification</Button> {" "}
         <Button style={{padding:'4px'}} variant="contained" color="primary" onClick={() => getField('Pros')}  component="span">
         Pros</Button> {" "}
         <Button style={{padding:'4px'}} variant="contained" color="primary" onClick={() => getField('Cons')}  component="span">
         Cons</Button> {" "}
         <Button style={{padding:'4px'}} variant="contained" color="primary" onClick={() => getField('List')}  component="span">
         List</Button> 
       </div>
      );

    return( <Card>
               <div className="d-flex justify-content-center">
                   <div>
                       <h3>Add Products For Blog</h3>
                       <br/>
                   </div>

               </div>

               {/* Right Side */}
               <div className="row">
               <div className="col-md-4 col-sm-12">

               </div>
               

                     {/* Left Side */}

               <div className="col-md-8 col-sm-12">
               <div   style={{paddingLeft: '10%'}}>

               
             
              {/* <TextField id="outlined-basic"  label="Product Name" variant="outlined" />  */}
              {Object.keys(props.form).map((container, i) => {
           return (
         <div key={i} >
             <IconButton aria-label="delete"
              onClick={
                ()=>{
                props.remove_form_row(container) 
                } } className={classes.margin}>
          <DeleteIcon />
        </IconButton>
             <Fields type={props.form[container].type} label={'New Row '}
             currentLevel={props.form[container].currentRowLevel}
             currentProLevel ={props.form[container].currentProLevel}
             currentConLevel ={props.form[container].currentConLevel}
             proChanged ={(value)=>proChange(value)}
             conChanged ={(value)=>conChange(value)}
              changed={(value) => {props.add_data(value)}}></Fields>
             <br/>    <br/>
           </div>);
         })}
         <br/>
               <Button variant="outlined" color="primary" onClick={()=> setShowInputOptions(!showInputOptions)}>
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
    </div>
    </div>
            </Card>
            );

}

const mapStateToProps =(state) => {
    return {
        currentLevel : state.currentRowLevel,
        form: state.form,
        pros: state.actualData.Pros,
        cons: state.actualData.Cons,
        currentProLevel: state.currentProLevel,
        currentConLevel: state.currentConLevel
    }
}
const mapDispatchToActions = (dispatch) => {
    return {
        add_form_row: (data) =>dispatch({type: actionTypes.ADD_ROW , row: data}),
        remove_form_row: (data) =>dispatch({type: actionTypes.REMOVE_ROW , key: data}),
        add_data: (data) => dispatch({type: actionTypes.ADD_DATA , row: data}),
        add_pro:(data) => dispatch({type: actionTypes.ADD_PROS , row: data}),
        add_con:(data) => dispatch({type: actionTypes.ADD_CONS , row: data}),
    }
}

export default connect(mapStateToProps,mapDispatchToActions)(AddProdBlog);