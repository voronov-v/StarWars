import React, {FC, useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from "react-native";
import axios from "axios";
import {FilmType} from "./types";
import {RenderItem} from "@root/screens/PlanetsScreen/types";

export const PlanetInfoView: FC = ({data}) => {
  // console.log('props from view', data);
  // const [isLoad, setIsLoad] = useState<boolean>(false);
  const [filmData, setFilmData] = useState<FilmType[]>([]);

  useEffect(() => {
    const loadData = async () => {
      console.log('loading films...');
      let result = [];
      for (let i = 0; i < data.films.length; i++) {
        let resp = await axios(data.films[i]);
        result.push(resp.data);
      }
      console.log(result);
      setFilmData(result);
      // setIsLoad(true);
    };
    loadData();
  }, []);

  const created = new Date(Date.parse(data.created)).toLocaleDateString();

  const renderItem: RenderItem = (item: FilmType) => {
    console.log(item);
    return <View>
      <Text style={style.fontsSm}>
        {item.item.title}
      </Text>
    </View>
  };

  return <View style={style.container}>
    <View style={style.containerHead}>
      <Text style={style.fontsLg}>{data.name}</Text>
      <Text style={style.fontsMd}>created in {created}</Text>
    </View>

    <View style={style.containerInfo}>
      <Text style={style.fontsMd}>Info:</Text>
      <Text style={style.fontsSm}>climate: {data.climate}</Text>
      <Text style={style.fontsSm}>diameter: {data.diameter}</Text>
      <Text style={style.fontsSm}>gravity: {data.gravity}</Text>
      <Text style={style.fontsSm}>population: {data.population}</Text>
      <Text style={style.fontsSm}>surface_water: {data.surface_water}</Text>
      <Text style={style.fontsSm}>terrain: {data.terrain}</Text>
    </View>

    <View style={style.containerFilms}>
      <Text style={style.fontsMd}>Films:</Text>
      <FlatList
        data={filmData}
        renderItem={renderItem}
        keyExtractor={item => item.url}
      />
    </View>

    {/*<Text>residents: {data.residents}</Text>*/}
  </View>
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerHead: {
    paddingTop: 40,
    backgroundColor: 'orange',
    width: '100%',
    alignItems: 'center',
    paddingBottom: 10,
  },
  containerInfo: {
    backgroundColor: '#fff8dc',
    padding: 10,
  },
  containerFilms: {
    backgroundColor: '#778899',
    padding: 10,
  },
  fontsLg: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  fontsMd: {
    fontSize: 24,
    fontStyle: 'italic'
  },
  fontsSm: {
    fontSize: 18,
  },
});
