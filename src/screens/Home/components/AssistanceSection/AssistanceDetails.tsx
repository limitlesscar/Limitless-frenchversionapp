import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {
  CustomImage,
  CustomText,
  CustomWrapper,
  Row,
} from '../../../../components';
import {useRoute} from '@react-navigation/native';
import {COLORS, IMAGES} from '../../../../utils/theme';
import {navigateGoBack} from '../../../../utils/navigation';
import {RFValue} from 'react-native-responsive-fontsize';
import {widthPercentageToDP} from 'react-native-responsive-screen';

const AssistanceDetails = () => {
  const route = useRoute();
  const data = route.params?.data || {};
  const {h1, h2, h3, p1, p2, p3, pageHeading, image} = data || {};
  return (
    <CustomWrapper bottomInsert={-1}>
      <View style={styles.header}>
        <Row justifyContent="space-between">
          <CustomImage
            onPressImage={navigateGoBack}
            source={IMAGES.back}
            height={RFValue(34)}
            width={RFValue(34)}
          />
          <CustomText
            text={pageHeading}
            fontWeightPopins="600"
            fontSize="S10"
            center
          />
          <View />
        </Row>
      </View>
      <View style={styles.scrollViewContainer}>
        <ScrollView style={styles.scrollView}>
          <CustomText
            text={h1}
            fontWeightPopins="500"
            fontSize="S16"
            textStyle={styles.headingStyle}
          />
          <CustomText
            text={p1}
            fontWeightInter="500"
            fontSize="S12"
            color={COLORS.neutral500}
            textStyle={styles.paragraphStyle}
          />
          <CustomImage
            source={image}
            resizeMode="cover"
            containerStyle={styles.image}
          />
          <CustomText
            text={h2}
            fontWeightPopins="500"
            fontSize="S16"
            textStyle={styles.headingStyle}
          />
          <CustomText
            text={p2}
            fontWeightInter="500"
            fontSize="S12"
            color={COLORS.neutral500}
            textStyle={styles.paragraphStyle}
          />
          <CustomText
            text={h3}
            fontWeightPopins="500"
            fontSize="S16"
            textStyle={styles.headingStyle}
          />
          <CustomText
            text={p3}
            fontWeightInter="500"
            fontSize="S12"
            color={COLORS.neutral500}
            textStyle={styles.paragraphStyle}
          />
        </ScrollView>
      </View>
    </CustomWrapper>
  );
};

export default AssistanceDetails;

const styles = StyleSheet.create({
  header: {
    paddingVertical: widthPercentageToDP(7),
    paddingHorizontal: widthPercentageToDP(4),
  },
  scrollViewContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: widthPercentageToDP(4),
    paddingVertical: widthPercentageToDP(4),
    borderTopStartRadius: widthPercentageToDP(4),
    borderTopEndRadius: widthPercentageToDP(4),
  },
  scrollView: {
    flex: 1,
  },
  image: {
    borderRadius: widthPercentageToDP(4),
    maxHeight: widthPercentageToDP(60),
  },
  headingStyle: {
    paddingVertical: widthPercentageToDP(1),
  },
  paragraphStyle: {
    paddingVertical: widthPercentageToDP(1),
  },
});
