import logger from "redux-logger"; //allows you to see the state of the app
import thunk from "redux-thunk"; // allows you to write action creators that return a function instead of an action
import { applyMiddleware, createStore } from "redux";

import Reducers from "../reducers/reducers";

// middleware inside this function
const middleware = applyMiddleware(logger, thunk);

//--- STORE
const StoreRef = createStore(Reducers, middleware);

export default StoreRef;
