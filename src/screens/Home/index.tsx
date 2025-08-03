import React, {useEffect, useRef, useState} from 'react';
import {
  CalendarTimePicker,
  CustomButton,
  CustomImage,
  CustomWrapper,
  GooglePlacesInput,
} from '../../components';
import {AssistanceSection, HomeHeader, PopularVehicles} from './components';
import BoxHome from '../../components/box/BoxHome';

import {COLORS, IMAGES} from '../../utils/theme';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {
  Dimensions,
  ImageStyle,
  RefreshControl,
  ScrollView,
  StyleProp,
  Text,
} from 'react-native';
import MMKVStorage from '../../utils/MMKVStorage';
import {navigate} from '../../utils/navigation';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {useUserCar} from '../../hooks/useUserCar';
import useUserStore from '../../service/store/user.store';
import {useIsFocused} from '@react-navigation/native';
import {useLocation} from '../../hooks/useLocation';
import {getUserLocation} from '../../utils/helper';
import {set} from 'react-native-reanimated';
import {TouchableOpacity} from 'react-native-gesture-handler';

const HomeScreen = () => {
  // Variables
  const focus = useIsFocused();

  const {saveUserLocation} = useLocation();
  const calenderBottomSheetRef = useRef<BottomSheetModal>(null);
  const [location, setLocation] = useState('');

  const [date, setDate] = useState({start: '', end: ''});
  const [time, setTime] = useState({start: '', end: ''});
  const [refreshing, setRefreshing] = useState(false);

  const googlePlaceAutoCompleteRef = useRef<any>();

  // Functions
  const HandleContinue = () => {
    calenderBottomSheetRef.current?.close();
  };

  const handleRefreshLocation = async () => {
    if (refreshing) return;
    setRefreshing(true);
    await handleLocation();
    setRefreshing(false);
  };

  const handleLocation = async () => {
    try {
      const res = await getUserLocation();
      if (res?.lat) {
        saveUserLocation({
          location: {
            lat: Number(res?.lat),
            long: Number(res?.lng),
          },
        });
      } else {
        saveUserLocation({
          location: {
            lat: undefined,
            long: undefined,
          },
        });
      }
    } catch (error) {
      console.log('Error fetching location:', error);
    }
  };

  // UseEffects
  useEffect(() => {
    googlePlaceAutoCompleteRef.current?.setAddressText('');
    setDate({start: '', end: ''});
    setTime({start: '', end: ''});
  }, [focus]);
  const HandleFindCars = () => {
    let payload = {
      location: googlePlaceAutoCompleteRef?.current?.getAddressText(),
      date: {
        start: '',
        end: '',
      },
      time: {
        start: '',
        end: '',
      },
    };
    if (date.end) {
      payload.date.start = String(date.start);
      payload.date.end = String(date.end);
    }
    if (time.end) {
      payload.time.start = String(time.start);
      payload.time.end = String(time.end);
    }
    navigate('Search', {
      data: payload,
    });
  };
  useEffect(() => {
    const checkOnboardingStatus = async () => {
      const onboardingStatus = await MMKVStorage.getItem('hasSeenOnboarding');
      console.log('onboardingStatus on home', onboardingStatus);
    };
    checkOnboardingStatus();
    handleLocation();
  }, []);
  return (
    <CustomWrapper padding backgroundColor={COLORS.white}>
      <HomeHeader />
      <ScrollView
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => handleRefreshLocation()}
          />
        }>
        <GooglePlacesInput
          inputRef={googlePlaceAutoCompleteRef}
          value={location}
          setAddress={e => {
            setLocation(e);
          }}
        />
        <CalendarTimePicker
          calenderBottomSheetRef={calenderBottomSheetRef}
          handleContinue={HandleContinue}
          date={date}
          time={time}
          setDate={setDate}
          setTime={setTime}
        />
        {/* <CustomButton title="Find cars" onPress={HandleFindCars} />*/}

        <TouchableOpacity
          onPress={HandleFindCars}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            backgroundColor: '#4EBF86',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 200,
            width: 180,
            paddingVertical: 12,
          }}>
          <Text
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              color: 'white',
              fontSize: 14,
              fontWeight: 'bold',
            }}>
            Trouver des voitures
          </Text>
        </TouchableOpacity>

        {/*
          <CustomImage
            source={IMAGES.homeBanner1}
            style={styles.homeBanner as StyleProp<ImageStyle>}
            onPressImage={() => navigate('Search' as any)}
          />
        */}
        <BoxHome />
        <PopularVehicles />

        {/*  
        <CustomImage
          source={IMAGES.homeBanner2}
          style={styles.homeBanner as StyleProp<ImageStyle>}
          onPressImage={() => navigate('Hosting')}
        />
          */}

        <AssistanceSection />
      </ScrollView>
    </CustomWrapper>
  );
};

const styles = {
  homeBanner: {
    width: '100%',
    height: (Dimensions.get('screen').width / 1.7) * 0.692,
    marginVertical: widthPercentageToDP(6),
    zIndex: 1,
  },
  contentContainerStyle: {
    paddingBottom: widthPercentageToDP(30),
  },
};
export default HomeScreen;
