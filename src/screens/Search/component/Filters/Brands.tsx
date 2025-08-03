import React, {FC} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';

import {CustomHeader, CustomText, RoundedBadge} from '../../../../components';
import {BRANDS} from '../../../../utils/constants';
import {COLORS} from '../../../../utils/theme';

interface BrandFilterProps {
  onBack: () => void;
  setFilters: () => void;
  filters: any;
}

const FeaturesFilter: FC<BrandFilterProps> = ({
  onBack,
  filters,
  setFilters,
}) => {
  const HandlePress = (value: string) => {
    let brand = filters?.brand?.length ? [...filters?.brand] : [];
    if (brand?.includes(value)) {
      brand = brand?.filter((item: string) => item !== value);
    } else {
      brand.push(value);
    }
    setFilters({...filters, brand});
  };

  return (
    <View style={styles.container}>
      <CustomHeader title="APPLIQUER LES FILTRES" handleBackPress={onBack} />

      <CustomText text="Marques" />

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
            onPress={HandlePress}
          />
        )}
        contentContainerStyle={styles.badgesContainer}
      />
    </View>
  );
};

export default FeaturesFilter;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: widthPercentageToDP(5),
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: widthPercentageToDP(2),
  },
});
