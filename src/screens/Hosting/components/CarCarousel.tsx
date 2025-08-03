import {StyleSheet, View} from 'react-native';
import React from 'react';
import {CustomHorizontalCarousel} from '../../../components';
import {RFValue} from 'react-native-responsive-fontsize';
import {widthPercentageToDP} from 'react-native-responsive-screen';

const CarCarousel = ({images}: {images: string[]}) => {
  return (
    <View style={styles.caresulContainer}>
      <CustomHorizontalCarousel
        width={widthPercentageToDP(82)}
        height={RFValue(185)}
        images={images}
      />
    </View>
  );
};

export default CarCarousel;

const styles = StyleSheet.create({
  caresulContainer: {
    paddingHorizontal: widthPercentageToDP(5),
  },
});
