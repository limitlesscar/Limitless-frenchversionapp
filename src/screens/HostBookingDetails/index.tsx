import {
  ActivityIndicator,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {
  CustomHeader,
  CustomIcon,
  CustomImage,
  CustomText,
  CustomWrapper,
  HostBadge,
  Row,
} from '../../components';
import {useBooking} from '../../hooks/useBooking';
import {COLORS, IMAGES} from '../../utils/theme';
import {useRoute} from '@react-navigation/native';
import {dayjs, formatDate} from '../../utils/dayjs';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';
import useUserStore from '../../service/store/user.store';
import useChatStore from '../../service/store/chat.store';
import {navigate} from '../../utils/navigation';
import SummaryItemRow from '../PublishCar/components/SummaryItemRow';
import {formatStars} from '../../utils/helper';
import DiscriptionSkeleton from '../../components/Skeleton/Discription';

const HostBookingDetails = () => {
  const route = useRoute<any>();
  const {id} = route.params || {};

  const {userDetails} = useUserStore();

  const {getHostBookingById, getHostBookingByIdLoading} = useBooking({
    host_booking_id: id,
  });
  const {setChatId, setChatType, setSenderId, setReceiverId} = useChatStore();

  const data = getHostBookingById?.data?.data;

  const {name, price_per_day, price_per_hour, images} = data || {};
  const {
    start_date_time,
    end_date_time,
    card_brand,
    card_last_four,
    amount,
    status,
    is_rating_pending,
    stars,
  } = data?.booking || {};
  const {
    phone_number,
    emergency_contact,
    full_name,
    profile_picture,
    date_of_birth,
    license_number,
    expiry_date,
  } = data?.user || {};
  const userPhoneNumber = phone_number || emergency_contact;
  const chatId = data?.chat?.id;

  const isBookingCompleted = String(status).toLowerCase() === 'completed';
  const HandleChatNavigation = () => {
    // below if check is only in case app is open is user is loggedout or token is expired
    if (userDetails?.id) {
      setChatId(chatId);
      setReceiverId(data?.user?.id);
      setSenderId(String(userDetails?.id));
      setChatType('As Host');
      navigate('SingleChat', {
        receiver_name: full_name,
      });
    } else {
      navigate('Signin', {});
    }
  };

  return (
    <CustomWrapper padding>
      <CustomHeader
        rightIcon={
          <View style={styles.headerButton}>
            <CustomText
              text="Voir les détails de la voiture"
              fontSize="S10"
              fontWeightPopins="600"
              onPress={() => navigate('CarDetails', {id: data?.id})}
            />
          </View>
        }
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}>
        {getHostBookingByIdLoading ? (
          <DiscriptionSkeleton />
        ) : (
          <>
            <CustomText
              text={name}
              fontSize="S28"
              fontWeightPopins="600"
              center
            />
            <CustomText
              text={`${price_per_day}€ Par jour`}
              fontSize="S14"
              fontWeightPopins="600"
              center
            />
            <CustomText
              text={`${price_per_hour}€ Par heure`}
              fontSize="S14"
              fontWeightPopins="600"
              center
            />
            <CustomText
              text={`${dayjs(start_date_time).format(
                'DD MMM YY, hh:mm A',
              )} - ${dayjs(end_date_time).format('DD MMM YY, hh:mm A')} `}
              fontSize="S12"
              fontWeightPopins="600"
              center
            />
            <CustomImage
              source={{uri: images[0]}}
              containerStyle={styles.carImage}
              resizeMode="cover"
            />
            <CustomText
              text={'Informations utilisateur'}
              fontSize="S16"
              fontWeightPopins="600"
            />
            <View style={styles.hostBadgeRow}>
              <HostBadge name={full_name} picture={profile_picture} />
              {!isBookingCompleted && (
                <Row>
                  <CustomImage
                    source={IMAGES.chatIcon}
                    width={widthPercentageToDP(11)}
                    height={widthPercentageToDP(11)}
                    containerStyle={styles.chatIcon}
                    onPressImage={HandleChatNavigation}
                  />
                  {userPhoneNumber && (
                    <CustomImage
                      source={IMAGES.call}
                      width={widthPercentageToDP(11)}
                      height={widthPercentageToDP(11)}
                      onPressImage={() =>
                        Linking.openURL(`tel:${userPhoneNumber}`)
                      }
                    />
                  )}
                </Row>
              )}
            </View>
            <SummaryItemRow
              title="Date de naissance"
              value={date_of_birth || ''}
            />
            <SummaryItemRow
              title="Contact d'urgence"
              value={emergency_contact || ''}
            />
            <SummaryItemRow
              title="Numéro de permis"
              value={license_number || ''}
            />
            <SummaryItemRow
              title="Date d'expiration"
              value={expiry_date || ''}
            />
            <CustomText
              text={'Informations de paiement'}
              fontSize="S16"
              fontWeightPopins="600"
            />
            <View style={styles.cardRow}>
              <CustomImage
                source={IMAGES.masterCard}
                style={{
                  height: RFValue(22),
                  width: RFValue(22),
                }}
                containerStyle={styles.cardImageContainer}
              />
              <View>
                <CustomText text={`${card_brand}`} />
                <CustomText
                  text={`**** **** **** ${card_last_four}`}
                  color={COLORS.neutral400}
                />
              </View>
            </View>

            {!!isBookingCompleted && (
              <View>
                <CustomText
                  text={'Avis'}
                  fontSize="S16"
                  fontWeightPopins="600"
                />
                {is_rating_pending ? (
                  <CustomText
                    text="En attente"
                    color={COLORS.neutral400}
                    fontSize="S12"
                  />
                ) : (
                  <Row>
                    <CustomText
                      text={`${formatStars(stars)} `}
                      fontSize="S16"
                      fontWeightPopins="600"
                      color={COLORS.neutral400}
                      // center
                    />
                    <CustomIcon
                      type="AntDesign"
                      icon="star"
                      color={COLORS.warning500}
                      size={RFValue(15)}
                      style={{marginBottom: RFValue(5)}}
                    />
                  </Row>
                )}
              </View>
            )}

            <View style={styles.amountRow}>
              <CustomText
                text={'Prix total'}
                fontSize="S16"
                fontWeightPopins="600"
                center
              />
              <CustomText
                text={`${amount}€`}
                fontSize="S16"
                fontWeightPopins="600"
                center
              />
            </View>
          </>
        )}
      </ScrollView>
    </CustomWrapper>
  );
};

export default HostBookingDetails;

const styles = StyleSheet.create({
  contentContainerStyle: {},
  loaderContainer: {},
  carImage: {
    marginVertical: widthPercentageToDP(5),
    borderRadius: RFValue(10),
    maxHeight: widthPercentageToDP(40),
  },
  hostBadgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: widthPercentageToDP(2),
  },
  chatIcon: {
    marginRight: RFValue(10),
  },
  cardRow: {
    flexDirection: 'row',
    gap: 10,
    paddingVertical: widthPercentageToDP(1),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.neutral200,
    borderRadius: RFValue(8),
  },
  cardImageContainer: {alignSelf: 'center', marginRight: RFValue(5)},
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: widthPercentageToDP(2),
  },
  headerButton: {
    backgroundColor: COLORS.neutral100,
    borderRadius: RFValue(10),
    padding: RFValue(8),
  },
});
