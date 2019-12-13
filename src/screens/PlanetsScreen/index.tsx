import React, {FC, useEffect, useState} from 'react';
import {View, Text, ActivityIndicator, ListRenderItemInfo, TouchableOpacity} from 'react-native';
import {PlanetsScreenView} from './PlanetsScreenView';
import axios from 'axios';
import {PlanetType, RenderItem} from './types';
import {styles} from './styles';

export const PlanetsScreenFlat: FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [url, setUrl] = useState<string>('https://swapi.co/api/planets/');

  const loadData = async () => {
    console.log('url = ' + url);
    if (url) {
      setIsLoad(false);
      let response = await axios.get(url);
      console.log('loadData:');
      console.log(response);
      if (response.data.results.length) {
        setData([...data, ...response.data.results]);
        setIsLoad(true);
        setUrl(response.data.next);
      }
    }
  };

  useEffect(() => {
    loadData()
  }, []);

  const onPlanetPress = (planetInfo: PlanetType) => {
    console.log(planetInfo);
  };

  const renderItem: RenderItem = ({item,}: ListRenderItemInfo<PlanetType>): ReturnType<RenderItem> => {
    return (
      <TouchableOpacity onPress={onPlanetPress.bind(null, item)}>
        <View style={styles.item}>
          <Text style={styles.title}>planet: {item.name}</Text>
          <Text>population: {item.population}</Text>
          <Text>climate: {item.climate}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const keyExtractor = (item: PlanetType) => item.name;

  return (
    <View style={styles.container}>
      <Text style={styles.headText}>Choose your planet:</Text>
      <PlanetsScreenView data={data} renderItem={renderItem} keyExtractor={keyExtractor} loadData={loadData}/>
      {!isLoad
        ?
          <View style={[styles.container]}>
            <ActivityIndicator size='large' color='#0000ff'/>
          </View>
        : null
      }
    </View>
  );
};
