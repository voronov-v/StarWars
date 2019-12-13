import React, {FC, ReactElement, useEffect, useState} from 'react';
import {View, Text, ActivityIndicator, ListRenderItemInfo, TouchableOpacity} from 'react-native';
import {PlanetsScreenView} from './PlanetsScreenView';
import axios from 'axios';
import {PlanetType, RenderItem} from './types';
import {styles} from './styles';
import {NavigationStackScreenProps} from "react-navigation-stack";

export const PlanetsScreen: FC<NavigationStackScreenProps> = (props: NavigationStackScreenProps): ReactElement<NavigationStackScreenProps> => {
  const {navigation} = props;

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

  const renderItem: RenderItem = ({item,}: ListRenderItemInfo<PlanetType>): ReturnType<RenderItem> => {
    const onPress = () => {
      console.log('navigate to someshere');
      console.log(item);
      return navigation.navigate('PlanetInfo', { item });
    };

    return (
      <TouchableOpacity onPress={onPress}>
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
        <View style={[styles.containerActivity]}>
          <ActivityIndicator size='large' color='#0000ff'/>
        </View>
        : null
      }
    </View>
  );
};
