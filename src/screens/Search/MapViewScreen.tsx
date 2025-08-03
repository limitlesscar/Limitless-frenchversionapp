import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Linking,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {widthPercentageToDP} from 'react-native-responsive-screen';

import {CustomImage, InfoModal} from '../../components';
import {COLORS, IMAGES} from '../../utils/theme';
import Geolocation from '@react-native-community/geolocation';
import {useUserCar} from '../../hooks/useUserCar';
import SearchListItem from './component/SearchListItem';
import {PermissionsAndroid} from 'react-native';

interface MapViewScreenProps {
  showListView: () => void;
  userRegion: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
}

const MapViewScreen = ({showListView, userRegion}: MapViewScreenProps) => {
  const [showEnableLocation, setShowEnableLocation] = useState(false);
  const [carId, setCarId] = useState(null);
  const {getUserCarMap, getUserCarMapLoading} = useUserCar();
  const data = getUserCarMap?.data?.pages[0]?.data;

  const {getUserCarDetails, getUserCarDetailsLoading} = useUserCar({id: carId});
  let carDetails = getUserCarDetails?.data?.data?.car;

  console.log(data?.map(va => console.log({va})));
  const Markers = useCallback(() => {
    return data?.map(val => (
      <Marker
        onPress={() => setCarId(val.id)}
        key={val.id}
        coordinate={{
          latitude: val?.pickup_location?.lat,
          longitude: val?.pickup_location?.long,
        }}>
        <CustomImage
          source={IMAGES.mapCar}
          containerStyle={{height: 50, width: 50, zIndex: 999999}}
        />
      </Marker>
    ));
  }, [data]);

  const UserMarkers = useCallback(() => {
    return (
      <Marker
        coordinate={{
          latitude: userRegion?.latitude,
          longitude: userRegion?.longitude,
        }}>
        <CustomImage
          key={userRegion?.latitude}
          source={IMAGES.locationPin}
          containerStyle={{height: 50, width: 50, zIndex: 999999}}
        />
      </Marker>
    );
  }, []);

  // useEffect(() => {
  //   const handle = async () => {
  //     if (Platform.OS === 'android') {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //       );
  //       if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
  //         console.log('Location permission denied');
  //         setShowEnableLocation(true);
  //         return null;
  //       }
  //     }
  //   };
  //   handle();
  // }, []);

  return (
    <View style={styles.container}>
      <CustomImage
        source={IMAGES.back}
        containerStyle={styles.backImage}
        onPressImage={showListView}
      />
      {!!showEnableLocation && (
        <InfoModal
          maxHeight={widthPercentageToDP(70)}
          isVisible={showEnableLocation}
          //title="Enable Location"
          //description="Enable location to see car near you"
          title="Activer la localisation"
          description="Permettez la localisation pour afficher les voitures à proximité"
          iconImage={IMAGES.locationSpark}
          iconStyle={{
            width: widthPercentageToDP(15),
            height: widthPercentageToDP(15),
          }}
          btnText="Autoriser"
          //btnText="Allow"
          btnOnPress={() => {
            Linking.openSettings();
            setTimeout(() => {
              setShowEnableLocation(false);
            }, 3000);
          }}
          secondaryBtnText="Refuser"
          //secondaryBtnText="Deny"
          secondaryBtnOnPress={() => {
            setShowEnableLocation(false);
            showListView();
          }}
        />
      )}
      <MapView
        provider={PROVIDER_GOOGLE}
        loadingEnabled={true}
        style={styles.map}
        initialRegion={userRegion}
        region={{
          latitude: userRegion?.latitude,
          longitude: userRegion?.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Markers />

        <UserMarkers />
      </MapView>
      {!!carDetails?.id && (
        <View style={styles.mapCard}>
          {getUserCarDetailsLoading ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
          ) : (
            <SearchListItem
              {...carDetails}
              isMap={true}
              isButton={true}
              onClose={() => {
                setCarId('');
              }}
            />
          )}
        </View>
      )}
    </View>
  );
};

export default MapViewScreen;

const styles = StyleSheet.create({
  container: {flex: 1},
  backImage: {
    width: widthPercentageToDP(10),
    height: widthPercentageToDP(10),
    marginHorizontal: widthPercentageToDP(8),
    marginVertical: widthPercentageToDP(15),
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  mapCard: {
    position: 'absolute',
    width: '100%',
    paddingHorizontal: widthPercentageToDP(3),
    // right: widthPercentageToDP(5),
    bottom: widthPercentageToDP(30),
  },
  loaderContainer: {
    minHeight: widthPercentageToDP(52),
    width: widthPercentageToDP(80),
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
