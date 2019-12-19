import {combineReducers} from "redux";
import {planetsReducer} from "./planetsReducer";
import {filmsReducer} from "./filmsReducer";
import {settingsReducer} from "./settingsReducer";

export const rootReducer = combineReducers({
  planets: planetsReducer,
  films: filmsReducer,
  settings: settingsReducer,
});
