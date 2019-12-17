import { StyleSheet } from 'react-native';
import {colors} from '../../consts/themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: colors.black,
  },
  item: {
    alignItems: 'center',
    backgroundColor: colors.orange,
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 30,
    borderStyle: 'solid',
    borderWidth: 3,
  },
  title: {
    fontSize: 24,
  },
  headText: {
    alignSelf: 'center',
    color: colors.pink,
    fontSize: 30,
  },
});
