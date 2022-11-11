import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
} from './type'


// Here we import auth service in which we call the api, and return the data.
// We will use auth service in auth action creator and 
// use returned data in action creator to dispatch an action, which will be recieved by reducer.
// Reducer recieves the initialstate and action and returns a new state.
import {login as login_service} from '../service/authentication/AuthService'

const login = (username, password) => (dispatch) => {
    return login_service(username, password).then(
        (response) => {
            console.log(`response ${response}`)
            dispatch({
                type:LOGIN_SUCCESS,
                payload:response
            })
        }
    )
};
export default login;

