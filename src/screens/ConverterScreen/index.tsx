import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Picker, TouchableOpacity, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getIsDarkMode, getRates } from '@root/selectors';
import { themeType } from '@root/redux/reducers/settingsReducer';
import { DARK_THEME, PRIMARY_THEME } from '@root/consts/themes';
import { styles } from './styles';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
//@ts-ignore
import { Table, Row, Rows, TableWrapper } from 'react-native-table-component';
import { LOAD_CURRENCY_RATES_ON_DATE } from '@root/redux/reducers/currencyReducer';
import { Spinner } from '@root/components/Spinner/Spinner';

export const ConverterScreen = () => {
  const dispatch = useDispatch();

  const [datePicker, setDatePicker] = useState(moment(new Date()).format('DD.MM.YYYY'));
  const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);

  const currency = useSelector(getRates);
  const { currencyRates, loading } = currency;

  const rowsData = currencyRates
    ? currencyRates.map((e) => [e.Cur_Name, e.Cur_OfficialRate, e.Cur_Abbreviation, e.Cur_Scale])
    : [];
  const [ratesToRender, setRatesToRender] = useState(currencyRates || []);

  useEffect(() => {
    const date = moment(datePicker, 'DD.MM.YYYY').format('YYYY-MM-DD');
    dispatch({ type: LOAD_CURRENCY_RATES_ON_DATE, payload: { date } });
  }, [datePicker]);

  useEffect(() => {
    setRatesToRender(currencyRates || []);
  }, [currencyRates]);

  const isDarkMode: boolean = useSelector(getIsDarkMode);
  const theme: themeType = isDarkMode ? DARK_THEME : PRIMARY_THEME;
  const [textColor, bgColor, primary] = [theme.ON_BACKGROUND, theme.BACKGROUND, theme.PRIMARY];

  const onChangeFieldText = (code: string, value: string) => {
    if (!/^\d*\.?\d*$/.test(value)) {
      return Alert.alert(`Invalid input`, `on ${code} currency field`);
    }

    const field = ratesToRender.find((e) => e.Cur_Abbreviation === code)!;
    const bynVal =
      value !== '' ? (Number.parseFloat(value) * field.Cur_OfficialRate) / field.Cur_Scale : 0;
    console.log(`code: ${code} value: ${value} BYN: ${bynVal}`);

    const tmp = [...ratesToRender].map((e) => {
      e.Cur_Value =
        e.Cur_Abbreviation === code
          ? value
          : (Math.round((bynVal / e.Cur_OfficialRate) * e.Cur_Scale * 100) / 100).toString();
      return e;
    });
    setRatesToRender(tmp);
  };

  // const onChangeFieldCurrency = (nextVal: string, prevVal: string) => {
  //   if (nextVal !== prevVal) {
  //     console.log(`${prevVal} => ${nextVal}`);
  //     const currField = currArr.find((e) => e.curr_code === prevVal);
  //     if (!currField) {
  //       console.log('currField', currField);
  //       onChangeFieldText(nextVal, currField!.value);
  //     } else Alert.alert('Error', 'Your currency already exists in the list');
  //   }
  // };

  const handleDatePicked = (date: Date) => {
    const dat = moment(date).format('DD.MM.YYYY');
    setDatePicker(dat);
    setIsDateTimePickerVisible(false);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <View style={{ ...styles.container, backgroundColor: bgColor }}>
      <Text style={{ ...styles.title, color: textColor }}>Converter</Text>
      <View style={styles.changeDateContainer}>
        <TouchableOpacity onPress={() => setIsDateTimePickerVisible(true)}>
          <Text style={{ color: primary, fontSize: 20 }}>{datePicker}</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          borderWidth: 1,
          borderColor: textColor,
          padding: 10,
          width: '95%',
          marginBottom: 20,
        }}
      >
        <Table borderStyle={{}}>
          <Row
            data={['Currency', 'Rate', 'Code', 'Count']}
            style={{ height: 40, borderWidth: 1, borderColor: textColor }}
            flexArr={[2, 1, 1, 1]}
            textStyle={{ color: textColor, textAlign: 'center' }}
          />
          <TableWrapper style={{ flexDirection: 'row' }}>
            <Rows
              data={rowsData}
              flexArr={[2, 1, 1, 1]}
              style={{ height: 28 }}
              textStyle={{ color: textColor, textAlign: 'center' }}
            />
          </TableWrapper>
        </Table>
      </View>

      {ratesToRender.map((e) => {
        return (
          <View key={e.Cur_ID} style={styles.currencyFieldContainer}>
            <TextInput
              style={{ ...styles.converterInput, borderColor: textColor, color: textColor }}
              placeholder={'0'}
              placeholderTextColor={textColor}
              keyboardType={'decimal-pad'}
              value={e.Cur_Value}
              onChangeText={(text) => onChangeFieldText(e.Cur_Abbreviation, text)}
            />
            <Text style={{ color: textColor }}>{e.Cur_Abbreviation}</Text>
            <Picker
              selectedValue={e.Cur_Abbreviation}
              // onValueChange={(itemValue) => onChangeFieldCurrency(itemValue, e.Cur_Abbreviation)}
              style={styles.pickerStyle}
              itemStyle={{ ...styles.pickerItemStyle, color: primary }}
            >
              {ratesToRender.map((e) => (
                <Picker.Item key={e.Cur_ID} label={e.Cur_Abbreviation} value={e.Cur_Abbreviation} />
              ))}
            </Picker>
          </View>
        );
      })}
      <DateTimePicker
        isVisible={isDateTimePickerVisible}
        onConfirm={handleDatePicked}
        onCancel={() => setIsDateTimePickerVisible(false)}
      />
    </View>
  );
};

// const styles2 = StyleSheet.create({
//   container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
//   head: {height: 40, backgroundColor: '#f1f8ff'},
//   wrapper: {flexDirection: 'row'},
//   title: {flex: 1, backgroundColor: '#f6f8fa'},
//   row: {height: 28},
//   text: {textAlign: 'center'}
// });
