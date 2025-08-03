import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import {CompletedOrderCard} from '../../components';
import EmptyScreen from '../../components/EmptyScreen';
import {IMAGES} from '../../utils/theme';
import {useOrders} from '../../hooks/useOrders';
import {navigate} from '../../utils/navigation';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import OrdersSkeleton from '../../components/Skeleton/OrdersSkeleton';
import useUserStore from '../../service/store/user.store';

const Completed = () => {
  const {getOrdersForMyCar, getOrdersForMyCarLoading} = useOrders({
    status: 'Completed',
  });
  const data = getOrdersForMyCar?.data?.pages[0]?.data?.orders || [];
  const {isHost} = useUserStore();
  const HandlePress = (booking: any) => {
    navigate('HostBookingDetails', {id: booking?.id});
    // if (isHost) {
    //   return
    // }

    // USAID SAID THAT

    // if (booking?.is_rating_pending) {
    //   navigate('Reviews', {id: booking?.id});
    //   return;
    // }
    // navigate('HostBookingDetails', {id: booking?.id});
  };
  const loadMore = () => getOrdersForMyCar.refetch();
  return getOrdersForMyCarLoading ? (
    <View style={{paddingVertical: widthPercentageToDP(2)}}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0]?.map(i => {
        return (
          <View style={{paddingVertical: widthPercentageToDP(3)}}>
            <OrdersSkeleton />
          </View>
        );
      })}
    </View>
  ) : (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        // contentContainerStyle={
        //   data?.length != 0 ? styles.container : {flex: 0.5}
        // }
        renderItem={({item}) => (
          <CompletedOrderCard
            {...item}
            handlePress={() => HandlePress(item?.booking)}
          />
        )}
        ListEmptyComponent={ListEmptyComponent}
        keyExtractor={item => item.id.toString()}
        onRefresh={loadMore}
        refreshing={getOrdersForMyCarLoading}
      />
    </View>
  );
};
const ListEmptyComponent = () => {
  return (
    <EmptyScreen image={IMAGES.carIcon} title="Aucune commande terminée" />
  );
};
export default Completed;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
