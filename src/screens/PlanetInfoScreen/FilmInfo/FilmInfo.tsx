import React, { FC, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FilmInfoProps } from '../types';
import { colors } from '../../../consts/themes';
import { styles } from '../styles';

export const FilmInfo: FC<FilmInfoProps> = ({ item }) => {
  const [hiddenInfo, setHiddenInfo] = useState(false);
  const style = StyleSheet.create({
    container: { backgroundColor: hiddenInfo ? colors.gray : colors.black },
  });

  return (
    <TouchableOpacity onPress={() => setHiddenInfo(!hiddenInfo)}>
      <View style={style.container}>
        <Text style={styles.textBoldMd}>Episode {item.episode_id}: {item.title}</Text>
        <Text style={styles.textBoldMd}>{item.release_date}</Text>
        {hiddenInfo
          ? <Text style={styles.textSm}>{item.opening_crawl}</Text>
          : null
        }
      </View>
    </TouchableOpacity>
  );
};
