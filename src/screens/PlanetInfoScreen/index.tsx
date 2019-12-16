import React, { FC, ReactElement, useEffect, useState } from 'react';
import { PlanetInfoView } from './PlanetInfoView';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { PlanetType } from '@root/screens/PlanetsScreen/types';
import { PeopleType } from '@root/screens/PlanetInfoScreen/types';
import {FilmType} from "../FilmsScreen/types";
import axios from 'axios';
import {Spinner} from '../../components/Spinner/Spinner'

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

    const loadData = async (arrFilms: Array<FilmType>, arrResidents: Array<PeopleType>) => {
      let respData = [], resp;

      for (let i = 0; i < arrFilms.length; i++) {
        resp = await axios(arrFilms[i]);
        respData.push(resp.data);
      }
      setFilmData(respData);

      respData = [];
      for (let i = 0; i < arrResidents.length; i++) {
        resp = await axios(arrResidents[i]);
        respData.push(resp.data);
      }
      setResidentsData(respData);

      setIsLoad(true);

    };
    loadData(data.films, data.residents);

    // return () => {
      // isMount = false;
    // };
  }, []);

  if (!isLoad) return <Spinner />;

  return <PlanetInfoView planetInfo={data} filmsInfo={filmData} residentsInfo={residentsData}/>;
};
