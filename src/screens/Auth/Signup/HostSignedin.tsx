import React, {useState} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import {CustomImage, CustomText, CustomWrapper} from '../../../components';
import {COLORS, FONT, IMAGES} from '../../../utils/theme';
import EmptyScreen from '../../../components/EmptyScreen';
import CarItem from '../../Hosting/components/CarItem';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';
import {navigate} from '../../../utils/navigation';
import {useHostCar} from '../../../hooks/useHostCar';
import SearchScreenSkeleton from '../../../components/Skeleton/SearchScreenSkeleton';
import PendingModal from '../../../components/PendingModal/PendingModal';
import useUserStore from '../../../service/store/user.store';
import {useUserCar} from '../../../hooks/useUserCar';
const HostSignedin = () => {
  const {getHostCars, getHostCarsLoading} = useHostCar();
  const {userDetails} = useUserStore();
  let data = getHostCars?.data?.pages[0]?.data?.cars;
  const [processModal, setProcessModal] = useState({
    isVerified: false,
    isRejected: false,
  });
  const {getUserDetailQuery} = useUserCar();
  console.log(processModal);
  let isVisibleModal = processModal?.isRejected || processModal?.isVerified;
  return (
    <CustomWrapper padding bottomInsert={0.1} backgroundColor={COLORS.white}>
      <CustomText text="Gérer ma voiture" textStyle={styles.title} />
      {getHostCarsLoading ? (
        <View style={styles.loaderContainer}>
          <View style={{paddingVertical: RFValue(0)}}>
            {[1, 2, 3]?.map(i => (
              <View key={i}>
                <SearchScreenSkeleton />
              </View>
            ))}
          </View>
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          scrollEnabled={!!data?.length}
          contentContainerStyle={
            data?.length
              ? styles.contentContainerStyle
              : styles.contentContainerEmptyStyle
          }
          data={data}
          renderItem={({item}) => <CarItem {...item} />}
          ListEmptyComponent={ListEmptyComponent}
        />
      )}
      <CustomImage
        source={IMAGES.plusRoundIcon}
        containerStyle={styles.plusRoundIcon}
        onPressImage={async () => {
          await getUserDetailQuery.refetch();
          let user = getUserDetailQuery.data?.data;
          if (!user?.is_verified == !user?.is_rejected) {
            return setProcessModal(pre => ({...pre, isVerified: true}));
          }
          if (user?.is_rejected) {
            return setProcessModal(pre => ({...pre, isRejected: true}));
          }
          navigate('PublishCar', {});
        }}
      />

      {isVisibleModal && (
        <PendingModal setState={setProcessModal} processModal={processModal} />
      )}
    </CustomWrapper>
  );
};
const ListEmptyComponent = () => (
  <EmptyScreen
    image={IMAGES.addCarIcon}
    title="Ça a l’air vide ici ! Vous n’avez encore publié aucune voiture."
    btnOnPress={() => {}}
    imageContainerStyle={{
      height: widthPercentageToDP(30),
    }}
  />
);
const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingBottom: widthPercentageToDP(30),
  },
  contentContainerEmptyStyle: {
    paddingBottom: widthPercentageToDP(30),
    flex: 1,
  },
  title: {
    paddingVertical: widthPercentageToDP(3),
    fontFamily: FONT.poppins600,
    fontWeight: '600',
    fontSize: RFValue(20),
  },
  plusRoundIcon: {
    position: 'absolute',
    right: widthPercentageToDP(1),
    bottom: widthPercentageToDP(27),
    height: widthPercentageToDP(22),
    width: widthPercentageToDP(22),
  },
  loaderContainer: {},
});

export default HostSignedin;
