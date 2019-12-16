import { StyleSheet } from 'react-native';
import {colors} from '../../consts/themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    paddingTop: 20,
  },
  containerHead: {
    paddingTop: 10,
    alignItems: 'center',
  },
  containerIcon: {
    paddingLeft: 10,
    paddingVertical: 5,
  },
  containerInfo: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  }
});
