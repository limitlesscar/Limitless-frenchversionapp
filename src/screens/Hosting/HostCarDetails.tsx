import React, {useEffect} from 'react';
import {ActivityIndicator, ScrollView, View} from 'react-native';
import {useIsFocused, useRoute} from '@react-navigation/native';

import {
  CarAbout,
  CarDescription,
  CarExtraDetailsSection,
  CarFeatures,
  CarReviews,
  CustomHeader,
  CustomIcon,
  CustomText,
  CustomWrapper,
  InfoModal,
  Row,
} from '../../components';
import CarCarousel from './components/CarCarousel';
import CarRating from './components/CarRating';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import {IMAGES} from '../../utils/theme';
import {useHostCar} from '../../hooks/useHostCar';
import {navigate, navigateReset} from '../../utils/navigation';
import {CarReviewType} from '../../components/CarDetailsComponents/interface';
import useUserStore from '../../service/store/user.store';
import DiscriptionSkeleton from '../../components/Skeleton/Discription';

const HostCarDetails = () => {
  const route = useRoute<any>();
  const {id} = route.params || {};
  const [showModal, setShowModal] = React.useState(false);
  const [modalMessage, setModalMessage] = React.useState('');
  const {userDetails} = useUserStore();
  const {
    getHostCarDetails,
    unpublishCar,
    unpublishCarLoading,
    getHostCarDetailsLoading,
  } = useHostCar({
    id: id,
    successCallback: setModalMessage,
  });
  const focus = useIsFocused();

  useEffect(() => {
    focus && getHostCarDetails.refetch();
  }, [focus]);
  const data = getHostCarDetails?.data?.data?.car;
  const about = getHostCarDetails?.data?.about || [];
  const ratings = getHostCarDetails?.data?.data?.starsbyCount || [];
  const bookings: CarReviewType[] = data?.bookings || [];
  const {name, images, description} = data || {};
  const dataForEditCar = {
    car: {
      ...data,
      luggage_capacity: Number(data?.luggage_capacity),
      maximum_passengers: Number(data?.maximum_passengers),
    },
    about: about,
    ratings: ratings,
    bookings: bookings,
  };

  const HandleUnpublish = () => {
    setShowModal(true);
    unpublishCar({
      id: id,
      type: data?.is_unpublished ? 'Republish' : 'Unpublish',
    });
  };

  const HandleOk = () => {
    setShowModal(false);
    setModalMessage('');
    navigateReset('RootStack');
  };

  return (
    <CustomWrapper padding bottomInsert={-1}>
      <InfoModal
        isVisible={showModal}
        title={
          unpublishCarLoading ? (
            <ActivityIndicator size={'large'} />
          ) : (
            modalMessage || ''
          )
        }
        iconImage={IMAGES.right}
        btnText="Retour à l’accueil"
        btnOnPress={() => (unpublishCarLoading ? () => {} : HandleOk())}
      />
      <CustomHeader
        rightIcon={
          data?.host?.id == userDetails?.host?.id && (
            <Menu>
              <MenuTrigger
                style={{
                  width: RFValue(30),
                  alignSelf: 'center',
                  alignItems: 'center',
                }}>
                <CustomIcon
                  type="Entypo"
                  icon="dots-three-vertical"
                  size={RFValue(16)}
                />
              </MenuTrigger>
              <MenuOptions
                optionsContainerStyle={{
                  borderRadius: RFValue(15),
                  padding: RFValue(10),
                }}>
                <MenuOption
                  onSelect={() =>
                    navigate('PublishCar', {
                      data: dataForEditCar,
                    })
                  }
                  style={{
                    borderRadius: RFValue(10),
                  }}>
                  <Row justifyContent="space-between">
                    <CustomText
                      text="Modifier"
                      fontWeightPopins="400"
                      fontSize="S14"
                    />

                    <CustomIcon
                      icon={'pencil-outline'}
                      type={'MaterialCommunityIcons'}
                      size={RFValue(16)}
                    />
                  </Row>
                </MenuOption>
                <MenuOption
                  onSelect={HandleUnpublish}
                  style={{
                    borderRadius: RFValue(10),
                  }}>
                  <Row justifyContent="space-between">
                    <CustomText
                      text={
                        unpublishCarLoading
                          ? 'Chagement '
                          : data?.is_unpublished
                          ? 'Publier'
                          : 'Dépublier'
                      }
                      fontWeightPopins="400"
                      fontSize="S14"
                    />
                    {data?.is_unpublished ? (
                      <CustomIcon
                        icon={'done'}
                        type={'MaterialIcons'}
                        size={RFValue(18)}
                      />
                    ) : (
                      <CustomIcon
                        icon={'cross'}
                        type={'Entypo'}
                        size={RFValue(18)}
                      />
                    )}
                  </Row>
                </MenuOption>
              </MenuOptions>
            </Menu>
          )
        }
      />
      {getHostCarDetailsLoading ? (
        <DiscriptionSkeleton />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <CustomText text={name} fontWeightPopins="600" fontSize="S22" />
          <CarCarousel images={images} />
          <CarDescription description={description || ''} />
          <CarAbout data={about} />
          <CarExtraDetailsSection data={data} />
          {data?.features?.length && <CarFeatures data={data?.features} />}
          <CarRating data={ratings} />
          {!!bookings.length && <CarReviews reviews={bookings} />}
        </ScrollView>
      )}
    </CustomWrapper>
  );
};

export default HostCarDetails;
