import React, {useEffect} from 'react';
import {ActivityIndicator, SectionList, StyleSheet, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {CustomHeader, CustomText, CustomWrapper} from '../../components';
import NotificationItem from './components/NotificationItem';
import {COLORS, FONT} from '../../utils/theme';
import {useNotifications} from '../../hooks/useNotification';
import {transformNotificationData} from '../../utils/helper';
import ChatListSkeleton from '../../components/Skeleton/ChatListSkeleton';
import {useIsFocused} from '@react-navigation/native';

const NotificationScreen = () => {
  const {getNotifications, getNotificationsLoading} = useNotifications();
  const notificationData = getNotifications.data?.pages[0]?.data?.notifications;

  console.log({notificationData});
  useEffect(() => {
    getNotifications.refetch();
  }, []);
  return (
    <CustomWrapper padding backgroundColor={COLORS.white}>
      <CustomHeader title="Notification" />

      {getNotificationsLoading ? (
        [1, 2, 3, 4, 5, 6, 7]?.map(i => {
          return <ChatListSkeleton />;
        })
      ) : (
        <SectionList
          showsVerticalScrollIndicator={false}
          sections={transformNotificationData(notificationData)}
          scrollEnabled={
            transformNotificationData(notificationData)?.length > 0
          }
          renderItem={({item}) => <NotificationItem {...item} />}
          renderSectionHeader={({section: {date}}) => (
            <CustomText text={date} textStyle={styles.date} />
          )}
          ItemSeparatorComponent={() => ItemSeparator()}
          SectionSeparatorComponent={() => SectionSeparator()}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={ListEmptyComponent}
        />
      )}
    </CustomWrapper>
  );
};

const ItemSeparator = () => <View style={styles.itemSeparator} />;

const SectionSeparator = () => <View style={styles.sectionSeparator} />;

const ListEmptyComponent = () => (
  <CustomText
    textStyle={{paddingTop: RFValue(20)}}
    center
    text="Pas de notifications pour le moment"
    color={COLORS.neutral400}
  />
);

export default NotificationScreen;

const styles = StyleSheet.create({
  date: {
    fontFamily: FONT.poppins500,
    fontSize: RFValue(14),
    paddingVertical: widthPercentageToDP(2),
  },
  itemSeparator: {
    paddingVertical: widthPercentageToDP(1.5),
  },
  sectionSeparator: {
    paddingVertical: widthPercentageToDP(1),
  },
  loaderContainer: {
    minHeight: widthPercentageToDP(52),
    justifyContent: 'center',
  },
});
