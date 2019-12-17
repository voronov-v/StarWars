import React, {FC, ReactElement, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {View, Text, ListRenderItemInfo, TouchableOpacity, Button} from 'react-native';
import {FilmsScreenView} from './FilmsScreenView';
import {FilmType, RenderItem} from './types';
import {NavigationStackScreenProps} from 'react-navigation-stack';
import {styles} from "./styles";
import {Spinner} from "../../components/Spinner/Spinner";
import {LOAD_FILMS} from "../../redux/reducers/filmsReducer";
import {getFilms} from "../../selectors/";

export const FilmsScreen: FC<NavigationStackScreenProps> = (props: NavigationStackScreenProps): ReactElement<NavigationStackScreenProps> => {
  const {navigation} = props;

  const dispatch = useDispatch();
  const films = useSelector(getFilms);
  const {loading, filmsList, errMsg} = films;

  console.log('filmsReducer', films);
  console.log('filmsList', filmsList);

  useEffect(() => {
    dispatch({type: LOAD_FILMS})
  } , []);

  const renderItem: RenderItem = ({item}: ListRenderItemInfo<FilmType>): ReturnType<RenderItem> => {
    const onPress = () => {
      // navigation.navigate('PlanetInfo', {item});
      console.log('navigate to film desc');
      console.log(navigation);
    };

    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.item}>
          <Text style={styles.title}>Episode {item.episode_id}: {item.title}</Text>
          <Text>created by: {item.director}</Text>
          <Text>{item.release_date.substr(0, 4)}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const keyExtractor = (item: FilmType) => item.url;

  if (loading) return <Spinner/>;
  if (errMsg !== "") return (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <Text>error: {errMsg}</Text>
      <Button title={'load films'} onPress={() => dispatch({type: LOAD_FILMS})}/>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headText}>Chose your film:</Text>
      <FilmsScreenView data={filmsList} renderItem={renderItem} keyExtractor={keyExtractor}/>
    </View>
  );
};
