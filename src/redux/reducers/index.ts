import {combineReducers} from "redux";
import {planetsReducer} from "./planetsReducer";
import {filmsReducer} from "./filmsReducer";

export const rootReducer = combineReducers({planetsReducer, filmsReducer});
