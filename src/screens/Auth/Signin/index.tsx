import React, {useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {FieldValues, useForm} from 'react-hook-form';
import {RFValue} from 'react-native-responsive-fontsize';
import {widthPercentageToDP} from 'react-native-responsive-screen';

import {COLORS, FONT} from '../../../utils/theme';
import {
  navigate,
  navigateGoBack,
  navigateReplace,
  navigationRef,
} from '../../../utils/navigation';
import {
  CustomButton,
  CustomRHFTextInput,
  CustomText,
  CustomWrapper,
} from '../../../components';
import {AuthHeader} from '../components';
import {emailRegex} from '../../../utils/helper';
import {useAuth} from '../../../hooks/useAuth';
import {loginType} from '../../../utils/types/loginType';
import {useRoute} from '@react-navigation/native';

const SigninScreen = () => {
  const {control, handleSubmit, watch} = useForm();
  const {login, loginLoading} = useAuth();
  const [isFocused, setIsFocused] = useState(false); // erivan : this is for the border when typing

  const params = useRoute().params;
  const {user_type} = params || {};
  const onSubmit = async (data: FieldValues) => {
    let res = await login(data as loginType);

    console.log({res});
  };

  const HandleBackPress = () => {
    if (navigationRef?.current?.canGoBack()) {
      navigateGoBack();
    } else {
      navigateReplace('RootStack');
    }
  };
  return (
    // erivan couttolenc : translation of this page
    <CustomWrapper padding backgroundColor={COLORS.white}>
      <AuthHeader
        heading="Bienvenue à Limitless"
        //heading="Welcome back to Limitless"
        handleBackPress={HandleBackPress}
      />
      <ScrollView
        automaticallyAdjustKeyboardInsets
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}>
        <CustomRHFTextInput
          control={control}
          name="email"
          title="Adresse e-mail"
          placeholder="Entrez votre adresse e-mail"
          requiredStar
          rules={{
            required: 'L’adresse e-mail est requise',
            pattern: {
              value: emailRegex,
              message: 'Adresse e-mail invalide',
            },
          }}
        />

        {/*<CustomRHFTextInput
          secureTextEntry
          placeholder="Enter your password"
          requiredStar
          rules={{
            required: 'Password is required',
          }}
          control={control}
          name="password"
          title="Password"
        />
        */}

        <CustomRHFTextInput
          secureTextEntry
          placeholder="Entrez votre mot de passe"
          requiredStar
          rules={{
            required: 'Le mot de passe est requis',
          }}
          control={control}
          name="password"
          title="Mot de passe"
        />

        {/*<TouchableOpacity
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            alignSelf: 'flex-end',
            marginTop: widthPercentageToDP(1.5),
            marginBottom: widthPercentageToDP(3.5),
          }}
          onPress={() => navigate('ForgotPassword')}>
          <CustomText
            text={'Forgot Password?'}
            color={COLORS.primary}
            textStyle={styles.forgotPassword}
          />
        </TouchableOpacity>
             */}
        <TouchableOpacity
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            alignSelf: 'flex-end',
            marginTop: widthPercentageToDP(1.5),
            marginBottom: widthPercentageToDP(3.5),
          }}
          onPress={() => navigate('ForgotPassword')}>
          <CustomText
            text={'Mot de passe oublié ?'}
            color={COLORS.primary}
            textStyle={styles.forgotPassword}
          />
        </TouchableOpacity>

        <CustomButton
          loading={loginLoading}
          title={'Se connecter'}
          onPress={handleSubmit(onSubmit)}
          disabled={
            !watch('email')?.length ||
            !watch('password')?.length ||
            watch('email')?.length < 5
          }
        />
        <View style={styles.haveAccount}>
          <CustomText
            text={"Vous n'avez pas de compte ? "}
            fontSize="S14"
            fontWeightInter="500"
            color={COLORS.neutral400}
          />
          <TouchableOpacity onPress={() => navigate('Signup', {user_type})}>
            <CustomText
              text={"S'inscrire"}
              fontSize="S18"
              fontWeightInter="500"
              color={COLORS.primary}
              textStyle={styles.bold}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </CustomWrapper>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingBottom: widthPercentageToDP(20),
  },
  haveAccount: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: widthPercentageToDP(4),
    paddingBottom: widthPercentageToDP(2),
  },
  bold: {fontWeight: '600', fontSize: RFValue(12)},
  forgotPassword: {
    fontFamily: FONT.poppins600,
    fontSize: RFValue(12),
  },
});

export default SigninScreen;
