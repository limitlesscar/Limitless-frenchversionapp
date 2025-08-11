import React, {FC, useEffect} from 'react';

import {FlatList, Platform, ScrollView, StyleSheet, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {
  CustomButton,
  CustomImage,
  CustomText,
  InputLabelRow,
} from '../../components';
import {COLORS, FONT} from '../../utils/theme';
import SummaryItemRow from './components/SummaryItemRow';
import usePublishCarStore from '../../service/store/publishCar.store';
import {PublishCarChildProps} from './interface';
import {useHostCar} from '../../hooks/useHostCar';
import {formatDateFrench} from '../../utils/dayjs';
import useOffsetDate from '../../service/hooks/useOffsetDate';
import {
  CAR_FEATURES,
  ENGINE_TYPES,
  TRANSMISSION_TYPES,
  VEHICLE_TYPES,
} from '../../utils/constants';

const SummaryReview: FC<PublishCarChildProps | any> = ({data}) => {
  const {carInfo, carSpecification, carFeatures} = usePublishCarStore();

  const {encodeTime} = useOffsetDate();
  const {
    images,
    name,
    brand,
    description,
    price_per_day,
    price_per_hour,
    vehicle_type,
    country_of_manufacture,
    city_of_registeration,
  } = carInfo || {};
  const {
    color_code,
    mileage,
    engine_type,
    transmission_type,
    fuel_economy,
    available_start_date,
    available_end_date,
    available_start_time,
    available_end_time,
    pickup_address,
    dropoff_address,
  } = carSpecification || ({} as any);
  const {
    features,
    maximum_passengers,
    luggage_capacity,
    insurance_included,
    pet_policy,
    smoking_policy,
  } = carFeatures || ({} as any);
  const {publishCar, publishCarLoading, updateCar, updateCarLoading} =
    useHostCar();
  const handleSubmit = () => {
    if (data?.car?.id) {
      updateCar({
        id: data?.car?.id,
        carDetails: {
          ...carInfo,
          ...carSpecification,
          ...carFeatures,
        },
        images: carInfo?.images,
        encodeTime,
      });
      return;
    }
    console.log(
      '🚀 ~ handleSubmit ~ carFeatures:',
      JSON.stringify(carSpecification, null, 2),
    );
    carSpecification;
    publishCar({
      carDetails: {
        ...carInfo,
        ...carSpecification,
        ...carFeatures,
      },
      images: carInfo?.images,
      encodeTime,
    });
  };
  return (
    <View style={{width: widthPercentageToDP(100)}}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}>
        <CustomText
          text="Informations sur la voiture"
          fontWeightPopins="600"
          fontSize="S16"
        />
        <View style={{flex: 1}}>
          <InputLabelRow text="Photos de la voiture" />
          <FlatList
            contentContainerStyle={styles.contentContainer}
            keyExtractor={(_, index) => index.toString()}
            numColumns={4}
            data={carInfo?.images}
            renderItem={({item}: any) => {
              return (
                <View style={styles.item}>
                  <CustomImage
                    source={{uri: item?.path || item}}
                    style={styles.carImageStyle}
                    resizeMode="cover"
                  />
                </View>
              );
            }}
          />
          <SummaryItemRow title="Modèle de la voiture" value={name || ''} />
          <SummaryItemRow title="Marque" value={brand || ''} />
          <SummaryItemRow title="Description" value={description || ''} />
          <SummaryItemRow title="Prix par jour" value={`€${price_per_day}`} />
          <SummaryItemRow title="Prix par heure" value={`€${price_per_hour}`} />
          <SummaryItemRow
            title="Type de véhicule"
            value={
              VEHICLE_TYPES.find(item => item.value === vehicle_type)?.label ||
              vehicle_type ||
              ''
            }
          />
          <SummaryItemRow
            title="Pays de fabrication"
            value={country_of_manufacture || ''}
          />
          <SummaryItemRow
            title="Ville d’immatriculation"
            value={city_of_registeration || ''}
          />
          <View style={styles.headingContainer}>
            <CustomText
              text="Spécifications"
              fontWeightPopins="600"
              fontSize="S16"
            />
          </View>
          <SummaryItemRow
            title="Couleur de la voiture"
            value={color_code}
            isColor={true}
          />
          <SummaryItemRow title="Kilométrage" value={`${mileage} `} />
          <SummaryItemRow
            title="Type de moteur"
            value={
              ENGINE_TYPES.find(item => item.value === engine_type)?.label ||
              engine_type ||
              ''
            }
          />
          <SummaryItemRow
            title="Type de transmission"
            value={
              TRANSMISSION_TYPES.find(v => v.value === transmission_type)
                ?.label || ''
            }
          />
          <SummaryItemRow
            title="Consommation de carburant"
            value={`${fuel_economy} mpg`}
          />
          <SummaryItemRow
            title="Dates de réservation"
            value={`${formatDateFrench(
              available_start_date,
              'DD MMM YYYY',
            )} ${formatDateFrench(
              available_start_time,
              'hh:mm A',
            )}  - ${formatDateFrench(
              available_end_date,
              'DD MMM YYYY',
            )} ${formatDateFrench(available_end_time, 'hh:mm A')}`}
          />

          <SummaryItemRow title="Lieu de dépôt" value={dropoff_address || ''} />
          <SummaryItemRow
            title="Lieu de prise en charge"
            value={pickup_address || ''}
          />
          <View style={styles.headingContainer}>
            <CustomText
              text="Caractéristiques et détails"
              fontWeightPopins="600"
              fontSize="S16"
            />
          </View>

          <SummaryItemRow
            title="Caractéristiques"
            value={
              features?.length
                ? features
                    .map((featureValue: string) => {
                      const featureObj = CAR_FEATURES.find(
                        f => f.value === featureValue,
                      );
                      return featureObj ? featureObj.label_fr : featureValue; // fallback to value if no match
                    })
                    .join(', ')
                : 'Aucune'
            }
          />
          <SummaryItemRow
            title="Nombre maximum de passagers"
            value={String(maximum_passengers || 1)}
          />
          <SummaryItemRow
            title="Capacité de bagages"
            value={String(luggage_capacity)}
          />
          <SummaryItemRow
            title="Assurance incluse"
            value={insurance_included ? 'Oui' : 'Non'}
          />
          <SummaryItemRow
            title="Politique concernant les animaux"
            value={pet_policy ? 'Autorisé' : 'Interdit'}
          />
          <SummaryItemRow
            title="Politique de tabagisme"
            value={smoking_policy ? 'Autorisé' : 'Interdit'}
          />
          <CustomButton
            title="Envoyer les informations"
            onPress={handleSubmit}
            loading={publishCarLoading || updateCarLoading}
          />
        </View>
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
  contentContainer: {
    paddingVertical: widthPercentageToDP(2),
  },
  item: {
    width: widthPercentageToDP(Platform.OS === 'ios' ? 21.5 : 21),
    height: widthPercentageToDP(Platform.OS === 'ios' ? 20 : 20),

    marginRight: widthPercentageToDP(0.5),
    marginLeft: widthPercentageToDP(1),
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  carImageStyle: {
    width: RFValue(Platform.OS === 'ios' ? 65 : 75),
    height: RFValue(Platform.OS === 'ios' ? 58 : 60),
    borderRadius: RFValue(10),
    marginHorizontal: widthPercentageToDP(Platform.OS === 'ios' ? 1.5 : 0.4),
  },
  headingContainer: {
    marginVertical: widthPercentageToDP(3),
  },
});

export default SummaryReview;
