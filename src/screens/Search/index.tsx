import Geolocation from '@react-native-community/geolocation';
import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Linking, PermissionsAndroid, Platform, View} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {InfoModal} from '../../components';
import useUserStore from '../../service/store/user.store';
import {IMAGES} from '../../utils/theme';
import MapViewScreen from './MapViewScreen';
import SearchListingScreen from './SearchListing';

const SearchScreen = () => {
  const [mapView, setMapView] = useState(false);
  const isFocused = useIsFocused();
  const [userRegion, setUserRegion] = useState({
    latitude: 48.864716,
    longitude: 2.349014,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [showEnableLocation, setShowEnableLocation] = useState(false);
  const {userDetails} = useUserStore();
  const handlePermission = async () => {
    if (!userDetails) return;
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission denied');
        setShowEnableLocation(true);
        return null;
      }
    }
  };

  useEffect(() => {
    handlePermission();
  }, []);

  const getCoords = () => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(resolve, reject);
    });
  };

  const getCurrentPosition = async () => {
    if (!userDetails) return;

    try {
      const res: any = await getCoords();

      setUserRegion({
        latitude: res?.coords?.latitude,
        longitude: res?.coords?.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });

      return {lat: res?.coords?.latitude, long: res?.coords?.longitude};
    } catch (err) {
      console.log({err});
      setUserRegion({
        latitude: 48.864716,
        longitude: 2.349014,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  };

  useEffect(() => {
    if (isFocused) {
      getCurrentPosition();
    }
  }, [isFocused]);

  return (
    <View style={{flex: 1}}>
      {mapView ? (
        <MapViewScreen
          userRegion={userRegion}
          showListView={() => setMapView(false)}
        />
      ) : (
        <SearchListingScreen
          showMapView={() => setMapView(true)}
          isFocused={isFocused}
        />
      )}

      {showEnableLocation && (
        <InfoModal
          maxHeight={widthPercentageToDP(70)}
          isVisible={showEnableLocation}
          title="Enable Location"
          description="Enable location to see car near you"
          iconImage={IMAGES.locationSpark}
          iconStyle={{
            width: widthPercentageToDP(15),
            height: widthPercentageToDP(15),
          }}
          btnText="Allow"
          btnOnPress={() => {
            Linking.openSettings();
            setTimeout(() => {
              setShowEnableLocation(false);
            }, 3000);
          }}
          secondaryBtnText="Deny"
          secondaryBtnOnPress={() => {
            setShowEnableLocation(false);
          }}
        />
      )}
    </View>
  );
};

export default SearchScreen;
