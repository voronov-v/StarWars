import React, {FC, ReactElement, useEffect, useState} from 'react';
import {View, Text, ListRenderItemInfo, TouchableOpacity} from 'react-native';
import {PlanetsScreenView} from './PlanetsScreenView';
import axios from 'axios';
import {PlanetType, RenderItem} from './types';
import {styles} from './styles';
import {NavigationStackScreenProps} from 'react-navigation-stack';
import {Spinner} from "../../components/Spinner/Spinner";

export const PlanetsScreen: FC<NavigationStackScreenProps> = (props: NavigationStackScreenProps): ReactElement<NavigationStackScreenProps> => {
  const {navigation} = props;

  const [data, setData] = useState<PlanetType[]>([]);
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [url, setUrl] = useState<string>('https://swapi.co/api/planets/');

  const loadData = async () => {
    if (url) {
      setIsLoad(false);
      let response = await axios.get(url);
      if (response.data.results.length) {
        setData([...data, ...response.data.results]);
        setIsLoad(true);
        setUrl(response.data.next);
      }
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const renderItem: RenderItem = ({item}: ListRenderItemInfo<PlanetType>): ReturnType<RenderItem> => {
    const onPress = () => navigation.navigate('PlanetInfo', {item});

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
      {!isLoad ? <Spinner/> : null}
    </View>
  );
};
