import React, {useState} from 'react'
import {View, Text, FlatList, ListRenderItem, TextInput, Picker} from 'react-native'
import {useSelector} from "react-redux";
import {getIsDarkMode} from "@root/selectors";
import {themeType} from "@root/redux/reducers/settingsReducer";
import {DARK_THEME, PRIMARY_THEME} from "@root/consts/themes";

export const ConverterScreen = () => {

  const isDarkMode: boolean = useSelector(getIsDarkMode);
  const theme: themeType = isDarkMode ? DARK_THEME : PRIMARY_THEME;
  const [textColor, bgColor, primary] = [theme.ON_BACKGROUND, theme.BACKGROUND, theme.PRIMARY];

  type currType = { curr_id: number, curr_code: string, value: number, curr_rate: number };
  type RenderItem = ListRenderItem<currType>;
  type ConverterRowPropsType = { item: currType, changeSmth: (code: string, value: string) => void };

  const [currArr, setCurrArr] = useState<currType[]>([
    {curr_id: 1, curr_code: 'BYN', value: 2.1, curr_rate: 2.1},
    {curr_id: 2, curr_code: 'USD', value: 1, curr_rate: 1},
    {curr_id: 3, curr_code: 'EUR', value: 0.89, curr_rate: 0.89},
    {curr_id: 4, curr_code: 'RUB', value: 61.69, curr_rate: 61.69}
  ]);

  const changeSmth = (code: string, value: string) => {
    console.log('code', code);
    console.log('value', value);
    let tmp = [...currArr].map((e) => {
      if (e.curr_code === code) e.value = Number.parseFloat(value);
      return e;
    });
    setCurrArr(tmp);
  };

  const ConverterRow = (props: ConverterRowPropsType) => {
    const {item, changeSmth} = props;
    const [value, setValue] = useState<string>('');
    const [currVal, setCurrVal] = useState<string>(item.curr_code);

    const onChangeText = (text: string) => {
      console.log('changeSmth');
      // setValue(text);
      changeSmth(currVal, text);
    };

    return (
      <View style={{flexDirection: 'row', paddingVertical: 5, marginVertical: 3, alignItems: 'center'}}>
        <TextInput style={{width: 250, height: 40, borderColor: textColor, color: textColor, borderWidth: 1}}
                   placeholder={'0'}
                   placeholderTextColor={textColor}
                   keyboardType={'decimal-pad'}
                   value={item.value.toString()}
                   autoFocus={true}
          // value={value}
                   onChangeText={onChangeText}
          // onChangeText={text => {
          //   console.log('text',text);
          //   onChangeText(text)}}
        />
        <Picker selectedValue={currVal}
                onValueChange={(itemValue) => setCurrVal(itemValue)}
                style={{width: 50, height: 50}}
                itemStyle={{height: 50, color: primary}}>
          {currArr.map(e => (<Picker.Item key={e.curr_id} label={e.curr_code} value={e.curr_code}/>))}
        </Picker>
      </View>
    )
  };

  const renderItem: RenderItem = ({item}) => {
    return <ConverterRow item={item} changeSmth={changeSmth}/>
  };

  const keyExtractor = (item: currType) => item.curr_id.toString();

  return (
    <View style={{flex: 1, backgroundColor: bgColor, alignItems: 'center'}}>
      <Text style={{color: textColor, paddingVertical: 20, fontSize: 20}}>Converter screen</Text>

      {/*{currArr.map(e => <ConverterRow key={e.curr_id} item={e} changeSmth={changeSmth}/>)}*/}
      <FlatList data={currArr}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                style={{}}/>
    </View>
  )
};
