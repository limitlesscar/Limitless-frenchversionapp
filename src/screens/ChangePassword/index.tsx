import React from 'react';
import {StyleSheet, View} from 'react-native';
import {FieldValues, useForm} from 'react-hook-form';
import {RFValue} from 'react-native-responsive-fontsize';
import {widthPercentageToDP} from 'react-native-responsive-screen';

import {COLORS, FONT} from '../../utils/theme';
import {
  CustomButton,
  CustomHeader,
  CustomRHFTextInput,
  CustomWrapper,
} from '../../components';
import {useAuth} from '../../hooks/useAuth';
import {changePasswordType} from '../../utils/types/loginType';

const SigninScreen = () => {
  const {control, handleSubmit, watch} = useForm();

  const {changePassword, changePasswordLoading} = useAuth();

  const onSubmit = (data: FieldValues) => {
    changePassword(data as changePasswordType);
  };

  return (
    <CustomWrapper padding backgroundColor={COLORS.white}>
      <CustomHeader title="Changer le mot de passe" />

      <View style={styles.container}>
        <View>
          <CustomRHFTextInput
            secureTextEntry
            placeholder="Entrez le mot de passe actuel"
            requiredStar
            rules={{
              required: 'Le mot de passe actuel est obligatoire',
            }}
            control={control}
            name="old_password"
            title="Mot de passe actuel"
          />

          <CustomRHFTextInput
            secureTextEntry
            placeholder="Entrez un nouveau mot de passe"
            requiredStar
            rules={{
              required: 'Le nouveau mot de passe est obligatoire',
              validate: {
                notCommon: (value: string) => {
                  const blacklist = ['password', '123456', 'qwerty'];
                  return (
                    !blacklist.includes(value) ||
                    'Le mot de passe est trop commun, choisissez-en un autre'
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
            name="new_password"
            title="Nouveau mot de passe"
          />

          <CustomRHFTextInput
            secureTextEntry
            placeholder="Confirmez le nouveau mot de passe"
            requiredStar
            control={control}
            rules={{
              required:
                'La confirmation du nouveau mot de passe est obligatoire',
              validate: {
                positive: (value: string) =>
                  value === watch('new_password') ||
                  'Les mots de passe ne correspondent pas',
              },
            }}
            name="confirm_password"
            title="Confirmer le mot de passe"
          />
        </View>
        <CustomButton
          loading={changePasswordLoading}
          title={'Mettre à jour le mot de passe'}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </CustomWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: widthPercentageToDP(5),
  },
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
    paddingBottom: widthPercentageToDP(5),
    flex: 1,
    justifyContent: 'space-between',
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

export default SigninScreen;
