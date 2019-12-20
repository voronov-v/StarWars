import {IFilmsState} from "../redux/reducers/filmsReducer";
import {IPlanetsState} from "../redux/reducers/planetsReducer";
import {settingsType} from "@root/redux/reducers/settingsReducer";

export interface IActionType {
  payload?: any;
  type: string;
}

export type IState = {
  readonly planets: IPlanetsState;
  readonly films: IFilmsState;
  readonly settings: settingsType;
};
