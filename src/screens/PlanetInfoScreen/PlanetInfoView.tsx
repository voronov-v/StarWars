import React, { FC } from 'react';
import {View, Text, FlatList, ListRenderItemInfo} from 'react-native';
import { IProps, PeopleType, PlanetInfoViewProps, RenderItemFilm, RenderItemPeople } from './types';
import { FilmType} from "../FilmsScreen/types";
import { styles } from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import { FilmInfo } from './FilmInfo/FilmInfo';
import { ResidentInfo } from './ResidentInfo/ResidentInfo';

export const WhiteTextBold = ({ children }: IProps) => {
  return <Text style={{ color: '#e8be2b', fontSize: 18, fontWeight: 'bold' }}>{children}</Text>;
};

export const WhiteText = ({ children }: IProps) => {
  return <Text style={{ color: '#e8be2b', fontSize: 16 }}>{children}</Text>;
};

export const PlanetInfoView: FC<PlanetInfoViewProps> = (props: PlanetInfoViewProps) => {
  const { planetInfo, filmsInfo, residentsInfo } = props;

  const renderItemFilm: RenderItemFilm = ({ item }: ListRenderItemInfo<FilmType>): ReturnType<RenderItemFilm> => {
    return <FilmInfo item={item}/>;
  };

  const renderItemResident: RenderItemPeople = ({ item }: ListRenderItemInfo<PeopleType>): ReturnType<RenderItemPeople> => {
    return <ResidentInfo item={item}/>;
  };

  const created = new Date(Date.parse(planetInfo.created)).toLocaleDateString();

  return <View style={styles.container}>
    <View style={styles.containerHead}>
      <Icon name={'dribbble'} size={40} color={'#e91e63'}> {planetInfo.name}</Icon>
      <WhiteTextBold>created in {created}</WhiteTextBold>
    </View>

    <View>
      <View style={styles.containerIcon}>
        <Icon name={'infocirlceo'} size={30} color={'#e91e63'}> Info</Icon>
      </View>
      <View style={styles.containerInfo}>
        <WhiteTextBold>climate: {planetInfo.climate}</WhiteTextBold>
        <WhiteTextBold>diameter: {planetInfo.diameter}</WhiteTextBold>
        <WhiteTextBold>gravity: {planetInfo.gravity}</WhiteTextBold>
        <WhiteTextBold>population: {planetInfo.population}</WhiteTextBold>
        <WhiteTextBold>terrain: {planetInfo.terrain}</WhiteTextBold>
      </View>
    </View>

    <View>
      <View style={styles.containerIcon}>
        <Icon name={'eyeo'} size={30} color={'#e91e63'}> Films</Icon>
      </View>
      <FlatList data={filmsInfo}
                renderItem={renderItemFilm}
                keyExtractor={item => item.url}/>
    </View>

    <View>
      <View style={styles.containerIcon}>
        <Icon name={'meh'} size={30} color={'#e91e63'}> Residents</Icon>
      </View>
      <FlatList data={residentsInfo}
                renderItem={renderItemResident}
                keyExtractor={item => item.url}/>
    </View>
  </View>;
};
