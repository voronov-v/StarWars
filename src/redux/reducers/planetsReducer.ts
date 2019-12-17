import {PlanetType} from "../../screens/PlanetsScreen/types";
import {IActionType} from "../interfaces";

const LOAD_PLANETS = "LOAD_PLANETS";

interface IInitialState {
  planetList: PlanetType[]
}

const INITIAL_STATE: IInitialState = {
  planetList: []
};

export const planetsReducer = (state = INITIAL_STATE, action: IActionType) => {
  switch (action.type) {
    case LOAD_PLANETS:
      return {
        ...state, ...action.payload
      };

    default:
      return state;
  }
};
