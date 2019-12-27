import React from 'react';
import {View, TouchableOpacity} from "react-native";

export const CustomButton = (props: any) => {
  const {wrapperStyle, bgStyle, onPress, children} = props;

  return (
    <View style={wrapperStyle}>
      <TouchableOpacity onPress={onPress}>
        <View
          style={{width: 40, height: 40, borderRadius: 50, justifyContent: 'center', alignItems: 'center', ...bgStyle}}>
          {children}
        </View>
      </TouchableOpacity>
    </View>
  )
}
