import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {
  CustomButton,
  CustomImage,
  CustomText,
  CustomWrapper,
} from '../../components';
import {IMAGES, FONT, COLORS, SHADOWS} from '../../utils/theme';
import useUserStore from '../../service/store/user.store';
import {useNavigation} from '@react-navigation/native';

const HostNotSignedin = () => {
  const {userDetails} = useUserStore();
  const navigation = useNavigation();

  const HandlePublishCar = () => {
    if (userDetails?.id) {
      navigation.navigate('SignupComplete', {user_type: 'host'});
    } else {
      navigation.navigate('Signup', {user_type: 'host'});
    }
  };

  const HandleSignin = () => {
    if (userDetails?.id) {
      navigation.navigate('SignupComplete', {user_type: 'host'});
    } else {
      navigation.navigate('Signin', {user_type: 'host'});
    }
  };

  return (
    <CustomWrapper>
      <ScrollView>
        <CustomText
          text={'Faites vérifier et publiez votre voiture'}
          textStyle={styles.heading}
        />
        <CustomText
          text={
            'Rentabilisez votre voiture inutilisée et rendez service en la louant, tout en générant un revenu complémentaire.'
          }
          style={styles.description}
        />
        <CustomImage source={IMAGES.hostingCar} style={styles.image} />
        <View style={{paddingHorizontal: widthPercentageToDP(5)}}>
          <CustomButton
            loading={false}
            title={'Publier une voiture'}
            onPress={HandlePublishCar}
            containerStyle={styles.publishCar}
          />
          <CustomButton
            loading={false}
            title={'Se connecter'}
            onPress={HandleSignin}
            containerStyle={styles.signin}
            textStyle={styles.signinText}
          />
        </View>
      </ScrollView>
    </CustomWrapper>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: RFValue(26),
    fontFamily: FONT.poppins600,
    lineHeight: RFValue(30),
    paddingHorizontal: widthPercentageToDP(5),
    paddingTop: widthPercentageToDP(15),
    paddingBottom: widthPercentageToDP(1),
  },
  description: {
    color: COLORS.neutral400,
    fontSize: RFValue(14),
    fontFamily: FONT.inter500,
    paddingHorizontal: widthPercentageToDP(5),
  },
  image: {
    width: '100%',
    height: widthPercentageToDP(80),
  },
  publishCar: {
    marginVertical: widthPercentageToDP(5),
  },
  signin: {
    marginVertical: widthPercentageToDP(5),
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.white,
    ...SHADOWS.light,
    marginBottom: widthPercentageToDP(5),
  },
  signinText: {
    color: COLORS.primary,
  },
});

export default HostNotSignedin;
