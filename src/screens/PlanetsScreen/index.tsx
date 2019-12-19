import React, {FC, ReactElement, useEffect} from 'react';
import {View, Text, ListRenderItemInfo, TouchableOpacity, Button} from 'react-native';
import {PlanetsScreenView} from './PlanetsScreenView';
import {PlanetType, RenderItem} from './types';
import {styles} from './styles';
import {NavigationStackScreenProps} from 'react-navigation-stack';
import {Spinner} from "../../components/Spinner/Spinner";
import {useDispatch, useSelector} from "react-redux";
import {getPlanets} from "../../selectors";
import {LOAD_PLANETS} from "../../redux/reducers/planetsReducer";
import {useTranslation} from "react-i18next";

export const PlanetsScreen: FC<NavigationStackScreenProps> = (props: NavigationStackScreenProps): ReactElement<NavigationStackScreenProps> => {
  const {navigation} = props;
  const {t} = useTranslation('planetsScreen');

  const dispatch = useDispatch();
  const planets = useSelector(getPlanets);
  const {loading, planetsList, errMsg} = planets;

  useEffect(() => {
    dispatch({type: LOAD_PLANETS})
  }, []);

  const renderItem: RenderItem = ({item}: ListRenderItemInfo<PlanetType>): ReturnType<RenderItem> => {
    const onPress = () => {
      navigation.navigate('PlanetInfo', {planetData: item});
    };

    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.item}>
          <Text style={styles.title}>{item.name}</Text>
          <Text>{t('population')} {item.population}</Text>
          <Text>{t('climate')} {item.climate}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const keyExtractor = (item: PlanetType) => item.url+item.name;

  if (errMsg !== "") return (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <Text>error: {errMsg}</Text>
      <Button title={'load films'} onPress={() => dispatch({type: LOAD_PLANETS})}/>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headText}>{t('headTitle')}</Text>
      <PlanetsScreenView data={planetsList} renderItem={renderItem} keyExtractor={keyExtractor}/>
      {loading ? <Spinner/> : null}
    </View>
  );
};
