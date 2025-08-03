import {StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import {
  CustomHeader,
  CustomRHFTextInput,
  CustomSlider,
  CustomText,
} from '../../../../components';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';
import CustomTextInput from '../../../../components/CustomTextInput';

interface PriceFilterProps {
  onBack: () => void;
  setFilters: (e: Object) => void;
  filters: any;
}

const PriceFilter: FC<PriceFilterProps> = ({
  onBack,
  filters,
  setFilters,
  displayPrice,
  setDisplayPrice,
}) => {
  // console.log(filters?.total_price, displayPrice, '==>>');
  return (
    <View style={styles.container}>
  <CustomHeader title="Appliquer le filtre" handleBackPress={onBack} />

  <CustomText text="Prix total" fontWeightPopins="600" />

  <CustomText
    text={`moins de €${displayPrice || 0}`}
    fontWeightInter="600"
    textStyle={styles.sliderText}
  />
  <CustomSlider
    value={filters?.total_price}
    setValue={price => setFilters(prev => ({...prev, total_price: price}))}
    displayPrice={displayPrice}
    setDisplayPrice={setDisplayPrice}
  />
</View>
  );
};

export default PriceFilter;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: widthPercentageToDP(5),
  },
  sliderText: {
    marginTop: widthPercentageToDP(2),
    fontSize: RFValue(12),
  },
});
