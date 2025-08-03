import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import {OrderCard} from '../../components';
import EmptyScreen from '../../components/EmptyScreen';
import {COLORS, IMAGES} from '../../utils/theme';
import {useOrders} from '../../hooks/useOrders';
import {navigate} from '../../utils/navigation';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import OrdersSkeleton from '../../components/Skeleton/OrdersSkeleton';

const Upcoming = () => {
  const {getOrdersForMyCar, getOrdersForMyCarLoading} = useOrders({
    status: 'Upcoming',
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
        data={data}
        // contentContainerStyle={data?.length ? styles.container : {flex: 0.5}}
        renderItem={({item}) => (
          <OrderCard
            {...item}
            handlePress={() => HandlePress(item?.booking?.id)}
          />
        )}
        ListEmptyComponent={ListEmptyComponent}
        ItemSeparatorComponent={ItemSeparator}
        onRefresh={loadMore}
        refreshing={getOrdersForMyCarLoading}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const ListEmptyComponent = () => {
  return <EmptyScreen image={IMAGES.carIcon} title="Aucune commande à venir" />;
};
const ItemSeparator = () => <View style={styles.itemSeparator} />;

export default Upcoming;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemSeparator: {height: 10, backgroundColor: COLORS.white},
});
