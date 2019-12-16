import { StyleSheet } from 'react-native';
import { colors } from '../../consts/themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  containerHead: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  containerIcon: {
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  textBoldMd: {
    color: colors.yellow,
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  textSm: {
    color: colors.yellow,
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
});
