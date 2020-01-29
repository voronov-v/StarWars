import React, { ReactElement, useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, Platform } from 'react-native';
import MapView, { Circle, Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { styles } from './styles';
import { debounce } from 'lodash';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';
import { gPlaceType } from '@root/screens/ConverterMapScreen/types';
//@ts-ignore
import { GOOGLE_MAP_API_KEY } from 'react-native-dotenv';
import { requestLocationPermission } from '@root/screens/ConverterMapScreen/services';

export const ConverterMapScreen = () => {
  const [region, setRegion] = useState<Region>({
    latitude: 0,
    longitude: 0,
    longitudeDelta: 0,
    latitudeDelta: 0,
  });
  const [markers, setMarkers] = useState<ReactElement[]>([]);
  const markerRadius = 750;

  useEffect(() => {
    const getLocation = async () => {
      try {
        Platform.OS === 'android' && (await requestLocationPermission());
        await Geolocation.getCurrentPosition((info) => {
          console.log('getCurrentPosition info', info);
          const { latitude, longitude } = info.coords;
          setRegion({ latitude, longitude, latitudeDelta: 0.05, longitudeDelta: 0.05 });
        });
      } catch (e) {
        console.log('error', e);
      }
    };
    getLocation();
  }, []);

  const onRegionChange = debounce((region: Region) => {
    setRegion(region);
  }, 200);

  const round4 = (number: number) => Math.round(number * 10000) / 10000;

  const loadMarkers = async (type: string) => {
    const response = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?', {
      params: {
        location: `${region?.latitude},${region?.longitude}`,
        radius: markerRadius,
        type: type,
        key: GOOGLE_MAP_API_KEY,
      },
    });
    if (response.status === 200) {
      const places: gPlaceType[] = response.data.results;
      console.log('places', places);

      const markersArr = places.map((place) => {
        return (
          <Marker
            key={place.id}
            title={place.name}
            description={`ADDRESS:${place.vicinity}.\nOPEN:${place.opening_hours?.open_now ? 'YES' : 'NO INFO'}.`}
            coordinate={{
              latitude: place.geometry.location.lat,
              longitude: place.geometry.location.lng,
            }}
          />
        );
      });
      console.log('markersArr', markersArr);
      setMarkers(markersArr);
    } else {
      console.log('response', response);
    }
  };

  return (
    <View style={styles.container}>
      {region.latitude !== 0 && (
        <>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={region}
            region={region}
            onRegionChange={onRegionChange}
            showsUserLocation={true}
            showsMyLocationButton={true}
          >
            {markers}
            <Circle radius={markerRadius} center={{ latitude: region.latitude, longitude: region.longitude }} />
          </MapView>
          <TouchableOpacity style={{ ...styles.btn, ...styles.btnLoad }} onPress={() => loadMarkers('bank')}>
            <Text style={styles.btnText}>Load banks</Text>
          </TouchableOpacity>
          <View style={{ ...styles.btn, ...styles.btnCoordinates }}>
            <Text style={styles.btnText}>{`${round4(region.latitude)}, ${round4(region.longitude)} `}</Text>
          </View>
        </>
      )}
    </View>
  );
};
