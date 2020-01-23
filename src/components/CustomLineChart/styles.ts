import { StyleSheet } from 'react-native';
import { colors, fonts } from '@root/consts/themes';

export const styles = StyleSheet.create({
  container: {
    height: 350,
    backgroundColor: 'white',
    paddingHorizontal: 30,
    paddingVertical: 15,
    flexDirection: 'row',
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
