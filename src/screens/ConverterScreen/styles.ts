import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    paddingTop: 20,
    fontSize: 20,
  },
  changeDateContainer: {
    alignItems: 'center',
    paddingTop: 5,
    paddingVertical: 20,
    flexDirection: 'row',
  },
  currencyFieldContainer: {
    flexDirection: 'row',
    marginVertical: 3,
    alignItems: 'center',
  },
  converterIcon: {
    width: 25,
    alignItems: 'center',
  },
  converterInput: {
    width: 250,
    height: 40,
    borderBottomWidth: 1,
    marginHorizontal: 3,
  },
  pickerStyle: {
    width: 50,
    height: 50,
  },
  pickerItemStyle: {
    height: 50,
  },
  tableWrapper: {
    // padding: 10,
    width: '95%',
    marginBottom: 20,
  },
  tableHead: {
    height: 40,
    borderWidth: 1,
  },
  tableRow: {},
  tableTextStyle: {},
});
