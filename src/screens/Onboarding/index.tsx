import {ImageBackground, StyleSheet, View} from 'react-native';
import React from 'react';
import {COLORS, IMAGES} from '../../utils/theme';
import {CustomButton, CustomText} from '../../components';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';
import {navigateReset} from '../../utils/navigation';
import useUserStore from '../../service/store/user.store';
// erivan : this is the onboarding screen where the program begin to work
const Onboarding = () => {
  const {setOnboardingStatus} = useUserStore();
  const HandleNavigate = async () => {
    setOnboardingStatus?.(true);
    navigateReset('RootStack');
  };
  return (
    <ImageBackground
      source={IMAGES.onboarding}
      resizeMode="cover"
      style={styles.backgroundImage}>
      <View style={styles.container}>
        <CustomText
          text="Trouvez et louez une voiture en quelques étapes simples."
          textStyle={styles.heading}
        />
        <CustomButton
          title="C'est parti !"
          onPress={HandleNavigate}
          containerStyle={styles.btnContainer}
        />
      </View>
    </ImageBackground>
  );
};
export default Onboarding;
// this is the style for the onboarding screen
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: widthPercentageToDP(20),
    paddingBottom: widthPercentageToDP(10),
    paddingHorizontal: widthPercentageToDP(10),
  },
  heading: {
    fontFamily: 'Poppins-Regular',
    fontSize: RFValue(50),
    color: COLORS.white,
    fontWeight: '600',
    lineHeight: RFValue(60),
  },
  btnContainer: {
    borderRadius: 100,
  },
});
