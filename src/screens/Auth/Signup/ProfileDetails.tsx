import React, {FC, useCallback, useEffect, useState} from 'react';
import {
  CustomButton,
  CustomImagePickerSheet,
  CustomPhoneInput,
  CustomRHFDatePicker,
  CustomRHFDropdown,
  CustomRHFTextInput,
  CustomText,
  InputLabelRow,
} from '../../../components';
import {COLORS, FONT, IMAGES} from '../../../utils/theme';
import {ImageSourcePropType, ScrollView, StyleSheet, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {FieldValues, useForm, useWatch} from 'react-hook-form';
import {formatDate, getMaxAgeDate} from '../../../utils/dayjs';
import {COUNTRIES, getCities} from '../../../utils/countries';
import {Source} from 'react-native-fast-image';
import Toast from 'react-native-toast-message';
import useUserStore from '../../../service/store/user.store';
import {useAuth} from '../../../hooks/useAuth';
// erivan couttolenc :
import ErrorModal from './ErrorModal'; // le modal d’erreur qu’on a défini précédemment

type ProfileDetailsProps = {
  scrollRef: any;
  setCurrentIndex: (index: number) => void;
  isHost?: boolean;
  user_type?: 'host' | 'user';
};
const ProfileDetails: FC<ProfileDetailsProps> = ({
  scrollRef,
  setCurrentIndex,
  user_type,
}) => {
  const [cityOptions, setCityOptions] = useState([]);
  const {control, handleSubmit, reset} = useForm();
  const {userDetails} = useUserStore();
  const selectedCountry = useWatch({control, name: 'country'});
  const [profilePic, setProfilePic] = useState<
    Source | ImageSourcePropType | null | any
  >(userDetails?.profile_picture);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const HandleNext = () => {
    setCurrentIndex(1);
    scrollRef.current.scrollToEnd();
  };
  useEffect(() => {
    if (
      (userDetails?.user_type.includes('host') &&
        userDetails?.host_onboarding_status == 'Driving_Details_Pending') ||
      userDetails?.host_onboarding_status == 'Stripe_Onboarding_Pending'
    ) {
      setTimeout(() => {
        HandleNext();
      }, 250);
    }
  }, [scrollRef, userDetails?.user_type, userDetails?.host_onboarding_status]);
  useEffect(() => {
    reset(userDetails);
  }, [user_type]);
  const [idCard, setIdCard] = useState({
    id_card_front: userDetails?.id_card_front || '',
    id_card_back: userDetails?.id_card_back || '',
  });
  const {setProfile, setProfileLoading} = useAuth({
    successCallback: HandleNext,
  });
  // State pour gérer le modal d'erreur
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const onSubmit = useCallback(
    data => {
      if (!profilePic) {
        setErrorMessage('La photo de profil est obligatoire');
        setModalVisible(true);
        return;
      }
      if (!idCard?.id_card_back || !idCard?.id_card_front) {
        setErrorMessage("La carte d'identité est obligatoire");
        setModalVisible(true);
        return;
      }
      setProfile({
        payload: {
          emergency_contact: data?.emergency_contact,
          country: data?.country,
          city: data?.city,
          address: data?.address,
          date_of_birth: formatDate(data?.date_of_birth, 'YYYY-MM-DD'),
          user_type: user_type || 'user',
          profile_picture: profilePic,
          idCard: idCard,
          uid: userDetails?.id,
        },
      });
    },
    [profilePic, idCard, user_type, userDetails, setProfile],
  );
  useEffect(() => {
    if (selectedCountry) {
      const cities = getCities(selectedCountry);
      setCityOptions(cities || []);
    } else {
      setCityOptions([]);
    }
  }, [selectedCountry]);
  return (
    <View style={{width: widthPercentageToDP(100)}}>
      <ScrollView
        automaticallyAdjustKeyboardInsets
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyle}>
        <CustomText
          color={COLORS.black}
          fontSize="S18"
          text={'Informations personnelles'}
          fontWeightPopins="600"
        />
        <CustomImagePickerSheet
          onChange={va => setProfilePic(va)}
          source={
            profilePic && typeof profilePic !== 'string'
              ? profilePic
              : profilePic
              ? {uri: profilePic}
              : IMAGES.imageUpload
          }
          defaultImage={IMAGES.imageUpload}
          profileDetails
        />
        <CustomRHFDatePicker
          label="Date de naissance"
          placeholder="JJ MM AAAA"
          control={control}
          name="date_of_birth"
          isDatePickerVisible={isDatePickerVisible}
          rules={{required: 'La date de naissance est obligatoire'}}
          showDatePicker={() => setIsDatePickerVisible(true)}
          hideDatePicker={() => setIsDatePickerVisible(false)}
          handleConfirm={() => {
            setIsDatePickerVisible(false);
          }}
          requiredStar
          maximumDate={getMaxAgeDate(18)}
        />
        <View style={styles.phoneContainer}>
          <CustomPhoneInput
            control={control}
            label="Contact d'urgence"
            name="emergency_contact"
            rules={{
              validate: value =>
                value?.trim() != userDetails?.phone_number?.trim() ||
                'Emergency contact can not match phone number',

              maxLength: {
                value: 20,
                message: 'phone number is not greater than 20',
              },
            }}
          />
        </View>
        <CustomRHFDropdown
          placeholder="Sélectionnez votre pays"
          label={'Pays de naissance'}
          data={COUNTRIES}
          control={control}
          search={true}
          name="country"
          requiredStar
          rules={{required: 'Le pays est obligatoire'}}
        />
        <CustomRHFDropdown
          placeholder="Sélectionnez votre ville"
          label="Ville de résidence"
          data={cityOptions}
          control={control}
          search={true}
          name="city"
          disabled={!selectedCountry}
          requiredStar
          rules={{required: 'La ville est obligatoire'}}
        />
        <CustomRHFTextInput
          control={control}
          title="Adresse"
          name="address"
          placeholder="Entrez votre adresse"
          requiredStar
          rules={{
            required: "L'adresse est obligatoire",
          }}
        />
        <ErrorModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          title="Erreur"
          message={errorMessage}
        />
        <InputLabelRow text="Carte d'identité - Recto" requiredStarik />
        <CustomImagePickerSheet
          license
          onChange={img => setIdCard(prev => ({...prev, id_card_front: img}))}
          source={
            idCard?.id_card_front && typeof idCard?.id_card_front !== 'string'
              ? idCard?.id_card_front
              : idCard?.id_card_front
              ? {uri: idCard?.id_card_front}
              : IMAGES.imageUpload
          }
        />
        <InputLabelRow text="Verso de la carte d'identité" requiredStarik />
        <CustomImagePickerSheet
          license
          onChange={img => setIdCard(prev => ({...prev, id_card_back: img}))}
          source={
            idCard?.id_card_back && typeof idCard?.id_card_back !== 'string'
              ? idCard?.id_card_back
              : idCard?.id_card_back
              ? {uri: idCard?.id_card_back}
              : IMAGES.imageUpload
          }
        />
        <CustomButton
          title="Suivant"
          onPress={handleSubmit(onSubmit)}
          loading={setProfileLoading}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.neutral50,
  },
  container: {
    padding: RFValue(15),
    flex: 1,
  },
  imageUpload: {
    width: RFValue(70),
    height: RFValue(70),
    borderRadius: RFValue(100),
    alignSelf: 'center',
    marginVertical: RFValue(10),
  },
  contentContainerStyle: {
    paddingBottom: RFValue(100),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: RFValue(20),
  },
  clickToUpload: {
    fontFamily: FONT.poppins600,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  imageUploadText: {
    color: COLORS.neutral600,
    fontFamily: FONT.poppins600,
    fontWeight: '600',
  },
  phoneContainer: {
    paddingTop: widthPercentageToDP(2),
    paddingBottom: widthPercentageToDP(1),
  },
});

export default ProfileDetails;
