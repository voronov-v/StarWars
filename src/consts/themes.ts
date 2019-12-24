import {themeType} from "@root/redux/reducers/settingsReducer";

export enum colors {
  black = '#000',
  pink = '#e91e63',
  orange = '#ff7f50',
  gray = '#313143',
  yellow = '#e8be2b'
}

// export const PRIMARY_THEME:themeType = {
//   name: 'light',
//   default: '#fff',
//   PRIMARY: '#6200EE',
//   PRIMARY_VARIANT: '#3700B3',
//   SECONDARY: '#03DAC6',
//   BACKGROUND: '#999999',
//   SURFACE: '#FFFFFF',
//   ERROR: '#B00020',
//   ON_BACKGROUND: '#000000',
//   ON_ERROR: '#FFFFFF'
// };

export const PRIMARY_THEME:themeType = {
  name: 'light',
  default: '#eeeeee',
  PRIMARY: '#0091ea',
  SECONDARY: '#ff8a65',
  BACKGROUND: '#fffefc',
  ERROR: '#B00020',
  ON_BACKGROUND: '#282828',
  ON_ERROR: '#FFFFFF'
};

export const DARK_THEME:themeType = {
  name: 'dark',
  default: '#000',
  PRIMARY: '#fd7014',//'#e91e63'
  SECONDARY: '#e0f2f1',
  BACKGROUND: '#121212',
  ERROR: '#CF6679',
  ON_BACKGROUND: '#FFFFFF',
  ON_ERROR: '#000000'
};
