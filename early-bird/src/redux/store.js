import { createStore } from "redux";
import loaderReducer from "./reducer";

const store = createStore(loaderReducer);

export default store;