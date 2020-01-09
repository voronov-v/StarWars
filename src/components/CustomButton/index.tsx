import React, { ReactElement } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ButtonProps } from '@root/components/CustomButton/types';

export const CustomButton = (props: ButtonProps): ReactElement<ButtonProps> => {
  const { wrapperStyle, bgStyle, onPress, children } = props;

  return (
    <View style={wrapperStyle}>
      <TouchableOpacity onPress={onPress}>
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
            ...bgStyle,
          }}
        >
          {children}
        </View>
      </TouchableOpacity>
    </View>
  );
};
