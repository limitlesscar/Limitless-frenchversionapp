import {StyleSheet, View} from 'react-native';
import React from 'react';
import {
  CustomButton,
  CustomHeader,
  CustomImage,
  CustomText,
  CustomWrapper,
} from '../../../components';
import {COLORS, IMAGES} from '../../../utils/theme';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';
import {navigate} from '../../../utils/navigation';
// Erivan couttolenc : this page is where we have the login page when we click in the bottom nav the icon chat
const UserAuthScreen = () => {
  return (
    <CustomWrapper padding backgroundColor={COLORS.white}>
      <CustomHeader />
      <View style={styles.container}>
        <CustomImage
          source={IMAGES.logoBlack}
          width={widthPercentageToDP(20)}
          height={widthPercentageToDP(20)}
          containerStyle={styles.authIcon}
        />
        <CustomText
          text={'Bienvenue à Limitless'}
          // Erivan couttolenc :text={'Welcome to Limitless'}
          center
          fontWeightPopins="600"
          fontSize="S22"
        />
        <CustomText
          text={
            'Découvrez la liberté de la location de voiture à la demande. Que vous ayez besoin d’un véhicule pour une course rapide, un week-end ou un voyage prolongé, nous sommes là pour vous.'
          }
          //text={'Discover the freedom of on-demand car rentals. Whether you need a vehicle for a quick errand, a weekend getaway, or an extended trip, we have got you covered.'}
          fontWeightInter="400"
          color={COLORS.neutral500}
          textStyle={styles.description}
          center
        />
        <CustomButton
          title={'Se connecter'}
          //title={'Sign in'}
          onPress={() => navigate('Signin', {user_type: 'user'})}
        />
        <CustomButton
          title={'Créer un compte'}
          //title={'Create an account'}
          onPress={() => navigate('Signup', {user_type: 'user'})}
          containerStyle={styles.signupBtnContainer}
          textStyle={styles.signupBtnText}
        />
      </View>
    </CustomWrapper>
  );
};
export default UserAuthScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingTop: widthPercentageToDP(10),
  },
  signupBtnContainer: {
    backgroundColor: COLORS.neutral400,
    marginVertical: widthPercentageToDP(5),
  },
  signupBtnText: {
    color: COLORS.white,
  },
  authIcon: {
    alignSelf: 'center',
    marginBottom: widthPercentageToDP(5),
  },
  description: {
    fontSize: RFValue(12),
    marginVertical: widthPercentageToDP(2),
    marginBottom: widthPercentageToDP(5),
  },
});
