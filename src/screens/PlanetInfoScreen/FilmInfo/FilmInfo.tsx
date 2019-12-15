import React, { FC, useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { FilmInfoProps } from '../types';
import { WhiteText, WhiteTextBold } from '../PlanetInfoView';
import { styles } from '../styles';

export const FilmInfo: FC<FilmInfoProps> = ({ item }) => {
  const [hiddenInfo, setHiddenInfo] = useState(false);
  const style = StyleSheet.create({
    container: { backgroundColor: hiddenInfo ? '#313143' : '#000000' },
  });

  return (
    <TouchableOpacity onPress={() => setHiddenInfo(!hiddenInfo)}>
      <View style={{ ...styles.containerInfo, ...style.container }}>
        <WhiteTextBold>Episode {item.episode_id}: {item.title}</WhiteTextBold>
        <WhiteTextBold>{item.release_date}</WhiteTextBold>
        {hiddenInfo
          ? <WhiteText>{item.opening_crawl}</WhiteText>
          : null
        }
      </View>
    </TouchableOpacity>
  );
};
