import {FilmType} from "../../screens/FilmsScreen/types";
import {IActionType} from "../interfaces";

export const LOAD_FILMS = "LOAD_FILMS",
  LOAD_FILMS_FAILED = "LOAD_FILMS_FAILED",
  LOAD_FILMS_SUCCEED = "LOAD_FILMS_SUCCEED";

export interface IFilmsState {
  loading: boolean
  filmsList: FilmType[]
  errMsg: string
}

const INITIAL_STATE: IFilmsState = {
  loading: false,
  filmsList: [],
  errMsg: ""
};

export const filmsReducer = (state = INITIAL_STATE, action: IActionType) => {
  switch (action.type) {
    case LOAD_FILMS:
      return {...state, loading: true, errMsg: ""};
    case LOAD_FILMS_SUCCEED:
      let arr = [...action.payload].sort((a,b) => a.episode_id - b.episode_id);
      return {...state, loading: false, filmsList: arr};
    case LOAD_FILMS_FAILED:
      return {...state, loading: false, errMsg: action.payload};
    default:
      return state;
  }
};
