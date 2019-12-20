import React, {FC, ReactElement, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {View, Text, ListRenderItemInfo, TouchableOpacity} from 'react-native';
import {FilmsScreenView} from './FilmsScreenView';
import {FilmType, RenderItem} from './types';
import {NavigationStackScreenProps} from 'react-navigation-stack';
import {styles} from "./styles";
import {Spinner} from "../../components/Spinner/Spinner";
import {LOAD_FILMS} from "../../redux/reducers/filmsReducer";
import {getFilms, getIsDarkMode} from "../../selectors/";
import {useTranslation} from "react-i18next";
import {themeType} from "@root/redux/reducers/settingsReducer";
import {DARK_THEME, PRIMARY_THEME} from "@root/consts/themes";
import {ErrorView} from "@root/components/ErrorView";

export const FilmsScreen: FC<NavigationStackScreenProps> = (props: NavigationStackScreenProps): ReactElement<NavigationStackScreenProps> => {
  const {navigation} = props;
  const {t} = useTranslation('filmsScreen');
  const dispatch = useDispatch();

  const isDarkMode: boolean = useSelector(getIsDarkMode);
  const theme: themeType = isDarkMode ? DARK_THEME : PRIMARY_THEME;
  const [textColor, bgColor, primary] = [theme.ON_BACKGROUND, theme.BACKGROUND, theme.PRIMARY];

  const films = useSelector(getFilms);
  const {loading, filmsList, errMsg} = films;
  console.log('filmsReducer', films);
  console.log('filmsList', filmsList);

  useEffect(() => {
    dispatch({type: LOAD_FILMS, payload: filmsList})
  }, []);

  const renderItem: RenderItem = ({item}: ListRenderItemInfo<FilmType>): ReturnType<RenderItem> => {
    const onPress = () => {
      // navigation.navigate('PlanetInfo', {item});
      console.log('navigate to film desc', item, navigation);
    };

    return (
      <TouchableOpacity onPress={onPress}>
        <View style={{...styles.item}}>
          <Text style={{...styles.title, color: primary}}>{t('episode')} {item.episode_id}: {item.title}</Text>
          <Text style={{color: primary}}>{t('createdBy')}: {item.director}</Text>
          <Text style={{color: primary}}>{item.release_date.substr(0, 4)}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const keyExtractor = (item: FilmType) => item.url;

  if (loading) return <Spinner/>;

  if (errMsg !== "") return <ErrorView errMsg={errMsg} dispatch={() => dispatch({type: LOAD_FILMS})} reloadMsg={'Load Films!'}/>;

  return (
    <View style={{...styles.container, backgroundColor: bgColor}}>
      <Text style={{...styles.headText, color: textColor}}>{t('headTitle')}</Text>
      <FilmsScreenView data={filmsList} renderItem={renderItem} keyExtractor={keyExtractor}/>
    </View>
  );
};
