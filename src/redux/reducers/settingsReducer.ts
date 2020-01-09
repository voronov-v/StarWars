import { IActionType } from '@root/redux/interfaces';

export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE',
  TOGGLE_THEME = 'TOGGLE_THEME',
  INIT = 'INIT';

export type themeType = {
  name: string;
  default: string;
  PRIMARY: string;
  PRIMARY_VAR: string;
  PRIMARY_VAR_BG: string;
  SECONDARY: string;
  BACKGROUND: string;
  ERROR: string;
  ON_BACKGROUND: string;
  ON_ERROR: string;
};

export type settingsType = {
  language: string;
  isDarkMode: boolean;
};

const INITIAL_STATE: settingsType = {
  language: 'en',
  isDarkMode: true,
};

export const settingsReducer = (state = INITIAL_STATE, action: IActionType) => {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      return { ...state, language: action.payload };
    case TOGGLE_THEME:
      return { ...state, isDarkMode: !state.isDarkMode };
    default:
      return state;
  }
};
