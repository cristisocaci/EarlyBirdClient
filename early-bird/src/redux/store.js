import { createStore } from "redux";
import loaderReducer from "./reducer";

const store = createStore(loaderReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;