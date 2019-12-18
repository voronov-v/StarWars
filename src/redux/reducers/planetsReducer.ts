import {PlanetType} from "../../screens/PlanetsScreen/types";
import {IActionType} from "../interfaces";

export const LOAD_PLANETS = "LOAD_PLANETS",
  LOAD_PLANETS_FAILED = "LOAD_PLANETS_FAILED",
  LOAD_PLANETS_SUCCEED = "LOAD_PLANETS_SUCCEED",
  LOAD_PLANET_INFO = "LOAD_PLANET_INFO",
  LOAD_PLANET_INFO_SUCCEED = "LOAD_PLANET_INFO_SUCCEED",
  LOAD_PLANET_INFO_FAILED = "LOAD_PLANET_INFO_FAILED"
;

export interface IPlanetsState {
  loading: boolean
  errMsg: string
  planetsList: PlanetType[]
}

const INITIAL_STATE: IPlanetsState = {
  loading: false,
  errMsg: "",
  planetsList: [],
};

export const planetsReducer = (state = INITIAL_STATE, action: IActionType) => {
  switch (action.type) {
    case LOAD_PLANETS:
      return {...state, loading: true};
    case LOAD_PLANETS_SUCCEED:
      return {...state, loading: false, errMsg: "", planetsList: [...action.payload.data.results]};
    case LOAD_PLANETS_FAILED:
      return {...state, errMsg: action.payload};
    case LOAD_PLANET_INFO:
      return {...state, loading: true};
    case LOAD_PLANET_INFO_SUCCEED:
      let tmp = state.planetsList.map(e => {
        if (e.name === action.payload.name) {
          e.planetInfo = {
            films: action.payload.films,
            residents: action.payload.residents
          }
        }
        return e;
      });
      return {...state, loading: false, errMsg: "", planetsList: tmp};
    case LOAD_PLANET_INFO_FAILED:
      return {...state, loading: false, errMsg: action.payload};
    default:
      return state;
  }
};
