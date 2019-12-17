import {PlanetType} from "../../screens/PlanetsScreen/types";
import {IActionType} from "../interfaces";

export const LOAD_PLANETS = "LOAD_PLANETS",
  LOAD_PLANETS_FAILED = "LOAD_PLANETS_FAILED",
  LOAD_PLANETS_SUCCEED = "LOAD_PLANETS_FAILED";

export interface IPlanetsState {
  loading: boolean
  planetsList: PlanetType[]
  errMsg: string
}

const INITIAL_STATE: IPlanetsState = {
  loading: false,
  planetsList: [],
  errMsg: ""
};

export const planetsReducer = (state = INITIAL_STATE, action: IActionType) => {
  switch (action.type) {
    case LOAD_PLANETS:
      return {...state, loading: true};
    case LOAD_PLANETS_SUCCEED:
      return {...state, loading: false, planetsList: [...action.payload.data.results]};
    case LOAD_PLANETS_FAILED:
      return {...state, errMsg: action.payload};
    default:
      return state;
  }
};
