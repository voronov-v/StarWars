import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {colors} from '../../consts/themes'

export const Spinner = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.black}}>
      <ActivityIndicator color={colors.pink} size={'large'}/>
    </View>
  )
};

