import React, {useState} from 'react'
import {View, Text, TextInput, Picker, Alert} from 'react-native'
import {useSelector} from "react-redux";
import {getIsDarkMode} from "@root/selectors";
import {themeType} from "@root/redux/reducers/settingsReducer";
import {DARK_THEME, PRIMARY_THEME} from "@root/consts/themes";
import Icon from 'react-native-vector-icons/FontAwesome';
import {styles} from './styles';
import {currType} from "@root/screens/ConverterScreen/types";

export const ConverterScreen = () => {

  const isDarkMode: boolean = useSelector(getIsDarkMode);
  const theme: themeType = isDarkMode ? DARK_THEME : PRIMARY_THEME;
  const [textColor, bgColor, primary] = [theme.ON_BACKGROUND, theme.BACKGROUND, theme.PRIMARY];

  const [currArr, setCurrArr] = useState<currType[]>([
    {curr_id: 1, curr_code: 'BYN', value: '2.11', curr_rate: 2.11},
    {curr_id: 2, curr_code: 'USD', value: '1', curr_rate: 1, currIconName: 'usd'},
    {curr_id: 3, curr_code: 'EUR', value: '0.89', curr_rate: 0.89, currIconName: 'eur'},
    {curr_id: 4, curr_code: 'RUB', value: '62.09', curr_rate: 62.09}
  ]);

  const onChangeFieldText = (code: string, value: string) => {
    console.log(`code: ${code} value: ${value}`);
    if (!/^\d*\.?\d*$/.test(value)) {
      return Alert.alert(`Invalid input`, `on ${code} currency field`);
    }

    const rate = value !== "" ? Number.parseFloat(value) / currArr.find(e => e.curr_code === code)!.curr_rate : 0;
    console.log('rate', rate);

    let tmp = [...currArr].map((e) => {
      e.value = e.curr_code === code ? value : (Math.round(rate * e.curr_rate * 100) / 100).toString();
      return e;
    });
    setCurrArr(tmp);
  };

  const onChangeFieldCurrency = (nextVal: string, prevVal: string) => {
    if (nextVal !== prevVal) {
      console.log(`${prevVal} => ${nextVal}`);
      const currField = currArr.find((e) => e.curr_code === prevVal);
      if (!currField) {
        console.log('currField', currField);
        onChangeFieldText(nextVal, currField!.value);
      } else Alert.alert('Error', 'Your currency already exists in the list')
    }
  };

  return (
    <View style={{...styles.container, backgroundColor: bgColor}}>
      <Text style={{...styles.title, color: textColor}}>Converter</Text>
      {
        currArr.map(e => {
            return (
              <View key={e.curr_id} style={styles.currencyFieldContainer}>
                <View style={styles.converterIcon}>
                  {e.currIconName && <Icon name={e.currIconName} size={20} color={textColor}/>}
                </View>
                <TextInput style={{...styles.converterInput, borderColor: textColor, color: textColor}}
                           placeholder={'0'}
                           placeholderTextColor={textColor}
                           keyboardType={'decimal-pad'}
                           value={e.value}
                           onChangeText={(text) => onChangeFieldText(e.curr_code, text)}/>
                <Picker selectedValue={e.curr_code}
                        onValueChange={(itemValue) => onChangeFieldCurrency(itemValue, e.curr_code)}
                        style={styles.pickerStyle}
                        itemStyle={{...styles.pickerItemStyle, color: primary}}>
                  {currArr.map(e => (<Picker.Item key={e.curr_id} label={e.curr_code} value={e.curr_code}/>))}
                </Picker>
              </View>
            )
          }
        )
      }
    </View>
  )
};
