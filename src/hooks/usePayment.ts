import {useMutation, useQuery} from '@tanstack/react-query';
import {ErrorResponse} from '../utils/types/errorType';
import Toast from 'react-native-toast-message';
import {errorFormatter} from '../utils/helper';
import {
  detachPaymentService,
  paymentIntentService,
  paymentMethodListService,
  setupIntentService,
} from '../services/paymentService';
import useUserStore from '../service/store/user.store';

export const usePayment = params => {
  const {userDetails} = useUserStore();

  const setupIntentMutation = useMutation({
    mutationFn: setupIntentService,
    onError: (error: ErrorResponse) => {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: errorFormatter(
          (error?.response?.data as ErrorResponse)?.message,
        ),
      });
    },
    onSuccess: data => {
      params?.successHandler(data);
      // navigate('VerifyOtp');

      console.log({data});
      console.log('setupIntentMutation', data.data);
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Card added successfully',
      });
    },
  });

  const paymentIntentMutation = useMutation({
    mutationFn: paymentIntentService,
    onError: (error: ErrorResponse) => {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: errorFormatter(
          (error?.response?.data as ErrorResponse)?.message,
        ),
      });
    },
    onSuccess: data => {
      params?.successHandler(data);
      console.log('paymentIntentMutation', data.data);
      // navigate('VerifyOtp');

      console.log({data});

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Payment Successful',
      });
    },
  });

  const detachPaymentMutation = useMutation({
    mutationFn: detachPaymentService,
    onError: (error: ErrorResponse) => {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: errorFormatter(
          (error?.response?.data as ErrorResponse)?.message,
        ),
      });
    },
    onSuccess: data => {
      params?.successHandler(data);
      // navigate('VerifyOtp');

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Successfully deleted the card',
      });
    },
  });

  const getPaymentCardListQuery = useQuery({
    queryKey: ['paymentCards'],
    queryFn: () => {
      let payload = {
        limit: 10,
        customer_id: userDetails?.stripe_customer_id,
      };
      return paymentMethodListService({...payload});
    },
  });

  return {
    setupIntent: setupIntentMutation.mutate,
    setupIntentLoading: setupIntentMutation.isPending,

    paymentIntent: paymentIntentMutation.mutate,
    paymentIntentLoading: paymentIntentMutation.isPending,

    detachPayment: detachPaymentMutation.mutate,
    detachPaymentLoading: detachPaymentMutation.isPending,

    getPaymentCardList: getPaymentCardListQuery,
    getPaymentCardListLoading: getPaymentCardListQuery.isPending,
  };
};
