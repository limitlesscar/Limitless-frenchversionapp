import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';

import SectionHeading from '../SectionHeading';
import PopularVehiclesCard from '../PopularVehiclesCard';
import {COLORS, IMAGES} from '../../../../utils/theme';
import {RoundedBadge} from '../../../../components';
import {useUserCar} from '../../../../hooks/useUserCar';
import EmptyScreen from '../../../../components/EmptyScreen';
import {VEHICLE_TYPES} from '../../../../utils/constants';
import useUserStore from '../../../../service/store/user.store';
import {useIsFocused} from '@react-navigation/native';
import {RFValue} from 'react-native-responsive-fontsize';
import HomeScreenSkeleton from '../../../../components/Skeleton/HomeScreenSkeleton';

const PopularVehicles = () => {
  const [activeBadge, setActiveBadge] = React.useState('All');
  const [applyFilter, setApplyFilter] = React.useState(false);

  const {getUserCars, getUserCarsLoading} = useUserCar({
    vehicle_type: activeBadge === 'All' ? undefined : activeBadge,
    applyFilter: applyFilter,
  });

  const data = getUserCars.data?.pages[0]?.data?.cars;

  const isFocused = useIsFocused();

  useEffect(() => {
    setApplyFilter(prev => !prev);
  }, [isFocused]);
  const ListEmptyComponent = () =>
    !getUserCarsLoading && (
      <View style={styles.emptyScreenContainer}>
        <EmptyScreen
          image={IMAGES.carIcon}
          title="Aucun véhicule populaire pour le moment"
          btnOnPress={() => {}}
          flex={1}
          imageContainerStyle={styles.emptyImageContainerStyle}
        />
      </View>
    );

  const ItemSeparatorComponent = () => {
    return <View style={styles.separator} />;
  };
  return (
    <View>
      <SectionHeading heading="Véhicules populaires " />
      <>
        <View style={styles.popularBadgeContainer}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={VEHICLE_TYPES.map(item => item?.label)}
            renderItem={({item}) => (
              <RoundedBadge
                title={item}
                activeBadge={activeBadge}
                setActiveBadge={active => {
                  setApplyFilter(prev => !prev);
                  setActiveBadge(active);
                }}
              />
            )}
            ItemSeparatorComponent={() => ItemSeparatorComponent()}
          />
        </View>
        {getUserCarsLoading ? (
          <View style={styles.loaderContainer}>
            <View style={{flexDirection: 'row', gap: RFValue(3)}}>
              {[1, 2, 3]?.map(i => (
                <View key={i} style={{paddingVertical: RFValue(4)}}>
                  <HomeScreenSkeleton />
                </View>
              ))}
            </View>
          </View>
        ) : (
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={data}
            renderItem={({item}) => (
              <PopularVehiclesCard
                {...item}
                getUserCarsLoading={getUserCarsLoading}
              />
            )}
            ItemSeparatorComponent={() => ItemSeparatorComponent()}
            ListEmptyComponent={ListEmptyComponent}
          />
        )}
      </>
    </View>
  );
};

export default PopularVehicles;

const styles = StyleSheet.create({
  separator: {width: widthPercentageToDP(2.5)},
  popularBadgeContainer: {
    paddingTop: widthPercentageToDP(2),
    paddingBottom: widthPercentageToDP(6),
  },
  emptyScreenContainer: {
    width: widthPercentageToDP(95),
  },
  loaderContainer: {
    minHeight: widthPercentageToDP(52),
    justifyContent: 'center',
  },
  emptyImageContainerStyle: {
    marginBottom: widthPercentageToDP(-4),
  },
});
