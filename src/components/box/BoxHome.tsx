import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
  ActivityIndicator,
} from 'react-native';
import {COLORS} from '../../utils/theme';
import useUserStore from '../../service/store/user.store';
import carImage from '../../assets/images/carpicture/car.png';
import {useNavigation} from '@react-navigation/native';
import {CustomIcon} from '../CustomIcon';
import {stylesx} from './stylesx';
import {SkeletonLoader} from './skeleton';
import CalendarIcon from '../../assets/icons/CalendarIcon';
import CarIcon from '../../assets/icons/CarIcon';
import WalletIcon from '../../assets/icons/wallet';
import ChatIcon from '../../assets/icons/chatIcon';
export default function BoxHome() {
  const {isHost} = useUserStore();
  const {userDetails}: any = useUserStore();
  const navigation = useNavigation<any>();
  const stripeDashboardLink = userDetails?.host?.dashboard_login_link;
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);
  if (loading) {
    return <SkeletonLoader />;
  }
  if (isHost) {
    const hostButtons = [
      {
        label: 'Mes voitures',
        IconComponent: CarIcon,
        route: 'Hosting',
      },
      {
        label: 'Mes messages',
        IconComponent: ChatIcon,
        route: 'Chat',
      },
      {
        label: 'Réservations',
        IconComponent: CalendarIcon,
        route: 'OrderForMyCar',
      },
      {
        label: 'Mes gains',
        IconComponent: WalletIcon,
        route: null,
      },
    ];
    return (
      <View style={stylesx.container}>
        <View style={[stylesx.box, stylesx.hostBox]}>
          <View style={stylesx.row}>
            {hostButtons.map((item, index) => (
              <View key={index} style={stylesx.buttonWrapper}>
                <TouchableOpacity
                  style={stylesx.roundButton}
                  onPress={() => {
                    if (item.label === 'Mes gains' && stripeDashboardLink) {
                      Linking.openURL(stripeDashboardLink);
                    } else if (item.route) {
                      navigation.navigate(item.route);
                    }
                  }}>
                  <item.IconComponent width={20} height={20} fill="#fff" />
                </TouchableOpacity>
                <Text style={stylesx.buttonLabel}>{item.label}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Hosting')}>
        <View style={styles.box}>
          <View style={styles.columnLeft}>
            <Text style={styles.text}>Embarquez dans cette{'\n'}aventure</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Hosting')}>
              <Text style={styles.buttonText}>Réserver maintenant</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.columnRight}>
            <Image
              source={carImage}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  skeletonContainer: {
    width: '100%',
    padding: 12,
  },
  skeletonBox: {
    height: 162,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
    opacity: 0.4,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: '100%',
    height: 162,
    borderRadius: 20,
    margin: 12,
    backgroundColor: COLORS.newprimary,
    flexDirection: 'row',
    padding: 12,
  },
  hostBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  columnLeft: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 8,
  },
  columnRight: {
    width: 160,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
    marginBottom: 8,
    lineHeight: 26,
  },
  button: {
    borderWidth: 2,
    borderColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginTop: 10,
    borderRadius: 9999,
    backgroundColor: 'transparent',
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 12,
  },
});
