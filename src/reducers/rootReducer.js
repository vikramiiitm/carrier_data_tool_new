import { combineReducers } from "redux";
import { authReducer } from "./authentication/LoginReducer";  

export const rootReducer = combineReducers({
    authReducer
});
