import React from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {FieldValues, useForm} from 'react-hook-form';
import {RFValue} from 'react-native-responsive-fontsize';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {RouteProp, useRoute} from '@react-navigation/native';
import SignupCheckbox from './SignupCheckbox';
import {
  CustomButton,
  CustomHeader,
  CustomPhoneInput,
  CustomRHFTextInput,
  CustomText,
  CustomWrapper,
} from '../../../components';
import {COLORS} from '../../../utils/theme';
import {navigate, navigateReset} from '../../../utils/navigation';
import {useAuth} from '../../../hooks/useAuth';
import Toast from 'react-native-toast-message';
import {useUserCar} from '../../../hooks/useUserCar';
const SignupScreen = () => {
  type SignupProps = {
    SignupProps: {
      id: string;
      user_type: string;
    };
  };
  const routeParams = useRoute<RouteProp<SignupProps, 'SignupProps'>>().params;
  const {user_type} = routeParams || {};
  const {control, handleSubmit, watch} = useForm();
  const {signup, signupLoading} = useAuth();
  const {getUserDetailQuery} = useUserCar();
  const onSubmit = (data: FieldValues) => {
    if (data.phone_number?.length < 10) {
      Toast.show({
        type: 'error',
        text1: 'Erreur',
        text2: 'Phone number is invalid.',
      });
      return;
    }
    const payload = data;
    delete payload.termsAccepted;
    payload.user_type = user_type || 'user';
    signup(payload as any);
  };
  return (
    <CustomWrapper padding backgroundColor={COLORS.white}>
      <View>
        <CustomHeader
          title="Créer un compte"
          handleBackPress={() => navigateReset('RootStack')}
        />
        <ScrollView
          automaticallyAdjustKeyboardInsets
          contentContainerStyle={styles.contentContainerStyle}
          showsVerticalScrollIndicator={false}>
          <View style={styles.heading} />
          <View style={styles.descriptionContainer}>
            <CustomText
              text={
                'Une fois l’inscription terminée, un e-mail de confirmation sera envoyé à l’adresse e-mail.'
              }
              /*text={
                'After registration is completed, a registration for confirmation email will be sent to the email address.'
              }*/
              fontSize="S16"
              fontWeightInter="500"
              color={COLORS.neutral400}
            />
          </View>
          <View style={styles.row}>
            <View style={styles.flex1}>
              <CustomRHFTextInput
                control={control}
                /*title="First Name"*/
                title="Prénom"
                name="first_name"
                autoCapitalize="words"
                placeholder="votre prénom"
                /*placeholder="Enter first name"*/
                requiredStar
                rules={{
                  required: 'Le prénom est requis',
                  validate: {
                    positive: (value: string) =>
                      value.trim().length > 0 || 'Le prénom est requis',
                    minChar: (value: string) =>
                      value.trim().length > 1 ||
                      'Le prénom doit contenir plus de 1 caractères',
                  },
                }}
              />
            </View>
            <View style={styles.flex1}>
              <CustomRHFTextInput
                control={control}
                title="Nom de famille"
                name="last_name"
                autoCapitalize="words"
                placeholder="Entrez votre nom de famille"
                requiredStar
                rules={{
                  required: 'Le nom de famille est requis',
                  validate: {
                    positive: (value: string) =>
                      value.trim().length > 0 || 'Le nom de famille est requis',
                    minChar: (value: string) =>
                      value.trim().length > 2 ||
                      'Le nom de famille doit contenir plus de 2 caractères',
                  },
                }}
              />
            </View>
          </View>
          <CustomRHFTextInput
            control={control}
            name="email"
            title="Email"
            placeholder="Entrez votre email"
            requiredStar
            rules={{
              required: "L'email est requis",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Adresse email invalide',
              },
            }}
          />

          <View style={styles.phoneContainer}>
            <CustomPhoneInput
              control={control}
              label="Numéro de téléphone"
              name="phone_number"
              rules={{
                required: 'Le numéro de téléphone est requis',
              }}
              requiredStar
            />
          </View>

          <CustomRHFTextInput
            secureTextEntry
            placeholder="Entrez le mot de passe"
            requiredStar
            rules={{
              required: 'Le mot de passe est requis',
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
            name="password"
            title="Mot de passe"
          />

          <CustomRHFTextInput
            secureTextEntry
            placeholder="Confirmez le mot de passe"
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
            title="Confirmer le mot de passe"
          />
          <SignupCheckbox
            control={control}
            name="termsAccepted"
            rules={{
              validate: (value: string) =>
                value || 'Vous devez accepter les conditions générales',
            }}
          />

          <CustomButton
            loading={signupLoading}
            title={'S’inscrire'}
            onPress={handleSubmit(onSubmit)}
          />
          <View style={styles.haveAccount}>
            <CustomText
              text={'Vous avez déjà un compte ? '}
              fontSize="S12"
              fontWeightInter="500"
              color={COLORS.neutral400}
            />
            <TouchableOpacity
              onPress={() => {
                getUserDetailQuery.refetch();
                navigate('Signin', {});
              }}>
              <CustomText
                text={'Se connecter'}
                fontWeightInter="500"
                textStyle={styles.bold}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </CustomWrapper>
  );
};

const styles = StyleSheet.create({
  heading: {
    paddingTop: widthPercentageToDP(2.5),
  },
  descriptionContainer: {},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: RFValue(10),
    paddingTop: widthPercentageToDP(2),
  },
  flex1: {
    flex: 1,
  },
  contentContainerStyle: {
    paddingBottom: widthPercentageToDP(20),
    flexGrow: 1,
  },
  haveAccount: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: widthPercentageToDP(2),
  },
  bold: {fontWeight: '600', fontSize: RFValue(12)},
  phoneContainer: {
    paddingVertical: widthPercentageToDP(1),
  },
});

export default SignupScreen;
