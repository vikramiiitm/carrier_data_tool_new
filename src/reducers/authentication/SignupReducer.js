import {
    SIGNUP_SUCCESS
} from '../../actions/type.js'
//reducer: (prev_state, action) => newState
// Get the user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

// before dispatch ther are two actions
const initialState = ''


export const signupReducer = (state=initialState, action) =>{
    const {type, payload} = action;

    switch(type){
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isLoggedIn:false,
                user: payload,
                tr:'er'  //after dispatch we added one more state
            };
        default: return state;
    };
}