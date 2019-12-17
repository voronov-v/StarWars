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

export const PlanetsScreen: FC<NavigationStackScreenProps> = (props: NavigationStackScreenProps): ReactElement<NavigationStackScreenProps> => {
  const {navigation} = props;

  const dispatch = useDispatch();
  const planets = useSelector(getPlanets);
  const {loading, planetsList, errMsg} = planets;

  console.log('planets', planets);
  console.log('planetsList', planetsList);

  useEffect(() => {
    dispatch({type: LOAD_PLANETS})
  }, []);

  const renderItem: RenderItem = ({item}: ListRenderItemInfo<PlanetType>): ReturnType<RenderItem> => {
    const onPress = () => navigation.navigate('PlanetInfo', {planetData: item});

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

  console.log('PlanetsScreen loadData');
  console.log(planetsList);

  if (errMsg !== "") return (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <Text>error: {errMsg}</Text>
      <Button title={'load films'} onPress={() => dispatch({type: LOAD_PLANETS})}/>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headText}>Choose your planet:</Text>
      <PlanetsScreenView data={planetsList} renderItem={renderItem} keyExtractor={keyExtractor}/>
      {loading ? <Spinner/> : null}
    </View>
  );
};
