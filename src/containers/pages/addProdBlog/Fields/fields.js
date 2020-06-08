import React  from 'react'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));







// const handleChange = (event) => {
//   const name = event.target.name;
//   setState({
//     ...state,
//     [name]: event.target.value,
//   });
// };


export const Fields = (props) => {


  

  const classes = useStyles();




  const [types, setTypes] = React.useState({
    a:'a',
    p:'p',
    aLink: 'aLink',
    h1:'h1',
    h2:'h2',
    h3:'h3',
    h4:'h4',
    h5:'h5',
    h6:'h6',
    span:'span'
  });
  const [style,setStyle] = React.useState({color: "", bgColor:"", fontSize:"",fontStyle: "normal",fontFamily: "",});



const [key,setKey] = React.useState(""); 


const[state, setState] = React.useState({tags:'p', type:'element', key:props.currentLevel});

const change =(e)=> {

  console.log(e);
    let tempState = {...state };
    console.log(props);

    if(e.target.name === 'con'){
      //console.log(props)
      tempState ={tags:'li', type:'Con', key:props.currentConLevel,  ['Con' + props.currentConLevel]: e.target.value, ...style}
      setState(tempState);
      props.conChanged(tempState);
  
    }else if(e.target.name === 'pro'){
      tempState ={tags:'li', type:'Pro', key:props.currentProLevel,  ['Pro' + props.currentProLevel]: e.target.value, ...style}
      setState(tempState);
      props.proChanged(tempState);
  
    } else{
      let someState = {...tempState,key:props.currentLevel , value: e.target.value,...style}
      if(e.target.name === 'tags'){
           someState = {...someState, tags: e.target.value}
      }
      props.changed(someState);
      setState(someState);

    }
  
}


const showStyles = () => {
  
 if(typeof(props.pros.value) === "object"){
   let pro ='Pro' +  props.currentProLevel;
   console.log(pro.localeCompare(Object.keys(props.pros.value)[0]), pro , Object.keys(props.pros.value)[0] );
   if(pro.localeCompare(Object.keys(props.pros.value)[0]) === 0){
     console.log(props.pros.value)
   return true
   }else{
     return false
   }
 }else{
  return true
}

}
const showStylesCons = () => {
  
  if(typeof(props.cons.value) === "object"){
    let con ='Con' +  props.currentConLevel;
    console.log(con.localeCompare(Object.keys(props.cons.value)[0]), con , Object.keys(props.cons.value)[0] );
    if(con.localeCompare(Object.keys(props.cons.value)[0]) === 0){
      console.log(props.cons.value)
    return true
    }else{
      return false
    }
  }else{
   return true
 }
 
 }

const styleInput = (

   Object.keys(style).map((data,i) => {
    return (<React.Fragment key={i} >
  <TextField  className="col-lg-2 col-md-3 col-sm-12"   
  inputProps={{     
            name: data,
          }}
          label={data} variant="outlined" onChange={change} />  { " "}
     </React.Fragment>
   ) 
   })

)


const tags =(
  Object.keys(types).map((content,i) => {
    return(  
  
    <MenuItem key ={i} value={content}>{content}</MenuItem>
    )
  })

)

const scriptDropdown = (

<FormControl  style={{height:'80%'}} variant="filled"  className={classes.formControl ,'col-sm-12 col-md-2 col-lg-1'}>
        <InputLabel id="demo-simple-select-filled-label">Script Tag</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={state.tags}
          inputProps={{
            name: 'tags',
          }}
          onChange={change}
        >
    {tags}
        {/* {scriptDropdown} */}
         
        </Select>
      </FormControl>

)
  

 switch(props.type){
       case 'TextArea':
        return (
      
<React.Fragment>
 
           {scriptDropdown}   
       {styleInput}
<br/>
  <TextareaAutosize
        rowsMax="10"
        aria-label="maximum height"
        placeholder={props.label}
        onChange={change} 
        style={{width:"100%"}}
      />
     </React.Fragment>
     )
      case 'Input':
         return (
          <React.Fragment>
          {scriptDropdown}   
          {styleInput}
          <br/>
            <TextField id="outlined-basic"  style={{width:"100%"}} label={props.label} inputProps={{name: 'value'}} variant="outlined" onChange={change} /> 
            </React.Fragment>
          )
      case 'Image':
          return (
            <React.Fragment>
              <FormControl  style={{height:'80%'}} variant="filled" className={classes.formControl}>
        <InputLabel id="demo-simple-select-filled-label">Doc Type</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={state.type}
         onChange={change}

         inputProps={{
          name: 'type',
        }}
        
        >
         
          <MenuItem value="Image">Image</MenuItem>
          <MenuItem value="Documnet">Document</MenuItem>
         
        </Select>
      </FormControl> {" "}

            <Button  variant="contained"   color="primary" component="span" onChange={props.changed} >
            Upload
          </Button>
          </React.Fragment>
          )
      case 'Specs': 
          return (
            <React.Fragment>
              
            {styleInput}
           
            <br/>
               <TextField id="outlined-basic"  style={{width:"49.5%"}} label={key} variant="outlined" onChange={(e) =>{props.changed(e, 'key');setKey(e.target.value)}} />  {" "}
               <TextField id="outlined-basic1"  style={{width:"49.5%"}} label={key + ' value'} variant="outlined"  onChange={(e) =>props.changed(e,'Value' ,key)} /> 
            </React.Fragment>
         
          )    

      case 'Pros':
            return (
              <React.Fragment>
          {showStyles() ? styleInput: ''}
              {/* {( Object.keys(props.pros).length === 0|| (typeof(props.pros.value) === 'object' && Object.keys(props.pros.value).length < 1))? styleInput: ''} */}
             
              <br/>
               <TextField id="outlined-basic"  style={{width:"100%"}} label="Enter Pro" variant="outlined"  
                inputProps={{
            name: 'pro',
          }} onChange={change} /> 
            </React.Fragment>
             )
      case 'Cons':
              return (
                <React.Fragment>
              
              {showStylesCons() ? styleInput: ''}
                <br/>
                 <TextField id="outlined-basic" 
                  inputProps={{
                   name: 'con',
                        }} style={{width:"100%"}} label="Enter Con" variant="outlined" onChange={change} /> 
               </React.Fragment>
               )
      case 'List':
                  return (
                    <React.Fragment>
              
                    {styleInput}
                    <br/>
                   <TextField id="outlined-basic"  style={{width:"100%"}} label="List Item" variant="outlined" onChange={props.changed} /> 
                 </React.Fragment>
                 )
    default :
    return (" ");
 }

}

const mapStateToprops =(state)=>{
    return {
      fieldTypes: state.tags,
      pros: state.actualData.Pros,
      cons: state.actualData.Cons

    }
}

export default connect(mapStateToprops)(Fields)