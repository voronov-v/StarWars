import {IActionType} from "@root/redux/interfaces";

export const CHANGE_LANGUAGE = "CHANGE_LANGUAGE", TOGGLE_THEME = "TOGGLE_THEME", INIT = "INIT";

export type themeType = {
  name: string,
  default: string,
  PRIMARY: string,
  PRIMARY_VARIANT: string,
  SECONDARY: string,
  BACKGROUND: string,
  SURFACE: string,
  ERROR: string,
  ON_BACKGROUND: string
  ON_ERROR: string
}

export type settingsType = {
  language: string
  isDarkMode: boolean,
  isInit: false,
}

const INITIAL_STATE: settingsType = {
  language: "en",
  isDarkMode: true,
  isInit: false
};

export const settingsReducer = (state = INITIAL_STATE, action: IActionType) => {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      return {...state, language: action.payload};
    case TOGGLE_THEME:
      return {...state, isDarkMode: !state.isDarkMode};
    case INIT:
      return {...state, isInit: true};
    default:
      return state;
  }
};
