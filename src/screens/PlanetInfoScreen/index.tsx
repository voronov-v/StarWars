import React, { FC, ReactElement, useEffect, useState } from 'react';
import { PlanetInfoView } from './PlanetInfoView';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { PlanetType } from '../PlanetsScreen/types';
import { PeopleType } from './types';
import { FilmType } from '../FilmsScreen/types';
import axios from 'axios';
import { Spinner } from '../../components/Spinner/Spinner';
import { FilmInfo } from './FilmInfo/FilmInfo';
import { ResidentInfo } from './ResidentInfo/ResidentInfo';
import { Text, View } from 'react-native';
import { styles } from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import { colors } from '../../consts/themes';

export const PlanetInfoScreen: FC<NavigationStackScreenProps> = (props: NavigationStackScreenProps): ReactElement<NavigationStackScreenProps> => {
  const { navigation } = props;
  const planetData: PlanetType = navigation.getParam('planetData');
  console.log('planetData', planetData);
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [filmData, setFilmData] = useState<FilmType[]>([]);
  const [residentsData, setResidentsData] = useState<PeopleType[]>([]);

  useEffect(() => {
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

  }, []);

  if (!isLoad) return <Spinner/>;

  const planetInfoData = [
    { title: 'Films', icon: 'eyeo', data: filmData },
    { title: 'Residents', icon: 'meh', data: residentsData },
  ];

  const keyExtractros = (item: FilmType | PeopleType) => {
    return item.url;
  };

  const renderItem = ({ item }: any) => {
    if (item.episode_id) return <FilmInfo item={item}/>;
    else return <ResidentInfo item={item}/>;
  };

  const renderSectionHeader = ({ section: { title, icon } }: any) => {
    return <Icon style={styles.containerIcon} name={icon} size={30} color={colors.pink}> {title}</Icon>;
  };

  const listHeaderComponent = () => {
    return (
      <>
        <View style={styles.containerHead}>
          <Icon name={'dribbble'} size={40} color={colors.pink}> {planetData.name}</Icon>
        </View>
        <View>
          <Icon style={styles.containerIcon} name={'infocirlceo'} size={30} color={colors.pink}> Info</Icon>
          <Text style={styles.textBoldMd}>climate: {planetData.climate}</Text>
          <Text style={styles.textBoldMd}>diameter: {planetData.diameter}</Text>
          <Text style={styles.textBoldMd}>gravity: {planetData.gravity}</Text>
          <Text style={styles.textBoldMd}>population: {planetData.population}</Text>
          <Text style={styles.textBoldMd}>terrain: {planetData.terrain}</Text>
        </View>
      </>
    );
  };

  return <PlanetInfoView sections={planetInfoData}
                         planetInfo={planetData}
                         keyExtractros={keyExtractros}
                         renderSectionHeader={renderSectionHeader}
                         listHeaderComponent={listHeaderComponent}
                         renderItem={renderItem}/>;
};
