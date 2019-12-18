import React, {FC, ReactElement, useEffect} from 'react';
import {PlanetInfoView} from './PlanetInfoView';
import {NavigationStackScreenProps} from 'react-navigation-stack';
import {PeopleType} from './types';
import {FilmType} from '../FilmsScreen/types';
import {Spinner} from '../../components/Spinner/Spinner';
import {FilmInfo} from './FilmInfo/FilmInfo';
import {ResidentInfo} from './ResidentInfo/ResidentInfo';
import {Button, SectionListRenderItem, Text, View} from 'react-native';
import {styles} from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import {colors} from '../../consts/themes';
import {useDispatch, useSelector} from "react-redux";
import {LOAD_PLANET_INFO} from "../../redux/reducers/planetsReducer";
import {getPlanets} from "../../selectors";

export const PlanetInfoScreen: FC<NavigationStackScreenProps> = (props: NavigationStackScreenProps): ReactElement<NavigationStackScreenProps> => {
  const {navigation} = props;
  const planetData = navigation.getParam('planetData');
  const {loading, planetsList, errMsg} = useSelector(getPlanets);
  console.log('PlanetInfoScreen planetsList:', planetsList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: LOAD_PLANET_INFO,
      payload: {...planetData}
    });
  }, []);

  if (loading) return <Spinner/>;

  if (errMsg !== "") return (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <Text>error: {errMsg}</Text>
      <Button title={'load films'} onPress={() => dispatch({
        type: LOAD_PLANET_INFO,
        payload: {...planetData}
      })}/>
    </View>
  );

  // @ts-ignore
  const {films, residents} = planetsList.find(e => e.name === planetData.name).planetInfo|| {films: [], residents: []};

  const planetInfoData = [
    {title: 'Films', icon: 'eyeo', data: films},
    {title: 'Residents', icon: 'meh', data: residents},
  ];

  const keyExtractros = (item: FilmType | PeopleType) => {
    return item.url;
  };

  const renderItem: SectionListRenderItem<FilmType | PeopleType> = ({item}) => {
    if (item.episode_id) return <FilmInfo item={item}/>;
    else return <ResidentInfo item={item}/>;
  };

  const renderSectionHeader = ({section: {title, icon}}: any) => {
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
