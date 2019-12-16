import React, {FC, ReactElement, useEffect, useState} from 'react';
import {View, Text, ListRenderItemInfo, TouchableOpacity} from 'react-native';
import {FilmsScreenView} from './FilmsScreenView';
import axios from 'axios';
import {FilmType, RenderItem} from './types';
import {NavigationStackScreenProps} from 'react-navigation-stack';
import {styles} from "./styles";
import {Spinner} from "../../components/Spinner/Spinner";

export const FilmsScreen: FC<NavigationStackScreenProps> = (props: NavigationStackScreenProps): ReactElement<NavigationStackScreenProps> => {
  const {navigation} = props;

  const [data, setData] = useState<FilmType[]>([]);
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const url = 'https://swapi.co/api/films/';

  useEffect(() => {
    const loadData = async () => {
      setIsLoad(false);
      let resp = await axios.get(url);
      if (resp.data.results.length) {
        let arr = [...resp.data.results].sort((a,b) => a.episode_id - b.episode_id);
        setData(arr);
        setIsLoad(true);
      }
    };

    loadData();
  }, []);

  const renderItem: RenderItem = ({item}: ListRenderItemInfo<FilmType>): ReturnType<RenderItem> => {
    const onPress = () => {
      // navigation.navigate('PlanetInfo', {item});
      console.log('navigate to film desc');

      console.log(navigation);
    };

    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.item}>
          <Text style={styles.title}>Episode {item.episode_id}: {item.title}</Text>
          <Text>created by: {item.director}</Text>
          <Text>{item.release_date.substr(0, 4)}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const keyExtractor = (item: FilmType) => item.url;

  if (!isLoad) return <Spinner/>;

  return (
    <View style={styles.container}>
      <Text style={styles.headText}>Chose your film:</Text>
      <FilmsScreenView data={data} renderItem={renderItem} keyExtractor={keyExtractor}/>
    </View>
  );
};
