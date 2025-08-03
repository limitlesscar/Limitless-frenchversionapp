import React, {FC, useEffect, useState} from 'react';

import {ScrollView, StyleSheet, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {FieldValues, useForm} from 'react-hook-form';
import {
  CustomButton,
  CustomRHFTextInput,
  CustomToggleRow,
  InputLabelRow,
} from '../../components';
import {COLORS, FONT} from '../../utils/theme';
import CarFeatures from './components/FeaturesBadge';
import {PublishCarChildProps} from './interface';
import usePublishCarStore from '../../service/store/publishCar.store';

const FeaturesAndDetails: FC<PublishCarChildProps> = ({
  scrollRef,
  setCurrentIndex,
  data,
}) => {
  const {control, handleSubmit, reset} = useForm();
  const {setCarFeatures} = usePublishCarStore();

  const [insuranceIncluded, setInsuranceIncluded] = useState(true);
  const [petPolicy, setPetPolicy] = useState(false);
  const [smokingPolicy, setSmokingPolicy] = useState(false);
  const [activeBadges, setActiveBadges] = useState<string[]>([]);

  const toggleSwitch = (type: string) => {
    if (type === 'insurance') {
      setInsuranceIncluded(previousState => !previousState);
    } else if (type === 'pet') {
      setPetPolicy(previousState => !previousState);
    } else if (type === 'smoking') {
      setSmokingPolicy(previousState => !previousState);
    }
  };

  const HandleNext = (formData: FieldValues) => {
    const payload = {
      ...formData,
      features: activeBadges,
      insurance_included: insuranceIncluded,
      pet_policy: petPolicy,
      smoking_policy: smokingPolicy,
    };
    setCarFeatures(payload as any); // will change any to proper type once api is implemented as it will be according to api response
    setCurrentIndex(3);
    scrollRef.current?.scrollToIndex({index: 3, animated: true});
  };

  const onSubmit = (formData: FieldValues) => {
    HandleNext(formData);
  };

  useEffect(() => {
    if (data?.car?.id) {
      setInsuranceIncluded(data.car?.insurance_included);
      setPetPolicy(data.car?.pet_policy);
      setSmokingPolicy(data.car?.smoking_policy);
      setActiveBadges(data.car?.features);
      const formDataToReset = {
        maximum_passengers: data.car?.maximum_passengers?.toString(),
        luggage_capacity: data.car?.luggage_capacity?.toString(),
      };
      reset(formDataToReset);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.car?.id]);

  return (
    <View style={{width: widthPercentageToDP(100)}}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}>
        <InputLabelRow text={'Fonctionnalités'} requiredStarik />
        <CarFeatures
          activeBadges={activeBadges}
          setActiveBadges={setActiveBadges}
        />
        <CustomRHFTextInput
          control={control}
          keyboardType="numeric"
          title="Nombre maximum de passagers"
          name="maximum_passengers"
          placeholder="Entrez la capacité de passagers"
          requiredStar
          rules={{
            required: 'Le nombre de passagers est requis',
            validate: {
              positive: (value: string) =>
                value.trim().length > 0 || 'Le nombre de passagers est requis',
              min: (value: string) =>
                isNaN(Number(value))
                  ? 'Nombre invalide'
                  : Number(value) >= 2 || 'Le minimum est de 2 passagers',
              max: (value: string) =>
                isNaN(Number(value))
                  ? 'Nombre invalide'
                  : Number(value) < 21 ||
                    'Le nombre de passagers doit être inférieur ou égal à 20',
            },
          }}
        />

        <CustomRHFTextInput
          control={control}
          keyboardType="numeric"
          title="Capacité de bagages"
          name="luggage_capacity"
          placeholder="Entrez la capacité de bagages"
          requiredStar
          rules={{
            required: 'La capacité de bagages est requise',
            validate: {
              positive: (value: string) =>
                value.trim().length > 0 || 'La capacité de bagages est requise',
              max: (value: string) =>
                isNaN(Number(value))
                  ? 'Nombre invalide'
                  : Number(value) < 150 ||
                    'La capacité maximale doit être inférieure à 150',
            },
          }}
        />

        <CustomToggleRow
          label="Assurance incluse"
          activeText={'Oui'}
          inActiveText={'Non'}
          isActive={insuranceIncluded}
          toggleSwitch={() => toggleSwitch('insurance')}
        />

        <CustomToggleRow
          label="Politique animaux"
          activeText={'Autorisé'}
          inActiveText={'Interdit'}
          isActive={petPolicy}
          toggleSwitch={() => toggleSwitch('pet')}
        />

        <CustomToggleRow
          label="Politique fumeurs"
          activeText={'Autorisé'}
          inActiveText={'Interdit'}
          isActive={smokingPolicy}
          toggleSwitch={() => toggleSwitch('smoking')}
        />

        <CustomButton
          title="Résumé de la révision"
          onPress={handleSubmit(onSubmit)}
          containerStyle={styles.reviewBtn}
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
  reviewBtn: {
    marginTop: widthPercentageToDP(3),
  },
});

export default FeaturesAndDetails;
