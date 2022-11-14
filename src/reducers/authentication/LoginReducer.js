import {
    LOGIN_SUCCESS
} from '../../actions/type.js'
//reducer: (prev_state, action) => newState
// Get the user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

// before dispatch ther are two actions
const initialState = user ? {isLoggedIn:true, user}:{isLoggedIn:false,user:null}


export const authReducer = (state=initialState, action) =>{
    const {type, payload} = action;

    switch(type){
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn:true,
                user: payload,
                tr:'er'  //after dispatch we added one more state
            };
        default: return state;
    };
}