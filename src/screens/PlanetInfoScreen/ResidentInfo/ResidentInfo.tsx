import React, { FC, useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { ResidentInfoProps } from '../types';
import { WhiteText, WhiteTextBold } from '../PlanetInfoView';
import { styles } from '../styles';

export const ResidentInfo: FC<ResidentInfoProps> = ({ item }) => {
  const [hiddenInfo, setHiddenInfo] = useState(false);
  const style = StyleSheet.create({
    container: { backgroundColor: hiddenInfo ? '#313143' : '#000000' },
  });

  return (
    <TouchableOpacity onPress={() => setHiddenInfo(!hiddenInfo)}>
      <View style={{ ...styles.containerInfo, ...style.container }}>
        <WhiteTextBold>
          {item.name} ({item.gender}) was born in {item.birth_year}
        </WhiteTextBold>
        {hiddenInfo
          ? <View>
            <WhiteText>basic info:</WhiteText>
            <WhiteText>eye_color: {item.eye_color}</WhiteText>
            <WhiteText>hair_color: {item.hair_color}</WhiteText>
            <WhiteText>skin_color: {item.skin_color}</WhiteText>
            <WhiteText>mass: {item.mass}</WhiteText>
          </View>
          : null
        }
      </View>
    </TouchableOpacity>
  );
};
