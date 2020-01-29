import { StyleSheet } from 'react-native';
import { fonts } from '@root/consts/themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 30,
    fontFamily: fonts.regular,
    paddingHorizontal: 5,
  },
  currencyText: {
    fontSize: 18,
    fontFamily: fonts.regular,
  },
  changeDateContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 25,
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
  toggleGraphBtn: {
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 50,
  },
});
