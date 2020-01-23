import { StyleSheet } from 'react-native';
import { fonts } from '@root/consts/themes';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btn: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 50,
    marginHorizontal: 5,
    marginTop: 5,
    marginBottom: 10,
  },
  btnText: {
    fontSize: 18,
    fontFamily: fonts.light,
  },
});
