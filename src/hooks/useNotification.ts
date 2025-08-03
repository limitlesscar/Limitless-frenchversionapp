import {useInfiniteQuery, useMutation} from '@tanstack/react-query';

import {
  getNotificationService,
  saveFCMTokenService,
  setNotificationsSwitch,
} from '../services/notificationService';
import {ErrorResponse} from '../utils/types/errorType';
import {errorFormatter} from '../utils/helper';
import Toast from 'react-native-toast-message';
import useUserStore from '../service/store/user.store';

export const useNotifications = (_?: any) => {
  const {setUserDetails, userDetails, setIsFcmToken} = useUserStore();
  const getNotificationsQuery = useInfiniteQuery({
    queryKey: ['notifications'],
    queryFn: ({pageParam = 0}) =>
      getNotificationService({skip: pageParam, take: 10}),
    getNextPageParam: (_lastPage, pages) => {
      // Return the next skip value here if there are more pages
      return pages.length * 10;
    },
    initialPageParam: 0,
  });

  const saveFCMTokenMutation = useMutation({
    mutationFn: abc => {
      return saveFCMTokenService(abc);
    },
    onError: (error: ErrorResponse) => {
      const errorMessage =
        (error?.response?.data as ErrorResponse)?.message ||
        'An unknown error occurred';
      Toast.show({
        type: 'error',
        text1: 'Erreur',
        text2: errorFormatter(errorMessage),
      });

      setIsFcmToken(false);
    },
    onSuccess: _ => {}, // no success handling as FCM token is being saved while calling the api;
  });

  const setNotificationPerf = useMutation({
    mutationFn: (value: string) => {
      console.log({value});
      return setNotificationsSwitch(value);
    },
    onError: (error: ErrorResponse) => {
      Toast.show({
        type: 'error',
        text1: 'Erreur',
        text2: error?.message,
      });
    },

    onSuccess: res => {
      console.log(res.data);
      setUserDetails({...userDetails, ...res?.data?.user});
    },
  });

  return {
    getNotifications: getNotificationsQuery,
    getNotificationsLoading: getNotificationsQuery.isPending,

    saveFCMToken: saveFCMTokenMutation.mutate,
    saveFCMTokenLoading: saveFCMTokenMutation.isPending,

    setNotificationSwitch: setNotificationPerf.mutate,
  };
};
