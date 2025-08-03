import React, {useEffect} from 'react';
import {Linking, StyleSheet, View} from 'react-native';
import {CustomImage, Row} from '../../../../components';
import {IMAGES} from '../../../../utils/theme';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {CustomIcon} from '../../../../components/CustomIcon';
import {navigate} from '../../../../utils/navigation';
import {RFValue} from 'react-native-responsive-fontsize';
import useUserStore from '../../../../service/store/user.store';
import {useUserCar} from '../../../../hooks/useUserCar';
import {getUserLocation} from '../../../../utils/helper';
import {useLocation} from '../../../../hooks/useLocation';
import {useIsFocused} from '@react-navigation/native';

const HomeHeader = () => {
  const {userDetails, setUserDetails}: any = useUserStore();
  const {getUserDetailQuery} = useUserCar();
  const stripeDashboardLink = userDetails?.host?.dashboard_login_link;
  const focus = useIsFocused();

  useEffect(() => {
    const handle = async () => {
      await getUserDetailQuery.refetch()?.then(data => {
        setUserDetails({...userDetails, ...data.data?.data});
      });
    };
    handle();
  }, []);

  return (
    <View style={styles.container}>
      <CustomImage
        source={IMAGES.logoBlack}
        width={widthPercentageToDP(13)}
        height={widthPercentageToDP(13)}
        onPressImage={() => navigate('Home')}
      />
      <Row>
        {!!stripeDashboardLink && (
          <CustomIcon
            type="FontAwesome5"
            icon="euro-sign"
            style={styles.euroSign}
            onPress={() => Linking.openURL(stripeDashboardLink)}
          />
        )}
        <CustomIcon
          type="Ionicons"
          icon="notifications-outline"
          onPress={() => {
            if (!getUserDetailQuery?.data) {
              return navigate('Signin');
            } else {
              navigate('Notification');
            }
          }}
        />
      </Row>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: widthPercentageToDP(3),
  },
  euroSign: {
    marginRight: RFValue(10),
  },
});
