import React from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import {CustomImage, CustomText, CustomWrapper} from '../../components';
import {COLORS, FONT, IMAGES} from '../../utils/theme';
import EmptyScreen from '../../components/EmptyScreen';
import CarItem from './components/CarItem';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';
import {navigate} from '../../utils/navigation';
import {useHostCar} from '../../hooks/useHostCar';
import SearchScreenSkeleton from '../../components/Skeleton/SearchScreenSkeleton';

const HostSignedin = () => {
  const {getHostCars, getHostCarsLoading} = useHostCar();
  let data = getHostCars?.data?.pages[0]?.data?.cars;
  const ListEmptyComponent = () =>
    !getHostCarsLoading && (
      <EmptyScreen
        image={IMAGES.addCarIcon}
        title="It looks empty here! You haven't published any car yet."
        btnOnPress={() => {}}
        imageContainerStyle={{
          height: widthPercentageToDP(30),
        }}
      />
    );
  return (
    <CustomWrapper padding bottomInsert={0.1} backgroundColor={COLORS.white}>
      <CustomText text="Gérer ma voiture" textStyle={styles.title} />
      {getHostCarsLoading ? (
        <View style={styles.loaderContainer}>
          <View style={{paddingVertical: RFValue(0)}}>
            {[1, 2, 3]?.map(i => (
              <View key={i}>
                <SearchScreenSkeleton />
              </View>
            ))}
          </View>
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          scrollEnabled={!!data?.length}
          contentContainerStyle={
            data?.length
              ? styles.contentContainerStyle
              : styles.contentContainerEmptyStyle
          }
          data={data}
          renderItem={({item}) => (
            <CarItem {...item} getHostCarsLoading={getHostCarsLoading} />
          )}
          ListEmptyComponent={ListEmptyComponent}
        />
      )}
      <CustomImage
        source={IMAGES.plusRoundIcon}
        containerStyle={styles.plusRoundIcon}
        onPressImage={() => navigate('PublishCar', {})}
      />
    </CustomWrapper>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingBottom: widthPercentageToDP(30),
  },
  contentContainerEmptyStyle: {
    paddingBottom: widthPercentageToDP(30),
    flex: 1,
  },
  title: {
    paddingVertical: widthPercentageToDP(3),
    fontFamily: FONT.poppins600,
    fontWeight: '600',
    fontSize: RFValue(20),
  },
  plusRoundIcon: {
    position: 'absolute',
    right: widthPercentageToDP(1),
    bottom: widthPercentageToDP(27),
    height: widthPercentageToDP(22),
    width: widthPercentageToDP(22),
  },
  loaderContainer: {flex: 0.8, justifyContent: 'center', alignItems: 'center'},
});

export default HostSignedin;
