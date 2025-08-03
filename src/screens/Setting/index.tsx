import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {widthPercentageToDP} from 'react-native-responsive-screen';

import {LogoutModal, CustomText, CustomWrapper} from '../../components';
import ProfileItem from './components/ProfileItem';
import {COLORS, IMAGES} from '../../utils/theme';
import {ProfileList} from './components/ProfileItem/interface';
import useUserStore from '../../service/store/user.store';
import {navigateReset} from '../../utils/navigation';
import {useAuth} from '../../hooks/useAuth';
import {useNotifications} from '../../hooks/useNotification';
import {queryClient} from '../../..';
import {useUserCar} from '../../hooks/useUserCar';
import {useIsFocused} from '@react-navigation/native';

const SettingScreen = () => {
  const {getUserDetailQuery} = useUserCar();
  const {setAccessToken, setUserDetails, accessToken, userDetails} =
    useUserStore();
  // console.log({accessToken});

  // console.log('====>>>>>>>', userDetails?.notification_preference);
  let data: ProfileList[] = [
    {
      icon: IMAGES.helpCenter,
      title: 'Aller au centre d’aide',
      path: 'HelpCenter',
    },
  ];

  const {logout} = useAuth();
  const {setNotificationSwitch} = useNotifications();

  if (accessToken) {
    data = [
      {
        icon: IMAGES.notificationsIcon,
        title: 'Notifications',
        pref: userDetails?.notification_preference,
        isDisable: 'InApp',
        isEnable: 'Push',
        callback: setNotificationSwitch,
      },
      {icon: IMAGES.myOrder, title: 'Mes commandes', path: 'MyOrders'},

      {
        icon: IMAGES.orderFromCar,
        title: 'Commandes pour mes voitures',
        path: 'OrderForMyCar',
      },
      {
        icon: IMAGES.editProfile,
        title: 'Modifier le profil',
        path: 'EditProfile',
      },
      {
        icon: IMAGES.changePassword,
        title: 'Changer le mot de passe',
        path: 'ChangePassword',
      },
      {
        icon: IMAGES.drivingDetails,
        title: 'Détails de conduite',
        path: 'DrivingDetails',
      },
      {
        icon: IMAGES.helpCenter,
        title: "Aide et centre d'aide",
        path: 'HelpCenter',
      },

      {
        icon: IMAGES.logout,
        title: 'Logout',
        callback: () => setShowLogout(true),
      },
    ];
  }
  const [showLogout, setShowLogout] = useState(false);

  const HandleLogout = async () => {
    logout({
      id: userDetails?.id as number,
      fcm_token: userDetails?.fcmToken ? userDetails?.fcmToken : null,
    });

    setShowLogout(!showLogout);
  };
  return (
    <CustomWrapper backgroundColor={COLORS.white} padding>
      <View style={styles.header}>
        <CustomText text="Paramètres" center fontWeightPopins="600" />
      </View>
      <LogoutModal
        isVisible={showLogout}
        onCancel={() => setShowLogout(!showLogout)}
        onLogout={HandleLogout}
        logoutLoading={false}
      />
      <FlatList
        scrollEnabled={!!accessToken}
        data={data}
        renderItem={({item, index}) => <ProfileItem data={item} />}
        ItemSeparatorComponent={ItemSeparator}
      />
    </CustomWrapper>
  );
};

const ItemSeparator = () => {
  return <View style={styles.separator} />;
};
const styles = StyleSheet.create({
  separator: {height: RFValue(10)},
  header: {
    paddingVertical: widthPercentageToDP(5),
  },
});

export default SettingScreen;
