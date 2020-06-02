import * as actionTypes from './actions';

const initialState = {
    tags: {
        img:'Image',
        textarea: 'TextArea',
        input: 'Input'
    },
    currentRowLevel: 1,
    form:{ 
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
            return tempState;
            
        case actionTypes.REMOVE_ROW:
            let tempState2 = {...state};
            tempState2.form ={...state.form};
            delete tempState2.form[action.key];
            
            return tempState2;
        default :
        return state;
   }
}


export default  reducer;