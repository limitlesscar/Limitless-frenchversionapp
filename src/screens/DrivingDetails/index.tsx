import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {
  CustomButton,
  CustomHeader,
  CustomRHFDatePicker,
  CustomRHFTextInput,
  CustomWrapper,
  InputLabelRow,
  RoundedBadge,
} from '../../components';
import {FieldValues, useForm} from 'react-hook-form';
import {RFValue} from 'react-native-responsive-fontsize';
import {COLORS} from '../../utils/theme';
import useUserStore from '../../service/store/user.store';
import {useAuth} from '../../hooks/useAuth';
import {formatDate} from '../../utils/dayjs';

const DrivingDetails = () => {
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  const {control, handleSubmit} = useForm();
  const {userDetails} = useUserStore();
  const {updateDrivingDetails, updateDrivingDetailsLoading} = useAuth();

  const onSubmit = ({expiry_date}: FieldValues) => {
    updateDrivingDetails({
      expiry_date: formatDate(expiry_date, 'YYYY-MM-DD'),
    });
  };
  return (
    <CustomWrapper backgroundColor={COLORS.white} padding>
      <CustomHeader title="Détails de conduite" />
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollViewContainer}
          contentContainerStyle={styles.contentContainerStyle}>
          <CustomRHFTextInput
            control={control}
            canEdit={!String(userDetails?.license_number).length}
            editable={!String(userDetails?.license_number).length}
            disabled={!!String(userDetails?.license_number).length}
            defaultValue={userDetails?.license_number}
            title="Numéro de permis"
            name="license_number"
            placeholder="Entrez le numéro de permis"
            requiredStar
            rules={{
              required: 'Le numéro de permis est requis',
              validate: {
                positive: (value: string) =>
                  value.trim().length > 0 || 'Le numéro de permis est requis',
              },
            }}
          />
          <CustomRHFDatePicker
            label="Date d'expiration"
            placeholder="MM DD YYYY"
            control={control}
            defaultValue={new Date(userDetails?.expiry_date || new Date())}
            name="expiry_date"
            isDatePickerVisible={isDatePickerVisible}
            rules={{ required: "La date d'expiration du permis est requise" }}
            showDatePicker={() => setIsDatePickerVisible(true)}
            hideDatePicker={() => setIsDatePickerVisible(false)}
            handleConfirm={() => {
              setIsDatePickerVisible(false);
            }}
            minimumDate={new Date()}
            requiredStar
          />
          <InputLabelRow text="Permis" requiredStarik />
          <View style={{maxWidth: widthPercentageToDP(30)}}>
            <RoundedBadge title="Vérifié"  disabled />
          </View>
        </ScrollView>
        <View style={{paddingBottom: RFValue(10)}}>
          <CustomButton
            title="Valider"
            onPress={handleSubmit(onSubmit)}
            loading={updateDrivingDetailsLoading}
          />
        </View>
      </View>
    </CustomWrapper>
  );
};

export default DrivingDetails;

const styles = StyleSheet.create({
  container: {
    // width: widthPercentageToDP(100),
    flex: 1,
  },
  scrollViewContainer: {
    flex: 1,
  },

  contentContainerStyle: {
    paddingBottom: RFValue(100),
  },
});
