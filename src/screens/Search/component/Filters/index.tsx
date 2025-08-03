import React, {useRef, useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

import {
  CustomBottomSheet,
  CustomButton,
  CustomIcon,
  CustomImage,
  CustomText,
  Row,
} from '../../../../components';
import AllFilters from './AllFilters';
import VehicleType from './VehicleType';
import Features from './Features';
import PriceFilter from './PriceFilter';
import {COLORS, IMAGES} from '../../../../utils/theme';
import BrandsFilter from './Brands';

const Filters = ({
  filters,
  setFilters,
  HandleClearFilter,
  HandleApplyFilter,
  displayPrice,
  setDisplayPrice,
}: any) => {
  const [showFilterOptions, setShowFilterOptions] = useState('');
  const BTSheetRef = useRef<BottomSheetModal>(null);

  // Erivan : this is the car filter nav where we can find the other filters for the search
  const CAR_SEARCH_FILTER_DATA = [
    {key: 'Vehicle Type', value: filters?.vehicle_type || 'Type de véhicule'},
    {key: 'Brands', value: 'Marques'},
    {key: 'Features', value: 'Fonctionnalités'},
    {key: 'Price', value: 'Prix'},
  ];

  {
    /* 
     const CAR_SEARCH_FILTER_DATA = [
    {key: 'Vehicle Type', value: filters?.vehicle_type || 'Vehicle Type'},
    {key: 'Brands', value: 'Brands'},
    {key: 'Features', value: 'Features'},
    {key: 'Price', value: 'Price'},
  ];
    */
  }

  const HandleFilters = (value: string) => {
    setShowFilterOptions(value);
    if (value?.length > 0 && value !== showFilterOptions) {
      BTSheetRef.current?.present();
    }
  };
  const renderItem = ({item}: {item: any}) => {
    const highlightedBGColor =
      filters?.vehicle_type === item.value ||
      (filters?.brand?.length && item?.key === 'Brands') ||
      (filters?.features.length && item.key === 'Features') ||
      (item.key === 'Price' && filters?.total_price > 1)
        ? COLORS.primary
        : COLORS.white;

    const highlightedTextColor =
      filters?.vehicle_type === item.value ||
      (filters?.brand?.length && item?.key === 'Brands') ||
      (filters?.features.length && item.key === 'Features') ||
      (item.key === 'Price' && filters?.total_price > 1)
        ? COLORS.white
        : COLORS.primary;

    return (
      <TouchableOpacity
        style={[
          styles.dropdownContainer,
          {
            backgroundColor: highlightedBGColor,
          },
        ]}
        onPress={() => HandleFilters(item.key)}>
        <Row>
          <CustomText
            text={item.value}
            fontSize="S15"
            textStyle={styles.textStyle}
            color={highlightedTextColor}
          />
          <CustomIcon
            icon="chevron-down"
            type="Feather"
            color={highlightedTextColor}
            size={RFValue(12)}
          />
        </Row>
      </TouchableOpacity>
    );
  };

  const HandleCloseBTSheet = () => {
    BTSheetRef.current?.close();
    setShowFilterOptions('');
  };

  // ====   >>>>

  const HandleApplyBTSheet = () => {
    setShowFilterOptions('');
    HandleApplyFilter();
    BTSheetRef.current?.close();
  };

  // ====   >>>>

  const BTSheetChildren = {
    All: (
      <AllFilters
        onBack={HandleCloseBTSheet}
        setFilters={setFilters}
        filters={filters}
        displayPrice={displayPrice}
        setDisplayPrice={setDisplayPrice}
      />
    ),
    'Vehicle Type': (
      <VehicleType
        onBack={HandleCloseBTSheet}
        setFilters={setFilters}
        filters={filters}
      />
    ),
    Features: (
      <Features
        onBack={HandleCloseBTSheet}
        setFilters={setFilters}
        filters={filters}
      />
    ),
    Brands: (
      <BrandsFilter
        onBack={HandleCloseBTSheet}
        setFilters={setFilters}
        filters={filters}
      />
    ),
    Price: (
      <PriceFilter
        onBack={HandleCloseBTSheet}
        setFilters={setFilters}
        filters={filters}
        displayPrice={displayPrice}
        setDisplayPrice={setDisplayPrice}
      />
    ),
  };

  return (
    <View style={styles.container}>
      <CustomImage
        onPressImage={() => HandleFilters('All')}
        source={IMAGES.filter}
        width={widthPercentageToDP(10)}
        height={widthPercentageToDP(10)}
        containerStyle={styles.filterIcon}
      />
      <FlatList
        horizontal
        data={CAR_SEARCH_FILTER_DATA}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparator}
        showsHorizontalScrollIndicator={false}
      />
      <CustomBottomSheet
        BTSheetRef={BTSheetRef}
        children={
          <View>
            {BTSheetChildren[showFilterOptions as keyof typeof BTSheetChildren]}
            {showFilterOptions == 'All' && (
              <View
                style={{
                  flexDirection: 'row',
                  gap: widthPercentageToDP(4),
                  marginHorizontal: widthPercentageToDP(4),
                  marginVertical: heightPercentageToDP(3),
                }}>
                <CustomButton
                  title="Réinitialiser" // "Reset" in French
                  // title="Reset"
                  containerStyle={{
                    backgroundColor: '#fff',
                    borderWidth: 1,
                    flex: 1,
                  }}
                  textStyle={{color: '#000'}}
                  onPress={HandleClearFilter}
                />
                <CustomButton
                  title="Appliquer"
                  //title="Apply"
                  containerStyle={{flex: 1}}
                  onPress={HandleApplyBTSheet}
                />
              </View>
            )}
          </View>
        }
      />
    </View>
  );
};

const ItemSeparator = () => {
  return <View style={styles.itemSeparator} />;
};
export default Filters;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterIcon: {
    marginRight: widthPercentageToDP(2),
  },
  itemSeparator: {
    width: widthPercentageToDP(2),
  },

  dropdownContainer: {
    padding: widthPercentageToDP(2),
    backgroundColor: 'white',
    borderRadius: widthPercentageToDP(5),
    borderWidth: 1,
    borderColor: COLORS.neutral200,
  },
  textStyle: {
    marginRight: widthPercentageToDP(2),
  },
});
