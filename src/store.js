import { login } from './actions/type.js';
import { createStore, applyMiddleware } from "redux";
import { authReducer } from './reducers/authentication/LoginReducer';
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// one store for entire application
const middleware = [thunk];

export const store = createStore(
  authReducer, composeWithDevTools(applyMiddleware(...middleware))
);