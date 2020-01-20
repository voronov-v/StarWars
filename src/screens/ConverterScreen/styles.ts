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
    flexDirection: 'row',
    paddingVertical: 10,
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
  sliderWrapper: {
    height: 230,
    paddingHorizontal: 25,
  },
  sliderHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
  },
  sliderHeaderItem: {
    width: 80,
    height: 5,
    borderRadius: 50,
  },
});
