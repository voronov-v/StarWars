import { StyleSheet } from 'react-native';
import { fonts } from '@root/consts/themes';

export const styles = StyleSheet.create({
  container: {
    width: '95%',
  },
  tableHead: {
    paddingVertical: 5,
    borderWidth: 1,
  },
  headRowText: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: fonts.bold,
  },
  rowText: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: fonts.regular,
  },
});
