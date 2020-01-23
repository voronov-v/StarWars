import { themeType } from '@root/redux/reducers/settingsReducer';

export enum colors {
  black = '#000',
  pink = '#e91e63',
  orange = '#ff7f50',
  gray = '#313143',
  yellow = '#e8be2b',
}

export const PRIMARY_THEME: themeType = {
  name: 'light',
  default: '#eeeeee',
  PRIMARY: '#0091ea',
  PRIMARY_LIGHT: '#1976d2', //'#e91e63'
  PRIMARY_VAR: '#FFFFFF',
  PRIMARY_VAR_BG: '#039be5',
  SECONDARY: '#ff8a65',
  BACKGROUND: '#fffefc',
  ERROR: '#B00020',
  ON_BACKGROUND: '#282828',
  ON_ERROR: '#FFFFFF',
  BLACK: '#000',
  WHITE: '#FFF',
};

export const DARK_THEME: themeType = {
  name: 'dark',
  default: '#000',
  PRIMARY: '#fd7014', //'#e91e63'
  PRIMARY_LIGHT: '#ee6002', //'#e91e63'
  PRIMARY_VAR: '#FFFFFF',
  PRIMARY_VAR_BG: '#e91e63',
  SECONDARY: '#e0f2f1',
  BACKGROUND: '#121212',
  ERROR: '#CF6679',
  ON_BACKGROUND: '#FFFFFF',
  ON_ERROR: '#000000',
  BLACK: '#000',
  WHITE: '#FFF',
};

export enum fonts {
  light = 'Roboto-Light',
  regular = 'Roboto-Regular',
  bold = 'Roboto-Bold',
  italic = 'Roboto-Italic',
  thin = 'Roboto-Thin',
}
