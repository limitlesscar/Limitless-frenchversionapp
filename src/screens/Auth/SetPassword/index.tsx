import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {FieldValues, useForm} from 'react-hook-form';
import {RFValue} from 'react-native-responsive-fontsize';
import {widthPercentageToDP} from 'react-native-responsive-screen';

import {COLORS, FONT} from '../../../utils/theme';
import {navigate} from '../../../utils/navigation';
import {
  CustomButton,
  CustomRHFTextInput,
  CustomWrapper,
} from '../../../components';
import {AuthHeader} from '../components';
import {useAuth} from '../../../hooks/useAuth';
import {useRoute} from '@react-navigation/native';

const SetPasswordScreen = () => {
  const {control, handleSubmit, watch} = useForm();

  const params = useRoute().params;

  const {resetPassword, resetPasswordLoading} = useAuth();
  const onSubmit = (data: FieldValues) => {
    let paylaod = {
      email: params?.email,
      otp: params?.otp,
      ...data,
    };
    resetPassword(paylaod);
  };

  return (
    <CustomWrapper padding backgroundColor={COLORS.white}>
      <AuthHeader
        heading="Définir un nouveau mot de passe"
        /*heading="Set a New Password"*/
        /*description="Set a new password and remember it"*/
        description="Définissez un nouveau mot de passe et souvenez-vous-en"
      />
      <ScrollView
        automaticallyAdjustKeyboardInsets
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}>
        <CustomRHFTextInput
          secureTextEntry
          placeholder="Entrez un nouveau mot de passe"
          requiredStar
          rules={{
            required: 'Le nouveau mot de passe est requis',
            validate: {
              notCommon: (value: string) => {
                const blacklist = ['password', '123456', 'qwerty'];
                return (
                  !blacklist.includes(value) ||
                  'Mot de passe trop commun, choisissez-en un autre'
                );
              },
              minLength: (value: string) =>
                value.length >= 8 ||
                'Le mot de passe doit contenir au moins 8 caractères, une majuscule et un symbole',
              maxLength: (value: string) =>
                value.length <= 16 ||
                'Le mot de passe ne doit pas dépasser 16 caractères',
              hasUppercase: (value: string) =>
                /[A-Z]/.test(value) ||
                'Le mot de passe doit contenir au moins une lettre majuscule',
              hasLowercase: (value: string) =>
                /[a-z]/.test(value) ||
                'Le mot de passe doit contenir au moins une lettre minuscule',
              hasNumber: (value: string) =>
                /[0-9]/.test(value) ||
                'Le mot de passe doit contenir au moins un chiffre',
              hasSymbol: (value: string) =>
                /[\W_]/.test(value) ||
                'Le mot de passe doit contenir au moins un symbole',
              noSpaces: (value: string) =>
                !/\s/.test(value) ||
                'Le mot de passe ne doit pas contenir d’espaces',
            },
          }}
          control={control}
          name="password"
          title="Nouveau mot de passe"
        />
        <CustomRHFTextInput
          secureTextEntry
          placeholder="Confirmez le nouveau mot de passe"
          requiredStar
          control={control}
          rules={{
            required: 'La confirmation du mot de passe est requise',
            validate: {
              positive: (value: string) =>
                value === watch('password') ||
                'Les mots de passe ne correspondent pas',
            },
          }}
          name="confirmPassword"
          title="Confirmer le nouveau mot de passe"
        />
        <CustomButton
          loading={resetPasswordLoading}
          title={'Enregistrer le mot de passe'}
          onPress={handleSubmit(onSubmit)}
        />
      </ScrollView>
    </CustomWrapper>
  );
};

const styles = StyleSheet.create({
  logo: {
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: RFValue(10),
  },
  flex1: {
    flex: 1,
  },
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
    alignSelf: 'flex-end',
    paddingTop: widthPercentageToDP(1.5),
    paddingBottom: widthPercentageToDP(3.5),
    fontFamily: FONT.poppins600,
    fontSize: RFValue(12),
  },
  heading: {
    paddingTop: widthPercentageToDP(1.5),
    paddingBottom: widthPercentageToDP(4),
    fontSize: RFValue(24),
    fontFamily: FONT.poppins600,
    textAlign: 'center',
  },
});

export default SetPasswordScreen;
