import React, { FC, ReactElement, useEffect, useState } from 'react';
import { PlanetInfoView } from './PlanetInfoView';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { PlanetType } from '@root/screens/PlanetsScreen/types';
import { FilmType, PeopleType } from '@root/screens/PlanetInfoScreen/types';
import axios from 'axios';
import { ActivityIndicator, View } from 'react-native';

export const PlanetInfoScreen: FC<NavigationStackScreenProps> = (props: NavigationStackScreenProps): ReactElement<NavigationStackScreenProps> => {
  const { navigation } = props;
  const data: PlanetType = navigation.state.params!.item;

  console.log('data:');
  console.log(data);
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [filmData, setFilmData] = useState<FilmType[]>([]);
  const [residentsData, setResidentsData] = useState<PeopleType[]>([]);

  useEffect(() => {
    // let isMount: boolean = true;
    // console.log(isMount);

    const loadData = async (arr: Array<FilmType | PeopleType>, setFnc: Function, loadFlag: boolean) => {
      let respData = [], resp;
      for (let i = 0; i < arr.length; i++) {
        resp = await axios(arr[i]);
        respData.push(resp.data);
      }
      setFnc(respData);
      if (loadFlag) setIsLoad(true);
    };

    loadData(data.films, setFilmData, true);
    loadData(data.residents, setResidentsData, true);

    return () => {
      // isMount = false;
    };
  }, []);

  if (!isLoad) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
        <ActivityIndicator size='large' color='#e91e63'/>
      </View>
    );
  }

  return <PlanetInfoView planetInfo={data} filmsInfo={filmData} residentsInfo={residentsData}/>;
};
