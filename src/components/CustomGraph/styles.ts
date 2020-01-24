import { Dimensions, StyleSheet } from 'react-native';
import { colors, fonts } from '@root/consts/themes';

export const { width } = Dimensions.get('window');
export const cursorRadius = 12;
export const height = 250;
export const verticalPadding = 5;
const graphVerticalPadding = 20;

export const styles = StyleSheet.create({
  container: {
    height: height,
    marginTop: graphVerticalPadding
  },
  graphContainer: {
    height,
    width,
    // paddingTop: graphVerticalPadding,
  },
  graphHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10
  },
  graphBtn: {
    backgroundColor: 'orange',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 50,
  },
  graphLabel: {
    paddingVertical: 5,
  },
  graphLabelText: {
    color: 'white',
    fontFamily: fonts.regular,
    fontSize: 18
  },
  graphCursor: {
    width: cursorRadius * 2,
    height: cursorRadius * 2,
    borderRadius: cursorRadius,
    borderColor: '#367be2',
    borderWidth: 3,
    backgroundColor: 'red',
  },
  modalBackground: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: 300,
    backgroundColor: 'white',
  },
  modalBtn: {
    padding: 10,
    width: '100%',
    borderBottomColor: colors.black,
    borderBottomWidth: 1,
  },
  modalBtnText: {
    textAlign: 'center',
    fontFamily: fonts.bold,
  },
});
