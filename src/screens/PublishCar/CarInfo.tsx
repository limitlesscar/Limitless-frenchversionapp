import React, {FC, useEffect, useState} from 'react';

import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {FieldValues, useForm, useWatch} from 'react-hook-form';
import {
  CustomButton,
  CustomRHFDropdown,
  CustomRHFTextInput,
  CustomText,
  InputLabelRow,
} from '../../components';
import {COUNTRIES, getCities} from '../../utils/countries';
import {COLORS, FONT} from '../../utils/theme';
import CarImagePicker from './components/CarImagePicker';
import usePublishCarStore from '../../service/store/publishCar.store';
import {PublishCarChildProps} from './interface';
import {BRANDS, VEHICLE_TYPES} from '../../utils/constants';

const CarInfo: FC<PublishCarChildProps> = ({
  scrollRef,
  setCurrentIndex,
  data,
}) => {
  const {control, handleSubmit, reset, resetField} = useForm();
  const {setCarInfo} = usePublishCarStore();

  const [cityOptions, setCityOptions] = useState([]);
  const selectedCountry = useWatch({control, name: 'country_of_manufacture'});
  const [images, setImages] = useState(Array.from({length: 7}));
  const [errors, setErrors] = useState<{
    car_images: string | undefined;
  }>({
    car_images: undefined,
  });

  const HandleNext = (formData: FieldValues) => {
    if (Object.values(errors).filter(Boolean).length > 0) {
      return;
    }
    const payload = {
      ...formData,
      images: images.filter(image => image),
    };
    setCarInfo(payload as any); // will change any to proper type once api is implemented as it will be according to api response
    setCurrentIndex(1);
    scrollRef.current?.scrollToIndex({index: 1, animated: true});
  };

  const onSubmit = (formData: FieldValues) => {
    HandleNext(formData);
  };

  useEffect(() => {
    if (selectedCountry) {
      const cities = getCities(selectedCountry);
      setCityOptions(cities || []);
      resetField('city_of_registeration', undefined);
    } else {
      setCityOptions([]);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (data?.car?.id) {
      let formData = JSON.parse(JSON.stringify(data?.car));
      let formImages = formData?.images || [];
      formImages.push(...Array.from({length: Number(7 - formImages?.length)}));
      setImages(formImages);
      let formDataToReset = {
        name: data?.car?.name,
        brand: data?.car?.brand,
        description: data?.car?.description,
        price_per_day: String(data?.car?.price_per_day),
        price_per_hour: String(data?.car?.price_per_hour),
        vehicle_type: data?.car?.vehicle_type,
        country_of_manufacture: data?.car?.country_of_manufacture,
        city_of_registeration: data?.car?.city_of_registeration,
      };
      reset(formDataToReset);
    }
  }, [data?.car?.id]);
  return (
    <View style={{flex: 1, width: widthPercentageToDP(100)}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets={true}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyle}>
        <InputLabelRow
          text="Photos de la voiture"
          requiredStarik
          rightText="(Max 7 Photos)"
        />
        <CarImagePicker
          images={images}
          setImages={e => {
            setErrors({...errors, car_images: undefined});
            setImages(e);
          }}
        />
        {!!errors.car_images && (
          <View style={styles.errorContainer}>
            <CustomText
              color={COLORS.error600}
              textStyle={styles.errorText}
              text={errors.car_images}
            />
          </View>
        )}
        <CustomRHFTextInput
          control={control}
          title="Modèle de la voiture"
          name="name"
          placeholder="A3 , Q5 , R8"
          requiredStar
          rules={{
            required: 'Le Modèle est obligatoire',
            validate: {
              positive: (value: string) =>
                value.trim().length > 0 || 'Le modèle est obligatoire',
              min: (value: string) =>
                value.trim().length >= 2 ||
                'Le modèle doit contenir au moins 2 caractères.',
              max: (value: string) =>
                value.trim().length < 16 ||
                'Le modèle ne doit pas dépasser 15 caractères.',
            },
          }}
        />
        <CustomRHFDropdown
          placeholder="Sélectionnez la marque"
          label="Marque"
          data={BRANDS}
          control={control}
          name="brand"
          requiredStar
          rules={{required: 'Le nom de la marque est obligatoire'}}
        />

        <CustomRHFTextInput
          control={control}
          numberOfLines={3}
          multiline={true}
          title="Description de la voiture"
          name="description"
          placeholder="Entrez la description de la voiture"
          requiredStar
          rules={{
            required: 'La description de la voiture est obligatoire',
            validate: {
              positive: (value: string) =>
                value.trim().length > 0 ||
                'La description de la voiture est obligatoire',
              minLength: (value: string) =>
                value.trim().length >= 10 ||
                'La description doit contenir au moins 10 caractères',
              maxLength: (value: string) =>
                value.trim().length < 250 ||
                'La description ne doit pas dépasser 250 caractères',
            },
          }}
          style={styles.descriptionInput}
        />
        <CustomRHFTextInput
          control={control}
          keyboardType="numeric"
          title="Prix par jour"
          name="price_per_day"
          placeholder="Entrez le prix"
          requiredStar
          rules={{
            required: 'Le prix par jour est obligatoire',
            validate: {
              positive: (value: string) =>
                value.trim().length > 0 || 'Le prix par jour est obligatoire',
              int: (value: string) =>
                (/^([1-9]\d*)(\.\d+)?$/.test(value) &&
                  Number(value) < 500000) ||
                'Prix invalide, le prix doit être un nombre positif',
            },
          }}
        />

        <CustomRHFTextInput
          control={control}
          keyboardType="numeric"
          title="Prix à l’heure"
          name="price_per_hour"
          placeholder="Saisissez le prix"
          requiredStar
          rules={{
            required: 'Le prix à l’heure est requis',
            validate: {
              positive: (value: string) =>
                value.trim().length > 0 || 'Le prix à l’heure est requis',
              int: (value: string) =>
                (/^([1-9]\d*)(\.\d+)?$/.test(value) &&
                  Number(value) < 500000) ||
                'Prix invalide, veuillez saisir un nombre positif',
            },
          }}
        />
        <CustomRHFDropdown
          label="Type de véhicule"
          placeholder="Sélectionnez le type de véhicule"
          data={VEHICLE_TYPES?.filter(val => val.label !== 'Tous')}
          control={control}
          name="vehicle_type"
          requiredStar
          rules={{required: 'Le type de véhicule est obligatoire'}}
        />
        <CustomRHFDropdown
          label="Pays d’immatriculation"
          placeholder="Sélectionnez le pays d’immatriculation"
          data={COUNTRIES}
          control={control}
          name="country_of_manufacture"
          requiredStar
          rules={{required: 'Le pays d’immatriculation est obligatoire'}}
        />
        <CustomRHFDropdown
          label="Ville"
          placeholder="Sélectionnez une ville"
          data={cityOptions}
          control={control}
          name="city_of_registeration"
          disabled={!selectedCountry}
          requiredStar
          rules={{required: 'La ville est obligatoire'}}
        />

        <CustomButton
          title="Suivant"
          onPress={() => {
            setErrors({
              car_images:
                images.filter(image => image).length < 1
                  ? 'Les photos de la voiture sont obligatoires'
                  : undefined,
            });
            handleSubmit(onSubmit)();
          }}
          containerStyle={styles.nextBtn}
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
    padding: RFValue(13),
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
    paddingBottom: RFValue(Platform.OS === 'ios' ? 40 : 60),
    flexGrow: 1,
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
  descriptionInput: {
    minHeight: RFValue(80),
    padding: RFValue(14),
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    textAlignVertical: 'top',
    color: COLORS.black,
  },
  nextBtn: {
    marginTop: RFValue(20),
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: heightPercentageToDP(-1),
    marginBottom: heightPercentageToDP(1),
    marginLeft: RFValue(0.93),
  },

  errorText: {
    fontFamily: FONT.poppinsRegular,
    fontSize: RFValue(9.5),
  },
});

export default CarInfo;
