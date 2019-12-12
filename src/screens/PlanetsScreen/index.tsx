import React, { FC, useEffect, useState } from 'react';
import {View, Text, ActivityIndicator, ListRenderItemInfo, TouchableOpacity} from 'react-native';
import { PlanetsScreenView } from './PlanetsScreenView';
import axios from 'axios';
import { PlanetType, RenderItem } from './types';
import { styles } from './styles';

export const PlanetsScreenFlat: FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const url = 'https://swapi.co/api/planets/';

  useEffect(() => {
    async function anyNameFunction() {
      let resultData: PlanetType[] = [];
      let response = await axios.get(url);

      while (response.data.next) {
        resultData = [...resultData, ...response.data.results];
        response = await axios.get(response.data.next);
        break;
      }
      console.log('resultData');
      console.log(resultData);
      setData(resultData);
      setIsLoad(true);
    }

    anyNameFunction();
  }, []);

  const onPlanetPress = (planetInfo: PlanetType) => {
    console.log(planetInfo);
  };

  const renderItem: RenderItem = ({
    item,
  }: ListRenderItemInfo<PlanetType>): ReturnType<RenderItem> => {
    return (
        <TouchableOpacity onPress={onPlanetPress.bind(null,item)}>
          <View style={styles.item}>
            <Text style={styles.title}>planet: {item.name}</Text>
            <Text>population: {item.population}</Text>
            <Text>climate: {item.climate}</Text>
          </View>
        </TouchableOpacity>

    );
  };

  const keyExtractor = (item: PlanetType) => item.name;

  if (!isLoad)
    return (
          <View style={[styles.container]}>
            <ActivityIndicator size='large' color='#0000ff' />
          </View>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.headText}>Choose your planet:</Text>
      <PlanetsScreenView data={data} renderItem={renderItem} keyExtractor={keyExtractor} />
    </View>
  );
};
