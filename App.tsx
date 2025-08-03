import React, {useEffect, useLayoutEffect} from 'react';
import {PixelRatio, StatusBar} from 'react-native';
import Toast from 'react-native-toast-message';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {toastConfig} from './src/utils/theme';
import AuthStack from './src/navigation/AuthStack';
import NotificationListener from './src/screens/Notification/components/NotificationListner';
import Reviews from './src/screens/Reviews/index';
import Geolocation from '@react-native-community/geolocation';
import {useFocusEffect} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import SkeletonContent from 'react-native-skeleton-content';
import {useInterNetInfo} from './src/service/hooks/useNetInfo';
import NetConnectionModal from './src/components/NetConnectionModal/index';
import {GetFCMToken} from './src/utils/helper';
import useUserStore from './src/service/store/user.store';
import {useNotifications} from './src/hooks/useNotification';
const App = () => {
  const {top} = useSafeAreaInsets();
  const {internetStatus} = useInterNetInfo();
  const {isFcmToken, userDetails, setIsFcmToken} = useUserStore();
  const {saveFCMToken} = useNotifications();
  const handle = async () => {
    const fcmToken = await GetFCMToken();
    if (!isFcmToken && fcmToken && userDetails?.id) {
      saveFCMToken({fcmToken: fcmToken} as any);
      setIsFcmToken(true);
      return;
    }
  };
  useEffect(() => {
    if (userDetails?.id) {
      handle();
    }
  }, [userDetails?.id]);
  return (
    <>
      <StatusBar
        backgroundColor={'transparent'}
        translucent
        barStyle="dark-content"
      />
      {/* {internetStatus && <NetConnectionModal />} */}
      <AuthStack />
      {/* <Reviews/> */}
      <NotificationListener />
      <Toast position="top" autoHide={true} config={toastConfig(top)} />
    </>
  );
};
export default App;

// Erivan :
// Ce composant `App` est le point d’entrée principal de l’interface utilisateur de l’application :
// - Configure la `StatusBar` pour une apparence transparente et un texte sombre.
// - Affiche la pile de navigation `AuthStack` (connexion, onboarding ou écrans principaux).
// - Active un écouteur de notifications avec `NotificationListener` (ex : FCM).
// - Affiche les toasts personnalisés en haut de l’écran via `react-native-toast-message`.
// - Utilise `useUserStore` pour vérifier et sauvegarder le token FCM de l’utilisateur (notifications push).
// - Utilise `useNetInfo` pour détecter la connectivité réseau (composant `NetConnectionModal` désactivé ici).
// Remarques :
// - `Reviews` est commenté, utilisé probablement à des fins de test ou conditionnellement.
// - `FastImage` et `SkeletonContent` sont importés mais non utilisés ici, peut-être prévus pour d'autres écrans.
