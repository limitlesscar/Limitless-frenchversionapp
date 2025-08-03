import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import React, {FC, useState} from 'react';
import {
  CustomHeader,
  CustomIcon,
  CustomRadioButtonGroup,
  CustomSlider,
  CustomText,
  RoundedBadge,
  Row,
} from '../../../../components';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {
  BRANDS,
  CAR_FEATURES,
  ENGINE_TYPES,
  GEAR_BOX,
  VEHICLE_TYPES,
} from '../../../../utils/constants';
import {COLORS} from '../../../../utils/theme';
import {RFValue} from 'react-native-responsive-fontsize';
import RecentCarsOnly from '../RecentCarsOnly';

interface AllFiltersProps {
  onBack: () => void;
  filters: any;
  setFilters: (e: Object) => void;
}

const AllFilters: FC<AllFiltersProps> = ({
  onBack,
  filters,
  setFilters,
  displayPrice,
  setDisplayPrice,
}) => {
  const HandlePressFeatures = (value: string) => {
    let features = filters?.features?.length ? [...filters?.features] : [];
    if (features.includes(value)) {
      features = features.filter((item: string) => item !== value);
    } else {
      features.push(value);
    }
    setFilters({...filters, features});
  };

  const HandlePressBrands = (value: string) => {
    let brand = filters?.brand?.length ? [...filters?.brand] : [];
    if (brand.includes(value)) {
      brand = brand.filter((item: string) => item !== value);
    } else {
      brand.push(value);
    }
    setFilters({...filters, brand});
  };

  // console.log({filters});

  return (
    <View style={styles.container}>
      <CustomHeader
        title="Tous les filtres"
        /*title="All Filters"*/ handleBackPress={onBack}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.SVcontentContainerStyle}>
        <CustomText
          text="Type de véhicule"
          fontWeightPopins="600"
          textStyle={styles.vehicleHeading}
        />
        <FlatList
          data={VEHICLE_TYPES}
          scrollEnabled={false}
          numColumns={1}
          keyExtractor={(item, index) => `feature-${item.value}-${index}`}
          renderItem={({item}) => (
            <RoundedBadge
              title={item.label} // French label for display
              value={item.value} // English value for logic
              backgroundColor={COLORS.white as keyof typeof COLORS}
              activeBadge={filters?.vehicle_type}
              setActiveBadge={value =>
                setFilters(prev => ({
                  ...prev,
                  vehicle_type: value,
                }))
              }
            />
          )}
          contentContainerStyle={styles.badgesContainer}
        />
        <CustomText
          //text="Features"
          text="Caractéristiques"
          fontWeightPopins="600"
          textStyle={styles.featureHeading}
        />
        <FlatList
          data={CAR_FEATURES}
          scrollEnabled={false}
          numColumns={1}
          keyExtractor={(item, index) => `feature-${item.value}-${index}`}
          renderItem={({item}) => (
            <RoundedBadge
              isMultiSelect
              title={item.label_fr} // Display French label
              value={item.value} // Use English value for filtering
              backgroundColor={COLORS.white as keyof typeof COLORS}
              activeBadges={filters?.features}
              onPress={HandlePressFeatures}
            />
          )}
          contentContainerStyle={styles.badgesContainer}
        />
        <CustomText
          //text="Number of Seats"
          text="Nombre de sièges"
          fontWeightPopins="600"
          textStyle={styles.featureHeading}
        />
        <Row justifyContent="space-between">
          <CustomText
            text="Nombre de sièges"
            //text="Minimum Seats"
            fontWeightInter="500"
            fontSize="S12"
          />
          <Row>
            <View
              style={[
                styles.minSeatBtnContainer,
                filters?.minimum_seats < 3 && {
                  backgroundColor: COLORS.neutral100,
                },
              ]}>
              <CustomIcon
                icon="minus"
                type="AntDesign"
                size={RFValue(15)}
                color={COLORS.black}
                onPress={() =>
                  setFilters(prev => ({
                    ...prev,
                    minimum_seats:
                      prev?.minimum_seats > 3 ? prev?.minimum_seats - 1 : 2,
                  }))
                }
              />
            </View>
            <CustomText
              text={`${filters?.minimum_seats || 0}`}
              fontWeightInter="600"
              fontSize="S12"
              center
              textStyle={{minWidth: RFValue(15)}}
            />
            <View
              style={[
                styles.minSeatBtnContainer,
                filters?.minimum_seats == 20 && {
                  backgroundColor: COLORS.neutral100,
                },
              ]}>
              <CustomIcon
                icon="plus"
                type="AntDesign"
                size={RFValue(15)}
                color={COLORS.black}
                onPress={() =>
                  setFilters(prev => {
                    return {
                      ...prev,
                      minimum_seats:
                        prev?.minimum_seats === 20
                          ? prev?.minimum_seats
                          : prev?.minimum_seats
                          ? prev?.minimum_seats + 1
                          : 2,
                    };
                  })
                }
              />
            </View>
          </Row>
        </Row>
        <CustomText
          text="Prix Total"
          //text="Total price"
          fontWeightPopins="600"
          textStyle={styles.featureHeading}
        />
        <CustomText
          text={`Moins de €${displayPrice || 0}`}
          //text={`less than €${displayPrice || 0}`}
          fontWeightInter="600"
          textStyle={styles.sliderText}
        />
        <CustomSlider
          setValue={price =>
            setFilters(prev => ({...prev, total_price: price}))
          }
          value={filters?.total_price}
          displayPrice={displayPrice}
          setDisplayPrice={setDisplayPrice}
        />
        <RecentCarsOnly
          active={filters?.less_than_five_years || false}
          setActive={recentCarsOnly => {
            setFilters(prev => ({
              ...prev,
              less_than_five_years: recentCarsOnly,
            }));
          }}
        />
        <CustomText
          text="Type de transmission"
          //text="Transmission Type"
          fontWeightPopins="600"
          textStyle={styles.featureHeading}
        />
        <CustomRadioButtonGroup
          options={GEAR_BOX}
          containerStyle={styles.engineContainer}
          setSelectedValue={gearBox =>
            setFilters(prev => ({...prev, gearbox: gearBox}))
          }
          selectedValue={filters?.gearbox}
        />
        <CustomText
          //text="Engine"
          text="Moteur"
          fontWeightPopins="600"
          textStyle={styles.featureHeading}
        />
        <CustomRadioButtonGroup
          options={ENGINE_TYPES}
          containerStyle={styles.engineContainer}
          setSelectedValue={engineType =>
            setFilters(prev => ({...prev, engine_type: engineType}))
          }
          selectedValue={filters?.engine_type}
        />
        <CustomText
          text="Marque"
          //text="Brand"
          fontWeightPopins="600"
          textStyle={styles.featureHeading}
        />
        <FlatList
          data={BRANDS}
          scrollEnabled={false}
          numColumns={1}
          keyExtractor={(item, index) => `brand-${item}-${index}`}
          renderItem={({item}) => (
            <RoundedBadge
              isMultiSelect
              title={item?.value}
              backgroundColor={COLORS.white as keyof typeof COLORS}
              activeBadges={filters?.brand}
              onPress={HandlePressBrands}
            />
          )}
          contentContainerStyle={styles.badgesContainer}
        />
      </ScrollView>
    </View>
  );
};

export default AllFilters;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: widthPercentageToDP(5),
    paddingTop: widthPercentageToDP(5),
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: widthPercentageToDP(2),
  },
  vehicleHeading: {
    marginTop: widthPercentageToDP(2),
  },
  featureHeading: {
    marginTop: widthPercentageToDP(5),
  },
  SVcontentContainerStyle: {
    paddingBottom: widthPercentageToDP(15),
  },
  sliderText: {
    marginTop: widthPercentageToDP(2),
    fontSize: RFValue(12),
  },
  engineContainer: {flexDirection: 'column', gap: 10},
  minSeatBtnContainer: {
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    width: RFValue(30),
    height: RFValue(30),
    padding: RFValue(5),
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: COLORS.neutral100,
  },
});
