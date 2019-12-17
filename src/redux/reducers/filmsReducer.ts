import {FilmType} from "../../screens/FilmsScreen/types";
import {IActionType} from "../interfaces";

const LOAD_FILMS = "LOAD_FILMS";

interface IInitialState {
  filmsList: FilmType[]
}

const INITIAL_STATE: IInitialState = {
  filmsList: []
};

export const filmsReducer = (state = INITIAL_STATE, action: IActionType) => {
  switch (action.type) {
    case LOAD_FILMS:
      return {
        ...state, ...action.payload
      };

    default:
      return state;
  }
};
