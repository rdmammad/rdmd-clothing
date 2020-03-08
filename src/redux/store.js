import {createStore, applyMiddleware} from "redux";
// this is nice for us to use when debugging redux code
import logger from "redux-logger";
import rootReducer from "./root-reducer";
import {persistStore} from "redux-persist";


const middlewares = [logger];
export const store = createStore(rootReducer, applyMiddleware(...middlewares));
export const persistor = persistStore(store);