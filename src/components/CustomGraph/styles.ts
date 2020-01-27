import { Dimensions, StyleSheet } from 'react-native';
import { colors, fonts } from '@root/consts/themes';

export const { width } = Dimensions.get('window');
export const cursorRadius = 12;
export const height = 250;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  activity: {
    position: 'absolute',
    alignSelf: 'center',
    top: 10,
  },
  graphContainer: {
    height: height,
    width,
    paddingTop: 25,
  },
  graphHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  graphBtn: {
    backgroundColor: 'orange',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 50,
  },
  graphBtnText: {
    fontSize: 18,
    fontFamily: fonts.regular,
  },
  graphLabel: {
    paddingVertical: 5,
  },
  graphLabelText: {
    color: 'white',
    fontFamily: fonts.regular,
    fontSize: 20,
  },
  graphCursor: {
    position: 'absolute',
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
