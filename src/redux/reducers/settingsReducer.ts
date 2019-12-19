import {IActionType} from "@root/redux/interfaces";

export const CHANGE_LANGUAGE = "CHANGE_LANGUAGE";

export type settingsType = {
  language: string
}

const INITIAL_STATE: settingsType = {
  language: "en"
};

export const settingsReducer = (state = INITIAL_STATE, action: IActionType) => {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      return {language: action.payload};
    default:
      return state;
  }
};
