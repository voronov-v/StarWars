import {IFilmsState} from "../redux/reducers/filmsReducer";
import {IPlanetsState} from "../redux/reducers/planetsReducer";

export interface IActionType {
  payload?: any;
  type: string;
}

export type IState = {
  readonly planets: IPlanetsState;
  readonly films: IFilmsState;
};
