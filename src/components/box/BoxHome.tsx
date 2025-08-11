import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
  Animated,
} from 'react-native';
import {COLORS} from '../../utils/theme';
import useUserStore from '../../service/store/user.store';
import carImage from '../../assets/images/carpicture/car.png';
import {useNavigation} from '@react-navigation/native';
import {stylesx} from './stylesx';
import {SkeletonLoader} from './skeleton';
import CalendarIcon from '../../assets/icons/CalendarIcon';
import CarIcon from '../../assets/icons/CarIcon';
import WalletIcon from '../../assets/icons/wallet';
import ChatIcon from '../../assets/icons/chatIcon';
export default function BoxHome() {
  const {isHost, isVerified, userDetails}: any = useUserStore();
  const navigation = useNavigation<any>();
  const stripeDashboardLink = userDetails?.host?.dashboard_login_link;
  console.log('Is Host:', isHost);
  console.log('Is Verified:', isVerified);

  const [loading, setLoading] = useState(true);
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!loading) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    }
  }, [loading, fadeAnim]);

  if (loading) {
    return <SkeletonLoader />;
  }

  if (isHost && isVerified) {
    const hostButtons = [
      {label: 'Mes voitures', IconComponent: CarIcon, route: 'Hosting'},
      {label: 'Mes messages', IconComponent: ChatIcon, route: 'Chat'},
      {
        label: 'Réservations',
        IconComponent: CalendarIcon,
        route: 'OrderForMyCar',
      },
      {label: 'Mes gains', IconComponent: WalletIcon, route: null},
    ];

    return (
      <Animated.View style={[stylesx.container, {opacity: fadeAnim}]}>
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
      </Animated.View>
    );
  }

  return (
    <Animated.View style={[styles.container, {opacity: fadeAnim}]}>
      <TouchableOpacity onPress={() => navigation.navigate('Hosting')}>
        <View style={styles.box}>
          <View style={styles.columnLeft}>
            <Text style={styles.text}>
              Devenir un hôte{'\n'}et gagner de l'argent
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Hosting')}>
              <Text style={styles.buttonText}>Commencez mon inscription</Text>
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
    </Animated.View>
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
    fontSize: 10,
    fontWeight: 'bold',
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 12,
  },
});
