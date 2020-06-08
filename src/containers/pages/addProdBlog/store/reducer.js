import * as actionTypes from './actions';
import { ThemeProvider } from '@material-ui/core';

const initialState = {
    tags: {
        img:'Image',
        textarea: 'TextArea',
        input: 'Input'
    },
    currentRowLevel: 0,
    currentProLevel: 0,
    currentConLevel: 0,
    form:{ 
    },

    actualData: {
        rows:{},
        Specs:{},
        Pros:{},
        Cons:{}
    }

} 


const reducer = (state=initialState, action)=> {
    console.log(state);
   switch(action.type){
       case actionTypes.ADD_PRODUCT:
           return {

           } 
        case actionTypes.UPDATE_PRODUCT:
            return {

            }
        case actionTypes.ADD_ROW:
            let tempState = {...state};
            tempState.form = {...state.form, [tempState.currentRowLevel]: action.row };
            tempState.currentRowLevel++; 
            tempState.currentProLevel++;
            tempState.currentConLevel++;
            console.log('Updated State')
            return tempState;
            
        case actionTypes.REMOVE_ROW:
            
            let proTodelete = 'Pro';
            let conTodelete = 'Con';
            let isPro = false;
            let isCon = false;
            let isElement = false;
            let tempState2 = {...state};
            tempState2.form ={...state.form};
            proTodelete = proTodelete + tempState2.form[action.key].currentProLevel; 
            conTodelete = conTodelete+ tempState2.form[action.key].currentConLevel; 
            if(tempState2.form[action.key].type === "Pros"){isPro = true;} else if(tempState2.form[action.key].type === "element"){isElement = true}
            else if(tempState2.form[action.key].type === "Cons"){isCon = true}
            delete tempState2.form[action.key];
              if(isPro){
             tempState2.actualData={...state.actualData};
             tempState2.actualData.Pros = {...state.actualData.Pros}
            console.log(typeof(tempState2.actualData.Pros.value) )
         if(typeof(tempState2.actualData.Pros.value) === 'object'){
            console.log(typeof(tempState2.actualData.Pros.value), proTodelete);
            delete tempState2.actualData.Pros.value[proTodelete];
         }    
             }

             if(isCon){
                tempState2.actualData={...state.actualData};
                tempState2.actualData.Cons = {...state.actualData.Cons}
               console.log(typeof(tempState2.actualData.Cons.value) )
            if(typeof(tempState2.actualData.Cons.value) === 'object'){
               console.log(typeof(tempState2.actualData.Cons.value), conTodelete);
               delete tempState2.actualData.Cons.value[conTodelete];
            }    
                }
             if(isElement){
                tempState2.actualData={...state.actualData};
                tempState2.actualData.rows = {...state.actualData.rows}
                console.log(typeof(tempState2.actualData.rows));
            if(!typeof(tempState2.actualData.rows) === undefined){
               delete tempState2.actualData.rows[action.key];
            }    
             }
           
 
            return tempState2;

        case actionTypes.ADD_DATA:
            let tempState3 = {...state};
            tempState3.actualData={...state.actualData};
            tempState3.actualData.rows = {...state.actualData.rows, [tempState3.currentRowLevel]: action.row}
  
            return tempState3;

        case actionTypes.ADD_PROS: 
             let tempState4 ={...state};
             tempState4.actualData ={...state.actualData};
             let key ='Pro' + action.row.key ;
             console.log('temp',tempState4);
             if(Object.keys( tempState4.actualData.Pros).length ===0 ){
                tempState4.actualData.Pros = {...state.actualData.Pros, ...action.row, value:[]};
                
                tempState4.actualData.Pros.value = {...state.actualData.Pros.value, [key]: action.row[key]}
             } else {
                tempState4.actualData.Pros = {...state.actualData.Pros};
                 if(action.row.key === 1){
                    tempState4.actualData.Pros = {...state.actualData.Pros, ...action.row, value:[]};
                
                tempState4.actualData.Pros.value = {...state.actualData.Pros.value, [key]: action.row[key]}
                
                 }
                
                    tempState4.actualData.Pros.value = {...state.actualData.Pros.value, [key]: action.row[key]}
               

                
             }
             return tempState4;
            
            case actionTypes.ADD_CONS:

                let tempstate5 ={...state};
             tempstate5.actualData ={...state.actualData};
             let key2 ='Con' + action.row.key ;
             console.log('temp',tempstate5);
             if(Object.keys( tempstate5.actualData.Cons).length ===0 ){
                tempstate5.actualData.Cons = {...state.actualData.Cons, ...action.row, value:[]};
                
                tempstate5.actualData.Cons.value = {...state.actualData.Cons.value, [key2]: action.row[key2]}
             } else {
                tempstate5.actualData.Cons = {...state.actualData.Cons};
                 if(action.row.key2 === 1){
                    tempstate5.actualData.Cons = {...state.actualData.Cons, ...action.row, value:[]};
                
                tempstate5.actualData.Cons.value = {...state.actualData.Cons.value, [key2]: action.row[key2]}
                
                 }
                
                    tempstate5.actualData.Cons.value = {...state.actualData.Cons.value, [key2]: action.row[key2]}
               

                
             }
             return tempstate5;

             
        default :
        return state;
   }
}


export default  reducer;