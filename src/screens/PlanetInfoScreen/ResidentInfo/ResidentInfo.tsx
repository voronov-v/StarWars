import React, { FC, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ResidentInfoProps } from '../types';
import { styles } from '../styles';
import { colors } from '../../../consts/themes';

export const ResidentInfo: FC<ResidentInfoProps> = ({ item }) => {
  const [hiddenInfo, setHiddenInfo] = useState(false);
  const style = StyleSheet.create({
    container: { backgroundColor: hiddenInfo ? colors.gray : colors.black },
  });

  return (
    <TouchableOpacity onPress={() => setHiddenInfo(!hiddenInfo)}>
      <View style={style.container}>
        <Text style={styles.textBoldMd}>
          {item.name} ({item.gender}) was born in {item.birth_year}
        </Text>
        {hiddenInfo
          ? <View>
            <Text style={styles.textSm}>basic info:</Text>
            <Text style={styles.textSm}>eye_color: {item.eye_color}</Text>
            <Text style={styles.textSm}>hair_color: {item.hair_color}</Text>
            <Text style={styles.textSm}>skin_color: {item.skin_color}</Text>
            <Text style={styles.textSm}>mass: {item.mass}</Text>
          </View>
          : null
        }
      </View>
    </TouchableOpacity>
  );
};
