import {TextInput, View} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import React from "react";
import {useSelector} from "react-redux";
import {getIsDarkMode} from "@root/selectors";
import {themeType} from "@root/redux/reducers/settingsReducer";
import {DARK_THEME, PRIMARY_THEME} from "@root/consts/themes";

export const FilterTextInput = (props:any) => {
  const isDarkMode: boolean = useSelector(getIsDarkMode);
  const theme: themeType = isDarkMode ? DARK_THEME : PRIMARY_THEME;
  const [textColor, bgColor] = [theme.ON_BACKGROUND, theme.BACKGROUND];

  const customFilter = (text:string) => {
    props.setFilter(text);
    props.filterList(text);
  };

  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <TextInput
        style={{
          height: 40,
          width: 300,
          borderColor: 'gray',
          borderWidth: 1,
          backgroundColor: bgColor,
          fontSize: 16,
          color: textColor
        }}
        onChangeText={text => customFilter(text)}
        value={props.filter}
        placeholderTextColor={'#888'}
        placeholder={'Filter'}
        autoCapitalize={'none'}
        autoFocus={true}
      />
      <Icon name={'filter-list'} size={30} color={textColor}/>
    </View>
  )
}

