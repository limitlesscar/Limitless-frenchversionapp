import React, {useEffect, useState} from 'react';
import {
  CustomButton,
  CustomHeader,
  CustomImagePickerSheet,
  CustomPhoneInput,
  CustomRHFDatePicker,
  CustomRHFDropdown,
  CustomRHFTextInput,
  CustomWrapper,
  InputLabelRow,
  RoundedBadge,
} from '../../components';
import {ScrollView, StyleSheet, View} from 'react-native';
import {COLORS, IMAGES} from '../../utils/theme';
import {FieldValues, useForm, useWatch} from 'react-hook-form';
import {RFValue} from 'react-native-responsive-fontsize';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import useUserStore from '../../service/store/user.store';
import {COUNTRIES, getCities} from '../../utils/countries';
import {formatDate, getMaxAgeDate} from '../../utils/dayjs';
import {UserDetailsType} from '../../utils/types/apiResponseType';
import {useAuth} from '../../hooks/useAuth';
import {updateProfileType} from '../../utils/types/loginType';
import {Source} from 'react-native-fast-image';

const EditProfile = () => {
  const {userDetails} = useUserStore();
  const {updateProfile, updateProfileLoading} = useAuth();
  const {control, handleSubmit, watch} = useForm({
    defaultValues: userDetails as UserDetailsType,
  });

  let emergencyContact = watch('emergency_contact');
  let PhoneNumber = watch('phone_number');

  const selectedCountry = useWatch({
    control,
    name: 'country',
  });
  const [cityOptions, setCityOptions] = useState([]);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [profile_picture, setProfilePicture] = useState<
    Source | string | undefined
  >(userDetails?.profile_picture);

  useEffect(() => {
    if (selectedCountry) {
      const cities = getCities(selectedCountry);
      setCityOptions(cities || []);
    } else {
      setCityOptions([]);
    }
  }, [selectedCountry]);

  const onSubmit = (data: FieldValues) => {
    let payload: updateProfileType = {
      first_name: data.first_name,
      last_name: data.last_name,
      phone_number: data.phone_number,
      profile_picture: data.profile_picture,
      date_of_birth: formatDate(data?.date_of_birth, 'YYYY-MM-DD'),
      emergency_contact: data.emergency_contact,
      country: data.country,
      city: data.city,
      address: data.address,
    };
    console.log(payload.profile_picture);
    updateProfile({
      payload: {
        ...payload,
        profile_picture: profile_picture as string,
        uid: String(userDetails?.id),
      },
    });
  };

  return (
    <CustomWrapper padding backgroundColor={COLORS.white}>
      <View style={styles.container}>
        <CustomHeader title="Modifier le profil" />
        <ScrollView
          automaticallyAdjustKeyboardInsets
          contentContainerStyle={styles.contentContainerStyle}
          showsVerticalScrollIndicator={false}>
          <CustomImagePickerSheet
            defaultImage={IMAGES.emptyProfile}
            editProfile
            // source={profile_picture as Source}
            source={
              typeof profile_picture === 'string'
                ? {uri: profile_picture}
                : profile_picture
            }
            onChange={image => setProfilePicture(image as Source)}
          />
          <View style={styles.row}>
            <View style={styles.flex1}>
              <CustomRHFTextInput
                control={control}
                title="Prénom"
                name="first_name"
                placeholder="Entrez le prénom"
                requiredStar
                rules={{
                  required: 'Le prénom est requis',
                  validate: {
                    positive: (value: string) =>
                      value.trim().length > 0 || 'Le prénom est requis',
                    minChar: (value: string) =>
                      value.trim().length > 2 ||
                      'Le prénom doit contenir plus de 2 caractères',
                  },
                }}
              />
            </View>
            <View style={styles.flex1}>
              <CustomRHFTextInput
                control={control}
                title="Nom de famille"
                name="last_name"
                placeholder="Entrez le nom de famille"
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
            title="Adresse e-mail"
            placeholder="Entrez votre adresse e-mail"
            requiredStar
            editable={false}
            disabled
            rules={{
              required: 'L’adresse e-mail est requise',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Adresse e-mail invalide',
              },
            }}
          />

          <CustomPhoneInput
            control={control}
            requiredStar
            label="Numéro de téléphone"
            name="phone_number"
            rules={{
              required: 'Le numéro de téléphone est requis',
              validate: value =>
                value != emergencyContact ||
                'Le contact d’urgence ne peut pas être identique au numéro de téléphone',
              maxLength: {
                value: 20,
                message:
                  'Le numéro de téléphone ne doit pas dépasser 20 caractères',
              },
            }}
          />
          <CustomRHFDatePicker
            label="Date de naissance"
            placeholder="JJ MM AAAA"
            control={control}
            name="date_of_birth"
            isDatePickerVisible={isDatePickerVisible}
            rules={{required: 'La date de naissance est requise'}}
            showDatePicker={() => setIsDatePickerVisible(true)}
            hideDatePicker={() => setIsDatePickerVisible(false)}
            handleConfirm={() => {
              setIsDatePickerVisible(false);
            }}
            requiredStar
            maximumDate={getMaxAgeDate(18)}
          />

          <CustomRHFTextInput
            control={control}
            keyboardType="numeric"
            maxLength={20}
            title="Contact d'urgence"
            name="emergency_contact"
            placeholder="Entrez un contact d'urgence"
          />

          <CustomRHFDropdown
            placeholder="Sélectionnez votre pays"
            label="Pays"
            data={COUNTRIES}
            control={control}
            name="country"
            requiredStar
            rules={{required: 'Le pays est requis'}}
          />

          <CustomRHFDropdown
            placeholder="Sélectionnez votre ville"
            label="Ville"
            data={cityOptions}
            control={control}
            name="city"
            disabled={!selectedCountry}
            requiredStar
            rules={{required: 'La ville est requise'}}
          />

          <CustomRHFTextInput
            control={control}
            title="Adresse"
            name="address"
            placeholder="Entrez l'adresse"
            requiredStar
            rules={{
              required: "L'adresse est requise",
            }}
          />
          <View>
            <InputLabelRow text="Carte d'identité" />
            <View
              style={{
                maxWidth: widthPercentageToDP(30),
                marginTop: RFValue(5),
                marginBottom: RFValue(10),
              }}>
              <RoundedBadge title="Vérifié" disabled />
            </View>
          </View>
          <CustomButton
            title={'Enregistrer les modifications'}
            onPress={handleSubmit(onSubmit)}
            loading={updateProfileLoading}
          />
        </ScrollView>
      </View>
    </CustomWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    paddingTop: widthPercentageToDP(1.5),
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
    paddingVertical: widthPercentageToDP(2),
  },
  bold: {fontWeight: '600', fontSize: RFValue(12)},
});

export default EditProfile;
