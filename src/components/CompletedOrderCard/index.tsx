import {StyleSheet, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import {CompletedOrderCardProps} from './interface';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';
import {CustomText} from '../CustomText';
import {COLORS, FONT} from '../../utils/theme';
import {formatDate} from '../../utils/dayjs';
import Row from '../Row';
import CustomStarRating from '../CustomStarRating';
import CustomImage from '../CustomImage';
import {formatStars} from '../../utils/helper';

const CompletedOrderCard: FC<CompletedOrderCardProps> = ({
  host,
  user,
  booking,
  images,
  handlePress,
}) => {
  const profile_picture = user?.profile_picture || host?.profile_picture;
  const full_name = user?.full_name || host?.full_name;
  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Row justifyContent="space-between">
        <CustomImage
          source={{uri: images[0]}}
          width={widthPercentageToDP(17)}
          height={widthPercentageToDP(8)}
          resizeMode="cover"
          style={styles.carImg}
        />
        <CustomText
          text={`€${booking?.amount}`}
          fontWeightInter="600"
          fontSize="S14"
          color={COLORS.primary}
        />
      </Row>
      <Row justifyContent="space-between" style={styles.dateContainer}>
        <CustomText
          text={formatDate(booking?.start_date_time, 'DD MMM')}
          fontWeightInter="500"
          fontSize="S12"
          color={COLORS.primary}
        />
        <CustomText
          text={formatDate(booking?.start_date_time, 'DD MMM')}
          fontWeightInter="500"
          fontSize="S12"
          color={COLORS.primary}
        />
      </Row>
      <Row justifyContent="space-between">
        <Row>
          <CustomImage
            source={{uri: profile_picture as string}}
            width={RFValue(20)}
            height={RFValue(20)}
            containerStyle={styles.profilePic}
            resizeMode="cover"
          />
          <CustomText
            numberOfLines={1}
            text={full_name}
            fontWeightInter="500"
            fontSize="S12"
            textStyle={{maxWidth: RFValue(200)}}
            color={COLORS.primary}
          />
        </Row>
        <Row>
          <CustomStarRating
            rating={Number(booking?.stars)}
            enableHalfStar={false}
          />
          <CustomText
            textStyle={{}}
            text={` ${formatStars(booking?.stars)}`}
            fontWeightInter="500"
            fontSize="S12"
            color={COLORS.primary}
          />
        </Row>
      </Row>
    </TouchableOpacity>
  );
};

export default CompletedOrderCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.neutral50,
    marginVertical: widthPercentageToDP(2),
    borderRadius: widthPercentageToDP(3),
    paddingHorizontal: widthPercentageToDP(4),
    paddingVertical: widthPercentageToDP(4),
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  carImg: {
    borderRadius: widthPercentageToDP(3),
  },
  image: {
    width: widthPercentageToDP(80),
    height: widthPercentageToDP(40),
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: widthPercentageToDP(80),
  },
  dateContainer: {
    paddingVertical: widthPercentageToDP(2),
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
  profilePic: {
    borderRadius: RFValue(10),
    marginRight: widthPercentageToDP(2),
  },
});
