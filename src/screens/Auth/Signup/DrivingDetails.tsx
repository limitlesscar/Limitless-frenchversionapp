import React, {FC, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {
  CustomButton,
  CustomImagePickerSheet,
  CustomRHFDatePicker,
  CustomRHFTextInput,
  CustomText,
  InfoModal,
  InputLabelRow,
} from '../../../components';
import {FieldValues, useForm} from 'react-hook-form';
import {RFValue} from 'react-native-responsive-fontsize';
import useUserStore from '../../../service/store/user.store';
import {useAuth} from '../../../hooks/useAuth';
import Toast from 'react-native-toast-message';
import {WebView} from 'react-native-webview';
import {navigateReplace, navigateReset} from '../../../utils/navigation';
import {COLORS, IMAGES} from '../../../utils/theme';
import {UserDetailsType} from '../../../utils/types/apiResponseType';

type DrivingDetailsProps = {
  user_type: string;
  webViewUrl: string | null;
  setWebViewUrl: (url: string | null) => void;
};
const DrivingDetails: FC<DrivingDetailsProps> = ({
  user_type,
  webViewUrl,
  setWebViewUrl,
}) => {
  const {userDetails} = useUserStore();

  const {control, handleSubmit, reset} = useForm({
    defaultValues: userDetails as UserDetailsType,
  });

  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState({
    visible: false,
    url: '',
  });
  let accountId: any = userDetails?.host?.stripe_account_id;
  const [showLicenseErrorModal, setShowLicenseErrorModal] = useState(false);

  useEffect(() => {
    if (
      userDetails?.user_type.includes('host') &&
      userDetails?.host_onboarding_status == 'Stripe_Onboarding_Pending'
    ) {
      reCreateStripe(accountId);
    }
  }, []);
  console.log(userDetails?.user_type, userDetails?.host_onboarding_status);
  const HandleSuccessCallback = (url?: string) => {
    setIsModalVisible({visible: false, url: ''});
    if (url) {
      setStripeLoading(true);
      setWebViewUrl(url);
      return;
    }

    navigateReplace('RootStack');
  };
  const {setDrivingDetails, setDrivingDetailsLoading, reCreateStripe} = useAuth(
    {
      successCallback: HandleSuccessCallback,
      modalVisible: setIsModalVisible,
      accountId: accountId,
    },
  );
  useEffect(() => {
    // reset(userDetails);
    if (userDetails?.license_image) {
      setLicenseImage(userDetails?.license_image);
    }
  }, []);

  const onSubmit = (data: FieldValues) => {
    if (!licenseImage) {
      setShowLicenseErrorModal(true);
      Toast.show({
        type: 'error',
        text1: 'Erreur',
        text2: 'L’image du permis est requise',
      });
      return;
    }
    setDrivingDetails({
      license_number: data?.license_number,
      expiry_date: data?.expiry_date,
      license_image: licenseImage,
      user_type: user_type || 'user',
    });
  };

  const [licenseImage, setLicenseImage] = useState<string | undefined>();
  const RETURN_URL = 'https://api.limitless.zenkoders.com';
  const [stripeLoading, setStripeLoading] = useState(false);
  const HandleNavigationStateChange = (event: any) => {
    if (event.url.startsWith(RETURN_URL)) {
      Toast.show({
        type: 'success',
        text1: 'Succès',
        text2: 'Profil créé avec succès !',
      });
      setIsModalVisible({visible: false, url: ''});
      navigateReset('RootStack');
    }
  };
  useEffect(() => {
    setStripeLoading(false);
  }, [webViewUrl]);
  return (
    <View style={styles.container}>
      {stripeLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : !!webViewUrl ? (
        <WebView
          onLoad={() => setStripeLoading(false)}
          style={{flex: 1}}
          source={{uri: webViewUrl}}
          onNavigationStateChange={HandleNavigationStateChange}
        />
      ) : (
        <ScrollView
          style={styles.scrollViewContainer}
          contentContainerStyle={styles.contentContainerStyle}>
          <CustomText
            color={COLORS.black}
            fontSize="S26"
            text={'Informations de conduite'}
            fontWeightPopins="600"
          />
          <CustomRHFTextInput
            control={control}
            title="Numéro de permis"
            name="license_number"
            placeholder="Entrez le numéro de permis"
            requiredStar
            rules={{
              required: 'Le numéro de permis est requis',
              validate: {
                positive: (value: string) =>
                  value.trim().length > 0 || 'Le numéro de permis est requis',
                minLength: (value: string) =>
                  value.trim().length >= 5 ||
                  'Le numéro de permis doit comporter au moins 5 caractères',
                maxLength: (value: string) =>
                  value.trim().length <= 20 ||
                  'Le numéro de permis ne doit pas dépasser 20 caractères',
                pattern: (value: string) =>
                  /^[A-Za-z0-9-]+$/.test(value) ||
                  'Le numéro de permis ne peut contenir que des lettres, des chiffres et des tirets',
              },
            }}
          />
          <Modal
            visible={showLicenseErrorModal}
            transparent
            animationType="fade"
            onRequestClose={() => setShowLicenseErrorModal(false)}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Erreur</Text>
                <Text style={styles.modalMessage}>
                  L’image du permis est requise.
                </Text>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => setShowLicenseErrorModal(false)}>
                  <Text style={styles.modalButtonText}>Fermer</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <CustomRHFDatePicker
            label="Date d’expiration"
            placeholder="MM JJ AAAA"
            control={control}
            name="expiry_date"
            isDatePickerVisible={isDatePickerVisible}
            rules={{required: 'La date d’expiration du permis est requise'}}
            showDatePicker={() => setIsDatePickerVisible(true)}
            hideDatePicker={() => setIsDatePickerVisible(false)}
            handleConfirm={() => {
              setIsDatePickerVisible(false);
            }}
            minimumDate={new Date()}
            requiredStar
          />
          <InputLabelRow text="Permis de conduire" requiredStarik />
          <CustomImagePickerSheet
            license
            source={
              licenseImage && typeof licenseImage === 'string'
                ? {uri: licenseImage}
                : licenseImage
            }
            onChange={img => setLicenseImage(img as any)}
          />
          <CustomButton
            title="Soumettre"
            onPress={handleSubmit(onSubmit)}
            loading={setDrivingDetailsLoading}
          />
        </ScrollView>
      )}
      <InfoModal
        iconImage={IMAGES.walletIcon}
        isVisible={isModalVisible.visible}
        title="Finalisez votre inscription"
        description="Pour terminer votre inscription en tant qu’hôte, liez simplement votre compte bancaire et recevez vos paiements sans interruption."
        btnText="Lier"
        btnOnPress={() => HandleSuccessCallback(isModalVisible.url)}
      />
    </View>
  );
};

export default DrivingDetails;

const styles = StyleSheet.create({
  container: {
    width: widthPercentageToDP(100),
  },
  scrollViewContainer: {
    padding: RFValue(15),
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: RFValue(20),
    borderRadius: RFValue(16),
    width: '80%',
    alignItems: 'flex-start',
    elevation: 5,
  },
  modalTitle: {
    fontSize: RFValue(18),
    fontWeight: 'bold',
    color: 'red',
    marginBottom: RFValue(10),
  },
  modalMessage: {
    fontSize: RFValue(14),
    color: '#333',
    marginBottom: RFValue(20),
  },
  modalButton: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.primary,
    paddingVertical: RFValue(8),
    paddingHorizontal: RFValue(16),
    borderRadius: RFValue(10),
  },
  modalButtonText: {
    color: 'white',
    fontWeight: '600',
  },

  contentContainerStyle: {
    paddingBottom: RFValue(100),
  },
  loaderContainer: {
    minHeight: widthPercentageToDP(52),
    justifyContent: 'center',
  },
});
