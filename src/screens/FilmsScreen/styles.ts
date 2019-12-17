import {StyleSheet} from 'react-native';
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
    padding: 5,
    marginVertical: 5,
    marginHorizontal: 16,
    borderRadius: 40,
    borderStyle: 'solid',
    borderWidth: 3,
  },
  title: {
    fontSize: 21,
  },
  headText: {
    alignSelf: 'center',
    color: colors.pink,
    fontSize: 25,
  },
});
