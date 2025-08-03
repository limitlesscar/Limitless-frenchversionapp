import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {OrderCardProps} from './interface';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';
import HostBadge from '../HostBadge';
import {CustomText} from '../CustomText';
import CustomImage from '../CustomImage';
import {COLORS, FONT} from '../../utils/theme';
import {formatDatefrench} from '../../utils/dayjs';

const OrderCard: FC<OrderCardProps> = ({
  name,
  images,
  price_per_day,
  price_per_hour,
  host,
  booking,
  user,
  handlePress,
}) => {
  const host_full_name = host?.full_name || user?.full_name || '';
  const address = host?.address || user?.address || '';
  const profile_picture = host?.profile_picture || user?.profile_picture || '';
  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.priceContainer}>
        <HostBadge
          name={host_full_name}
          location={address}
          picture={profile_picture}
        />
        <View style={styles.ratingContainer}>
          <CustomText text={`€${booking?.amount}`} fontWeightPopins="600" />
          {/* <CustomStarRating rating={Number(stars)} /> */}

          {/* <CustomText
            text={` ${isNaN(stars as number) ? 0 : Number(stars)}`}
            textStyle={styles.price}
          /> */}
        </View>
      </View>
      <CustomImage
        source={{uri: images?.[0]}}
        containerStyle={styles.image}
        resizeMode="cover"
      />
      <View style={[styles.priceContainer, styles.dateContainer]}>
        <CustomText text={`${price_per_day}€/jour`} textStyle={styles.price} />

        <CustomText text={name} textStyle={styles.date} />
      </View>
      <View style={styles.priceContainer}>
        <CustomText
          text={`${price_per_hour}€/heure`}
          textStyle={styles.price}
        />
        <CustomText
          text={`${formatDatefrench(
            booking.start_date_time,
            'DD MMM',
          )} - ${formatDatefrench(booking.end_date_time, 'DD MMM')}`}
          textStyle={styles.date}
        />
      </View>
    </TouchableOpacity>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.neutral50,
    marginVertical: widthPercentageToDP(2),
    borderRadius: widthPercentageToDP(6),
    padding: widthPercentageToDP(3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: widthPercentageToDP(80),
    height: widthPercentageToDP(35),
    marginVertical: widthPercentageToDP(3),
    borderRadius: widthPercentageToDP(6),
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: widthPercentageToDP(80),
  },
  dateContainer: {
    paddingBottom: widthPercentageToDP(2),
  },
  name: {
    fontFamily: FONT.poppins600,
    fontWeight: '600',
    fontSize: RFValue(16),
  },
  price: {
    fontFamily: FONT.poppins600,
    fontWeight: '600',
    fontSize: RFValue(12),
    backgroundColor: COLORS.neutral50,
  },
  date: {
    fontFamily: FONT.inter500,
    fontWeight: '500',
    fontSize: RFValue(12),
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  starStyle: {
    marginHorizontal: widthPercentageToDP(0),
  },
});
