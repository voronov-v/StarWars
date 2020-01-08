import React, {useEffect, useState} from 'react'
import {View, Text, TextInput, Picker, Alert, TouchableOpacity} from 'react-native'
import {useDispatch, useSelector} from "react-redux";
import {getIsDarkMode, getRates} from "@root/selectors";
import {themeType} from "@root/redux/reducers/settingsReducer";
import {DARK_THEME, PRIMARY_THEME} from "@root/consts/themes";
import Icon from 'react-native-vector-icons/FontAwesome';
import {styles} from './styles';
import {currType} from "@root/screens/ConverterScreen/types";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
//@ts-ignore
import {Table, Row, Rows, TableWrapper} from 'react-native-table-component';
import {CurrencyRateType, LOAD_CURRENCY_RATES_ON_DATE} from "@root/redux/reducers/currencyReducer";
import {Spinner} from "@root/components/Spinner/Spinner";

export const ConverterScreen = () => {
  const dispatch = useDispatch();

  const [datePicker, setDatePicker] = useState(moment(new Date()).format('DD.MM.YYYY'));
  const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);

  const currency = useSelector(getRates);
  console.log('currency',currency);
  const {currencyRates, loading, errMsg} = currency;
  console.log('currencyRates', currencyRates);
  console.log('isLoading', loading);

  useEffect(() => {
    const date = moment(datePicker, 'DD.MM.YYYY').format('YYYY-MM-DD');
    dispatch({type: LOAD_CURRENCY_RATES_ON_DATE, payload: {date}});
  }, [datePicker]);

  const isDarkMode: boolean = useSelector(getIsDarkMode);
  const theme: themeType = isDarkMode ? DARK_THEME : PRIMARY_THEME;
  const [textColor, bgColor, primary] = [theme.ON_BACKGROUND, theme.BACKGROUND, theme.PRIMARY];

  // const [currArr, setCurrArr] = useState<currType[]>([
  //   {curr_id: 1, curr_code: 'BYN', curr_name: 'Белорусский рубль', value: '2.11', curr_rate: 2.11},
  //   {curr_id: 2, curr_code: 'USD', curr_name: 'Доллар США', value: '1', curr_rate: 1, currIconName: 'usd'},
  //   {curr_id: 3, curr_code: 'EUR', curr_name: 'Евро', value: '0.89', curr_rate: 0.89, currIconName: 'eur'},
  //   {curr_id: 4, curr_code: 'RUB', curr_name: 'Российский рубль', value: '62.09', curr_rate: 62.09}
  // ]);
  //
  // const onChangeFieldText = (code: string, value: string) => {
  //   console.log(`code: ${code} value: ${value}`);
  //   if (!/^\d*\.?\d*$/.test(value)) {
  //     return Alert.alert(`Invalid input`, `on ${code} currency field`);
  //   }
  //
  //   const rate = value !== "" ? Number.parseFloat(value) / currArr.find(e => e.curr_code === code)!.curr_rate : 0;
  //   console.log('rate', rate);
  //
  //   let tmp = [...currArr].map((e) => {
  //     e.value = e.curr_code === code ? value : (Math.round(rate * e.curr_rate * 100) / 100).toString();
  //     return e;
  //   });
  //   setCurrArr(tmp);
  // };
  //
  // const onChangeFieldCurrency = (nextVal: string, prevVal: string) => {
  //   if (nextVal !== prevVal) {
  //     console.log(`${prevVal} => ${nextVal}`);
  //     const currField = currArr.find((e) => e.curr_code === prevVal);
  //     if (!currField) {
  //       console.log('currField', currField);
  //       onChangeFieldText(nextVal, currField!.value);
  //     } else Alert.alert('Error', 'Your currency already exists in the list')
  //   }
  // };
  //
  // const handleDatePicked = (date: Date) => {
  //   console.log("A date has been picked: ", date);
  //   const dat = moment(date).format('DD.MM.YYYY');
  //   setDatePicker(dat);
  //   setIsDateTimePickerVisible(false)
  // };
  //
  // const rowsData = currencyRates.map((e) => [e.Cur_Name, e.Cur_OfficialRate, e.Cur_Abbreviation, e.Cur_Scale]);
  //
  // type ratesToRenderType = CurrencyRateType & { value?: string };
  // const initialRates: ratesToRenderType[] = currencyRates.map((e) => {
  //     return {...e, value: (e.Cur_OfficialRate).toString()}
  //   }
  // );
  // const [ratesToRender, setRatesToRender] = useState<ratesToRenderType[]>(initialRates ||

  if (loading){
    return <Spinner/>
  }

  return (
    <View><Text>dassda</Text></View>
    // <View style={{...styles.container, backgroundColor: bgColor}}>
    //   <Text style={{...styles.title, color: textColor}}>Converter</Text>
    //   <View style={styles.changeDateContainer}>
    //     <TouchableOpacity onPress={() => setIsDateTimePickerVisible(true)}>
    //       <Text style={{color: primary, fontSize: 20}}>{datePicker}</Text>
    //     </TouchableOpacity>
    //   </View>
    //
    //   <View style={{borderWidth: 1, borderColor: textColor, padding: 10, width: '95%', marginBottom: 20}}>
    //     <Table borderStyle={{}}>
    //       <Row data={['Currency', 'Rate', 'Code', 'Count']}
    //            style={{height: 40, borderWidth: 1, borderColor: textColor}}
    //            flexArr={[2, 1, 1, 1]}
    //            textStyle={{color: textColor, textAlign: 'center'}}/>
    //       <TableWrapper style={{flexDirection: 'row'}}>
    //         <Rows data={rowsData} flexArr={[2, 1, 1, 1]} style={{height: 28}}
    //               textStyle={{color: textColor, textAlign: 'center'}}/>
    //       </TableWrapper>
    //     </Table>
    //   </View>
    //
    //   {
    //     ratesToRender.map(e => {
    //       return (
    //         <View key={e.Cur_ID} style={styles.currencyFieldContainer}>
    //           <TextInput style={{...styles.converterInput, borderColor: textColor, color: textColor}}
    //                      placeholder={'0'}
    //                      placeholderTextColor={textColor}
    //                      keyboardType={'decimal-pad'}
    //                      value={e.value}
    //             // onChangeText={(text) => onChangeFieldText(e.curr_code, text)}
    //           />
    //           <Picker selectedValue={e.Cur_Abbreviation}
    //                   onValueChange={(itemValue) => onChangeFieldCurrency(itemValue, e.Cur_Abbreviation)}
    //                   style={styles.pickerStyle}
    //                   itemStyle={{...styles.pickerItemStyle, color: primary}}>
    //             {ratesToRender.map(e => (
    //               <Picker.Item key={e.Cur_ID} label={e.Cur_Abbreviation} value={e.Cur_Abbreviation}/>))}
    //           </Picker>
    //         </View>
    //       )
    //     })
    //   }
    //
    //   {
    //     currArr.map(e => {
    //         return (
    //           <View key={e.curr_id} style={styles.currencyFieldContainer}>
    //             <Text style={{color: textColor}}>before</Text>
    //             <View style={styles.converterIcon}>
    //               {e.currIconName && <Icon name={e.currIconName} size={20} color={textColor}/>}
    //             </View>
    //             <TextInput style={{...styles.converterInput, borderColor: textColor, color: textColor}}
    //                        placeholder={'0'}
    //                        placeholderTextColor={textColor}
    //                        keyboardType={'decimal-pad'}
    //                        value={e.value}
    //                        onChangeText={(text) => onChangeFieldText(e.curr_code, text)}/>
    //             <Picker selectedValue={e.curr_code}
    //                     onValueChange={(itemValue) => onChangeFieldCurrency(itemValue, e.curr_code)}
    //                     style={styles.pickerStyle}
    //                     itemStyle={{...styles.pickerItemStyle, color: primary}}>
    //               {currArr.map(e => (<Picker.Item key={e.curr_id} label={e.curr_code} value={e.curr_code}/>))}
    //             </Picker>
    //           </View>
    //         )
    //       }
    //     )
    //   }
    //
    //   <DateTimePicker isVisible={isDateTimePickerVisible}
    //                   onConfirm={handleDatePicked}
    //                   onCancel={() => setIsDateTimePickerVisible(false)}/>
    // </View>
  )
};


// const styles2 = StyleSheet.create({
//   container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
//   head: {height: 40, backgroundColor: '#f1f8ff'},
//   wrapper: {flexDirection: 'row'},
//   title: {flex: 1, backgroundColor: '#f6f8fa'},
//   row: {height: 28},
//   text: {textAlign: 'center'}
// });
