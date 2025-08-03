import React from 'react';
import {FlatList, StyleSheet, View, RefreshControl} from 'react-native';
import {OrderCard} from '../../components';
import EmptyScreen from '../../components/EmptyScreen';
import {COLORS, IMAGES} from '../../utils/theme';
import {useOrders} from '../../hooks/useOrders';
import {navigate} from '../../utils/navigation';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import OrdersSkeleton from '../../components/Skeleton/OrdersSkeleton';
const Ongoing = () => {
  const {getOrdersForMyCar, getOrdersForMyCarLoading} = useOrders({
    status: 'Ongoing',
  });
  const data = getOrdersForMyCar?.data?.pages[0]?.data?.orders || [];
  const HandlePress = (id: string) => {
    navigate('HostBookingDetails', {id});
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
        // contentContainerStyle={data?.length ? styles.container : {flex: 0.5}}
        renderItem={({item}) => (
          <OrderCard
            {...item}
            handlePress={() => HandlePress(item?.booking?.id)}
          />
        )}
        ItemSeparatorComponent={ItemSeparator}
        ListEmptyComponent={ListEmptyComponent}
        keyExtractor={item => item.id.toString()}
        refreshControl={
          <RefreshControl
            onRefresh={loadMore}
            refreshing={getOrdersForMyCarLoading}
          />
        }
      />
    </View>
  );
};
const ItemSeparator = () => <View style={styles.itemSeparator} />;
const ListEmptyComponent = () => {
  return (
    <EmptyScreen image={IMAGES.carIcon} title="Aucune commande en cours" />
  );
};
export default Ongoing;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  itemSeparator: {height: 10, backgroundColor: COLORS.white},
});
