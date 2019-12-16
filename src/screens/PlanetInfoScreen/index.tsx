import React, {FC, ReactElement, useEffect, useState} from 'react';
import {PlanetInfoView} from './PlanetInfoView';
import {NavigationStackScreenProps} from 'react-navigation-stack';
import {PlanetType} from '@root/screens/PlanetsScreen/types';
import {PeopleType} from '@root/screens/PlanetInfoScreen/types';
import {FilmType} from "../FilmsScreen/types";
import axios from 'axios';
import {Spinner} from '../../components/Spinner/Spinner'

export const PlanetInfoScreen: FC<NavigationStackScreenProps> = (props: NavigationStackScreenProps): ReactElement<NavigationStackScreenProps> => {
  const {navigation} = props;
  const planetData: PlanetType = navigation.state.params!.item;

  console.log('planetData:');
  console.log(planetData);
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
    loadData(planetData.films, planetData.residents);

    // return () => {
    // isMount = false;
    // };
  }, []);

  if (!isLoad) return <Spinner/>;


  const planetDataArr = Object.keys(planetData).map((key) => {
    if (',climate,diameter,gravity,population,terrain,'.indexOf(`,${key},`) !== -1) return [key, planetData[key]];
    else return null;
  }).filter(e => e !== null);
  console.log('322_1')
  console.log(planetDataArr);
  console.log(filmData);
  console.log('322_@')

  const filmsDataArr = Object.keys(filmData).map((key) => {
    // console.log(filmData);
    // console.log('key = ' + key);
    if (',episode_id,title,release_date,opening_crawl,'.indexOf(`,${key},`) !== -1) return [key, filmData[key]];
    else return null;
  }).filter(e => e !== null);
  // console.log('filmsDataArr');
  // console.log(filmsDataArr);

  const planetInfoData = [
    {
      title: 'Info',
      icon: 'infocirlceo',
      data: planetDataArr,
    },
    {
      title: 'Films',
      icon: 'eyeo',
      data: filmData,
    },
    {
      title: 'Residents',
      icon: 'meh',
      data: [],
    },
  ];

  return <PlanetInfoView planetInfoData={planetInfoData} planetInfo={planetData} filmsInfo={filmData}
                         residentsInfo={residentsData}/>;
};
