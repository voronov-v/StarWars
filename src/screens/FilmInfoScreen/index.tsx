import React, {FC, ReactElement} from 'react';
import {NavigationStackScreenProps} from 'react-navigation-stack';
import {FilmType} from "@root/screens/FilmsScreen/types";
import {StarWars} from '@root/components/StarWars';

export const FilmInfoScreen: FC<NavigationStackScreenProps> = (props: NavigationStackScreenProps): ReactElement<NavigationStackScreenProps> => {
  const {navigation} = props;
  const filmData: FilmType = navigation.getParam('filmData');
  console.log('filmData', filmData);

  return <StarWars episode={filmData.episode_id} title={filmData.title} content={filmData.opening_crawl}/>
};
