import React, {FC, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {BottomSheetModal} from '@gorhom/bottom-sheet';

import {SearchListingScreenProps} from './interface';
import SearchListItem from './component/SearchListItem';
import {COLORS, FONT, IMAGES} from '../../utils/theme';
import {
  CalendarTimePicker,
  CustomImage,
  CustomText,
  CustomWrapper,
  GooglePlacesInput,
  Row,
} from '../../components';
import EmptyScreen from '../../components/EmptyScreen';
import {useUserCar} from '../../hooks/useUserCar';
import Filters from './component/Filters';
import {formatDate} from '../../utils/dayjs';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import SearchScreenSkeleton from '../../components/Skeleton/SearchScreenSkeleton';

const SearchListingScreen: FC<SearchListingScreenProps> = ({
  showMapView,
  isFocused,
}) => {
  const params = useRoute().params || {};
  const navigation = useNavigation();

  const [filters, setFilters] = useState({
    vehicle_type: null,
    features: [],
    minimum_seats: 2,
    total_price: null,
    less_than_five_years: false,
    gearbox: null,
    engine_type: null,
    brand: null,
  });
  const calenderBottomSheetRef = useRef<BottomSheetModal>(null);
  const googlePlaceAutoCompleteRef = useRef<any>();

  const [date, setDate] = useState({start: '', end: ''});
  const [time, setTime] = useState({start: '', end: ''});
  const [location, setLocation] = useState('');
  const [applySearchFilter, setApplySearchFilter] = useState(1);
  const [clear, setClear] = useState(false);
  const [displayPrice, setDisplayPrice] = useState(0);

  const {getUserCars, getUserCarsLoading} = useUserCar({
    address: location || undefined,
    start_date_time: date.end
      ? `${formatDate(date.start, 'YYYY-MM-DD')}${
          time.start ? `T${formatDate(time.start, 'HH:mm:ss')}` : ''
        }`
      : undefined,
    end_date_time: date.end
      ? `${formatDate(date.end, 'YYYY-MM-DD')}${
          time.end ? `T${formatDate(time.end, 'HH:mm:ss')}` : ''
        }`
      : undefined,
    ...filters,
    applyFilter: applySearchFilter,
  });

  const data = getUserCars.data?.pages[0]?.data?.cars;

  const HandleContinue = () => {
    calenderBottomSheetRef.current?.close();
  };
  let isLocation = location || clear;
  let isFilteredApplied = JSON.parse(JSON.stringify(filters));
  isFilteredApplied?.minimum_seats < 3 &&
    delete isFilteredApplied?.minimum_seats;
  isFilteredApplied?.features?.length < 1 && delete isFilteredApplied?.features;
  isFilteredApplied =
    Object.values(isFilteredApplied).filter(Boolean).length ||
    date.start ||
    date.end ||
    time.start ||
    time.end ||
    isLocation;
  const HandleClearFilter = () => {
    setFilters({
      vehicle_type: null,
      features: [],
      minimum_seats: 2,
      total_price: null,
      less_than_five_years: false,
      gearbox: null,
      engine_type: null,
      brand: null,
    });
    setDisplayPrice(0);
    setDate({start: '', end: ''});
    setTime({start: '', end: ''});
    setLocation('');
    googlePlaceAutoCompleteRef.current?.setAddressText('');
    setApplySearchFilter(Math.floor(Math.random() * 52));
    setClear(false);
  };

  const HandleApplyFilter = () => {
    setApplySearchFilter(Math.floor(Math.random() * 52));
    setClear(true);
  };

  useEffect(() => {
    if (params?.data?.location) {
      googlePlaceAutoCompleteRef.current?.setAddressText(
        params?.data?.location,
      );
      setLocation(params?.data?.location);
    }
    if (params?.data?.date) {
      setDate({
        start: params?.data?.date?.start,
        end: params?.data?.date?.end,
      });
    }
    if (params?.data?.time) {
      setTime({
        start: params?.data?.time?.start,
        end: params?.data?.time?.end,
      });
    }
    setApplySearchFilter(Math.floor(Math.random() * 52));
    setClear(true);
    if (!params?.data?.location && !params?.data?.date) {
      setClear(false);
    }
  }, [params?.data?.location, params?.data?.date]);

  const ListEmptyComponent = () =>
    !getUserCarsLoading && (
      <EmptyScreen
        image={IMAGES.carIcon}
        title="Oups, aucune voiture trouvée. Essayez d’ajuster votre recherche"
        btnOnPress={() => {}}
        imageContainerStyle={{
          marginTop: widthPercentageToDP(10),
        }}
      />
    );

  return (
    <CustomWrapper padding backgroundColor={COLORS.white} bottomInsert={-1}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always">
        <View style={{minHeight: widthPercentageToDP(14)}}>
          <GooglePlacesInput
            inputRef={googlePlaceAutoCompleteRef}
            value={location}
            setAddress={e => {
              setLocation(e);
            }}
          />
        </View>
        <CalendarTimePicker
          calenderBottomSheetRef={calenderBottomSheetRef}
          handleContinue={HandleContinue}
          date={date}
          time={time}
          setDate={setDate}
          setTime={setTime}
        />
        <Filters
          HandleClearFilter={HandleClearFilter}
          HandleApplyFilter={HandleApplyFilter}
          filters={filters}
          setFilters={setFilters}
          displayPrice={displayPrice}
          setDisplayPrice={setDisplayPrice}
        />
        {!!isFilteredApplied && (
          <Row justifyContent="space-between">
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={HandleClearFilter}>
                <CustomText
                  text="Réinitialiser les filtres"
                  fontWeightInter="600"
                  fontSize="S12"
                  textStyle={styles.buttonText}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buttonTwo}
                onPress={HandleApplyFilter}>
                <CustomText
                  text="APPLIQUER LES FILTRES"
                  fontWeightPopins="600"
                  fontSize="S12"
                  textStyle={styles.buttonTextTwo}
                />
              </TouchableOpacity>
            </View>
          </Row>
        )}
        {getUserCarsLoading ? (
          <View style={styles.loaderContainer}>
            <View style={{}}>
              {[1, 2, 3]?.map(i => (
                <View key={i} style={{paddingVertical: RFValue(4)}}>
                  <SearchScreenSkeleton />
                </View>
              ))}
            </View>
          </View>
        ) : (
          <FlatList
            data={data}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainerStyle}
            renderItem={({item}) => {
              return (
                <SearchListItem
                  {...item}
                  getUserCarsLoading={getUserCarsLoading}
                />
              );
            }}
            ListEmptyComponent={ListEmptyComponent}
          />
        )}
      </ScrollView>
      <CustomImage
        source={IMAGES.mapBadge}
        containerStyle={styles.mapBadge}
        onPressImage={showMapView}
      />
      {/* </>
      )} */}
    </CustomWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  contentContainerStyle: {
    paddingBottom: widthPercentageToDP(30),
  },
  title: {
    paddingVertical: widthPercentageToDP(3),
    fontFamily: FONT.poppins600,
    fontWeight: '600',
    fontSize: RFValue(20),
  },

  mapBadge: {
    position: 'absolute',
    right: widthPercentageToDP(35),
    bottom: widthPercentageToDP(26),
    height: widthPercentageToDP(20),
    width: widthPercentageToDP(30),
  },
  loaderContainer: {
    // minHeight: widthPercentageToDP(52),
    // justifyContent: 'center',
  },

  clearFilter: {
    backgroundColor: '#237fdbff', // Tailwind gray-50
    paddingVertical: 8,
    margin: 10,
    paddingHorizontal: 16,
    borderRadius: 100,
    color: '#374151', // Tailwind gray-700 text color for contrast
    textAlign: 'center',
  },
  applyFilter: {
    backgroundColor: '#F9FAFB', // Tailwind gray-50
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 100,
    color: '#374151', // Tailwind gray-700
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    margin: 20,
    gap: 5, // space between buttons, supported on React Native 0.71+, else use margin
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#f3f4f6', // Tailwind gray-100
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonTwo: {
    backgroundColor: COLORS.newprimary, // keeps your original color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },

  buttonText: {
    fontSize: 10,
    color: '#181717ff', // Tailwind gray-700
    textAlign: 'center',
  },
  buttonTextTwo: {
    fontSize: 10,
    color: '#ffffffff', // Tailwind gray-700
    textAlign: 'center',
  },
});

export default SearchListingScreen;
