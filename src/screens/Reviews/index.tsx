import {Keyboard, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {
  CustomButton,
  CustomHeader,
  CustomRHFTextInput,
  CustomStarRating,
  CustomText,
  CustomWrapper,
} from '../../components';
import {COLORS} from '../../utils/theme';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {FieldValue, FieldValues, useForm} from 'react-hook-form';
import {RouteProp, useRoute} from '@react-navigation/native';
import {useBooking} from '../../hooks/useBooking';
import {navigate, navigateReplace} from '../../utils/navigation';
import Toast from 'react-native-toast-message';
type ReviewsProps = {
  ReviewsProps: {
    id: string;
  };
};
const Reviews = () => {
  const {setReview, reviewLoading}: any = useBooking();
  const routes = useRoute<RouteProp<ReviewsProps, 'ReviewsProps'>>() || {};
  const {id} = routes.params || {};
  const [rating, setRating] = useState(0);
  const {control, handleSubmit} = useForm();
  const onSubmit = async (data: FieldValues) => {
    if (rating < 1) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Star rating is required.',
      });
      return;
    }
    let payload = {
      booking_id: id,
      stars: rating,
      ...data,
    };
    setReview(payload);
  };

  return (
    <CustomWrapper padding backgroundColor={COLORS.white}>
      <CustomHeader title="Rate your experience" />
      <Pressable onPress={Keyboard.dismiss} style={styles.contentContainer}>
        <CustomText
          center
          text={'Your booking has completed, Rate your experience'}
          color="#000"
          fontSize="S20"
          fontWeightPopins="900"
        />

        <CustomStarRating
          containerStyle={{alignSelf: 'center'}}
          emptyColor={true}
          starSize={widthPercentageToDP(10)}
          rating={rating}
          setRating={setRating}
        />

        <CustomRHFTextInput
          control={control}
          numberOfLines={3}
          multiline
          title="Tell us a bit more"
          name="review_message"
          placeholder="Write Something"
          rules={{
            required: 'Review is required',
            validate: {
              positive: (value: string) =>
                value.trim().length > 0 || 'Review is required',
              minLength: (value: string) =>
                value.trim().length >= 10 ||
                'Review must be at least 10 characters',
              maxLength: (value: string) =>
                value.trim().length < 250 ||
                'Review must not exceed 250 characters',
            },
          }}
          style={styles.descriptionInput}
          textStyle={styles.descriptionInput}
        />
        <CustomButton
          loading={reviewLoading}
          title="Submit"
          onPress={handleSubmit(onSubmit)}
          containerStyle={{borderRadius: widthPercentageToDP(10)}}
        />
      </Pressable>
    </CustomWrapper>
  );
};
export default Reviews;

const styles = StyleSheet.create({
  descriptionInput: {
    minHeight: RFValue(80),
    maxHeight: RFValue(150),
    padding: RFValue(14),
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    textAlignVertical: 'top',
  },
  contentContainer: {
    flex: 1,
    gap: widthPercentageToDP(9),
    paddingTop: heightPercentageToDP(5),
  },
});
