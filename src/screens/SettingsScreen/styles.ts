import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  containerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderBottomWidth: 1,
  },
  containerIcon: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    fontSize: 20,
    marginLeft: 3,
  },
});
