import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {CarItemProps} from './interface';
import {CustomImage, CustomText} from '../../../components';
import {COLORS, FONT} from '../../../utils/theme';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';
import {navigate} from '../../../utils/navigation';

const CarItem: FC<CarItemProps> = ({
  id,
  name,
  images,
  price_per_day,
  price_per_hour,
  getHostCarsLoading,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigate('CarDetails', {id})}
      activeOpacity={0.85}>
      <View style={styles.imageContainer}>
        <CustomImage
          source={{uri: images[0]}}
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      <View style={styles.contentContainer}>
        <CustomText text={name} textStyle={styles.name} />
        <View style={styles.priceContainer}>
          <CustomText
            text={`${price_per_day}€ par jour`}
            textStyle={styles.price}
          />
          <CustomText
            text={`${price_per_hour}€ par heure`}
            textStyle={styles.price}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CarItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: widthPercentageToDP(4),
    width: widthPercentageToDP(80),
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    marginVertical: widthPercentageToDP(2),
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: widthPercentageToDP(45),
  },
  image: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    paddingVertical: widthPercentageToDP(3),
    paddingHorizontal: widthPercentageToDP(4),
    alignItems: 'center',
  },
  name: {
    fontFamily: FONT.poppins600,
    fontWeight: '600',
    fontSize: RFValue(16),
    color: COLORS.newprimary,
    marginBottom: widthPercentageToDP(1.5),
    textAlign: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: widthPercentageToDP(6),
  },
  price: {
    fontFamily: FONT.poppins600,
    fontWeight: '600',
    fontSize: RFValue(13),
    color: COLORS.textSecondary,
  },
});
