import NetInfo from '@react-native-community/netinfo';
import {useEffect, useState} from 'react';

export const useInterNetInfo = () => {
  const [internetStatus, setInternetStatus] = useState<any>(false);

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener(state => {
      const online: any = state?.isConnected;
      if (online) {
        setInternetStatus(false);
      } else {
        setInternetStatus(true);
        setTimeout(() => {
          setInternetStatus(false);
        }, 5000);
      }
    });

    return () => removeNetInfoSubscription();
  }, []);

  return {
    internetStatus,
    setInternetStatus,
  };
};



// Ce hook personnalisé utilise `@react-native-community/netinfo` pour détecter l'état de la connexion Internet.
// Il met à jour un état `internetStatus` qui est `true` lorsque l'utilisateur est hors ligne, puis le remet à `false` après 5 secondes.

// This custom hook uses `@react-native-community/netinfo` to detect Internet connectivity status.
// It updates a state `internetStatus` which is `true` when the user is offline, then resets to `false` after 5 seconds.
