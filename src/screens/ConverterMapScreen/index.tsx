import React, { ReactElement, useEffect, useState } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import MapView, { Circle, Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { styles } from './styles';
import { debounce } from 'lodash';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';
import { gPlaceType } from '@root/screens/ConverterMapScreen/types';
import { PermissionsAndroid } from 'react-native';
//@ts-ignore
import { GOOGLE_MAP_API_KEY } from 'react-native-dotenv';

export async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      //@ts-ignore
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Example App',
        message: 'Example App access to your location ',
      },
    );
    console.log('granted', granted);
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the location');
    } else {
      console.log('location permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}

export const ConverterMapScreen = () => {
  const minskRegion = {
    longitude: 27.600363940000534,
    latitude: 53.896797825905956,
    longitudeDelta: 0.05,
    latitudeDelta: 0.05,
  };

  const [region, setRegion] = useState<Region>(minskRegion);
  const [initCurrPosition, setInitCurrPosition] = useState(false);
  const [markers, setMarkers] = useState<ReactElement[]>([]);

  useEffect(() => {
    const getLocation = async () => {
      try {
        await requestLocationPermission();
        await Geolocation.getCurrentPosition((info) => {
          console.log('getCurrentPosition info', info);
          setRegion({ ...region, latitude: info.coords.latitude, longitude: info.coords.longitude });
          setInitCurrPosition(true);
        });
      } catch (e) {
        console.log('error', e);
      }
    };
    getLocation();
  }, []);

  const onRegionChange = debounce((region: Region) => {
    console.log('delta', region.latitudeDelta);
    setRegion(region);
  }, 200);

  const round4 = (number: number) => {
    return Math.round(number * 10000) / 10000;
  };

  const loadMarkers = async (type: string) => {
    const radius = 750;

    const response = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?', {
      params: {
        location: `${region.latitude},${region.longitude}`,
        radius: radius,
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
      {initCurrPosition && (
        <>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={region}
            region={region}
            onRegionChange={onRegionChange}
            showsUserLocation={true}
          >
            {markers}
            <Circle radius={750} center={{ latitude: region.latitude, longitude: region.longitude }} />
          </MapView>
          <TouchableOpacity style={{ ...styles.btn, ...styles.btnHome }} onPress={() => setRegion(minskRegion)}>
            <Text style={styles.btnText}>Home</Text>
          </TouchableOpacity>

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
