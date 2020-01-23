import { IState } from '../redux/interfaces';

export const getFilms = (state: IState) => state.films;
export const getPlanets = (state: IState) => state.planets;
export const getIsDarkMode = (state: IState) => state.settings.isDarkMode;
export const getCurrency = (state: IState) => state.currency;
