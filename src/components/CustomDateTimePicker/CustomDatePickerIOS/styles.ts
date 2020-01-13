import { Dimensions, Platform, StyleSheet } from 'react-native';
import { colors } from './colors';

export const isIphoneX = () => {
  const { height, width } = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (height === 812 || width === 812 || (height === 896 || width === 896))
  );
};

export const styles = StyleSheet.create({
  contentContainer: {
    justifyContent: 'flex-end',
    margin: 10,
  },
  datepickerContainer: {
    borderRadius: colors.BORDER_RADIUS,
    marginBottom: 8,
    overflow: 'hidden',
  },
  titleContainer: {
    borderBottomColor: colors.BORDER_COLOR,
    borderBottomWidth: StyleSheet.hairlineWidth,
    padding: 14,
    backgroundColor: 'transparent',
  },
  title: {
    textAlign: 'center',
    color: colors.TITLE_COLOR,
    fontSize: colors.TITLE_FONT_SIZE,
  },
  confirmButton: {
    borderColor: colors.BORDER_COLOR,
    borderTopWidth: StyleSheet.hairlineWidth,
    backgroundColor: 'transparent',
    height: 57,
    justifyContent: 'center',
  },
  confirmText: {
    textAlign: 'center',
    color: colors.BUTTON_FONT_COLOR,
    fontSize: colors.BUTTON_FONT_SIZE,
    fontWeight: colors.BUTTON_FONT_WEIGHT,
    backgroundColor: 'transparent',
  },
  cancelButton: {
    borderRadius: colors.BORDER_RADIUS,
    height: 57,
    marginBottom: isIphoneX() ? 20 : 0,
    justifyContent: 'center',
  },
  cancelText: {
    padding: 10,
    textAlign: 'center',
    color: colors.BUTTON_FONT_COLOR,
    fontSize: colors.BUTTON_FONT_SIZE,
    fontWeight: '600',
    backgroundColor: 'transparent',
  },
});
