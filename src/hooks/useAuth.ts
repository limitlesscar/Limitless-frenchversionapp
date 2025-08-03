import {useMutation} from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import {
  requestOtpService,
  loginService,
  verifyOtpService,
  updateDrivingDetailsService,
  changePasswordService,
  uploadImagesService,
  updateProfileProcess,
  setDrivingDetailsProcess,
  signupService,
  logoutService,
  setProfileProcess,
  resetPasswordService,
  setRecreateStripeLink,
} from '../services/authService';
import {errorFormatter, GetFCMToken, getUserLocation} from '../utils/helper';
import useUserStore from '../service/store/user.store';
import {ErrorResponse} from '../utils/types/errorType';
import {
  navigate,
  navigateGoBack,
  navigateReplace,
  navigateReset,
} from '../utils/navigation';
import {useNotifications} from './useNotification';
import MMKVStorage from '../utils/MMKVStorage';
import {useLocation} from './useLocation';
import FastImage from 'react-native-fast-image';
import {queryClient} from '../..';

export const useAuth = (params?: any) => {
  const {setUserDetails, setAccessToken, userDetails} = useUserStore();
  const {saveFCMToken} = useNotifications();
  const {saveUserLocation} = useLocation();
  const loginMutation = useMutation({
    mutationFn: loginService,
    onError: (error: ErrorResponse) => {
      console.log('error on login', error);
      const errorMessage =
        (error?.response?.data as ErrorResponse)?.message ||
        'Une erreur inconnue est survenue';
      Toast.show({
        type: 'error',
        text1: 'Erreur',
        text2: errorFormatter(errorMessage),
      });
    },
    onSuccess: async data => {
      console.log(data?.data?.token);
      if (data?.data?.token) {
        let formatedResponse = {...data?.data?.user?.host, ...data?.data?.user};
        formatedResponse.host_id = data?.data?.user?.host?.id;
        delete formatedResponse?.fcm_token;
        const location = await getUserLocation();
        console.log({location});
        if (location?.lat) {
          saveUserLocation({
            location: {
              lat: Number(location?.lat),
              long: Number(location?.lng),
            },
          });
        }
        setAccessToken(data?.data?.token);
        setUserDetails(formatedResponse);
        navigateReset('RootStack');
        Toast.show({
          type: 'success',
          text1: 'Succès',
          text2: 'Connexion réussie',
        });
      }
    },
  });
  const signupMutation = useMutation({
    mutationFn: signupService,
    onError: (error: ErrorResponse) => {
      const errorMessage =
        (error?.response?.data as ErrorResponse)?.message ||
        'Une erreur inconnue est survenue';
      Toast.show({
        type: 'error',
        text1: 'Erreur',
        text2: errorFormatter(errorMessage),
      });
    },
    onSuccess: data => {
      const requestData = JSON.parse(data?.config?.data || '{}');
      const user_type = requestData?.user_type;

      if (data?.data?.token && ['host', 'user'].includes(user_type)) {
        setAccessToken(data?.data?.token);
        setUserDetails(data?.data?.user);
        navigateReset('SignupComplete', {user_type});

        Toast.show({
          type: 'success',
          text1: 'Succès',
          text2: data?.data?.message,
        });
      }
    },
  });

  const logoutMutation = useMutation({
    mutationFn: logoutService,
    onError: (error: ErrorResponse) => {
      const errorMessage =
        (error?.response?.data as ErrorResponse)?.message ||
        'Une erreur inconnue est survenue';
      Toast.show({
        type: 'error',
        text1: 'Erreur',
        text2: errorFormatter(errorMessage),
      });
    },
    onSuccess: _ => {
      queryClient.removeQueries();
      MMKVStorage.removeItem('fcmtoken');
      setAccessToken(null as any);
      setUserDetails(null as any);
      navigateReset('Signin', {});
    },
  });

  const requestOtpMutation = useMutation({
    mutationFn: requestOtpService,
    onError: (error: ErrorResponse) => {
      Toast.show({
        type: 'error',
        text1: 'Erreur',
        text2: errorFormatter(
          (error?.response?.data as ErrorResponse)?.message,
        ),
      });
    },
    onSuccess: data => {
      const requestData = JSON.parse(data?.config?.data || '{}');
      const email = requestData?.email;
      if (data?.data?.message) {
        navigate('VerifyOtp', {email});
        Toast.show({
          type: 'success',
          text1: 'Succès',
          text2: data?.data?.message,
        });
      }
    },
  });

  // TODO
  // remove this and re use request otp with success handler from parent to handle navigation
  const resendOtpMutation = useMutation({
    mutationFn: requestOtpService,
    onError: (error: ErrorResponse) => {
      Toast.show({
        type: 'error',
        text1: 'Erreur',
        text2: errorFormatter(
          (error?.response?.data as ErrorResponse)?.message,
        ),
      });
    },
    onSuccess: data => {
      const requestData = JSON.parse(data?.config?.data || '{}');
      const email = requestData?.email;
      if (data?.data?.message) {
        navigate('VerifyOtp', {email});
        Toast.show({
          type: 'success',
          text1: 'Succès',
          text2: data?.data?.message,
        });
      }
    },
  });

  const VerifyOtpMutation = useMutation({
    mutationFn: verifyOtpService,
    onError: (error: ErrorResponse) => {
      Toast.show({
        type: 'error',
        text1: 'Erreur',
        text2: errorFormatter(
          (error?.response?.data as ErrorResponse)?.message,
        ),
      });
    },
    onSuccess: data => {
      if (data?.data?.message) {
        const requestData = JSON.parse(data?.config?.data || '{}');
        const otp = requestData?.otp;
        navigate('SetPassword', {email: data?.data?.user?.email, otp});
        Toast.show({
          type: 'success',
          text1: 'Succès',
          text2: data?.data?.message,
        });
      }
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: resetPasswordService,
    onError: (error: ErrorResponse) => {
      Toast.show({
        type: 'error',
        text1: 'Erreur',
        text2: errorFormatter(
          (error?.response?.data as ErrorResponse)?.message,
        ),
      });
    },
    onSuccess: data => {
      if (data?.data?.message) {
        navigateReplace('Signin');
        Toast.show({
          type: 'success',
          text1: 'Succès',
          text2: data?.data?.message,
        });
      }
    },
  });

  const updateDrivingDetailsMutation = useMutation({
    mutationFn: updateDrivingDetailsService,
    onError: (error: ErrorResponse) => {
      Toast.show({
        type: 'error',
        text1: 'Erreur',
        text2: errorFormatter(
          (error?.response?.data as ErrorResponse)?.message,
        ),
      });
    },
    onSuccess: data => {
      if (data?.data?.message) {
        setUserDetails({
          ...userDetails,
          expiry_date: data?.data?.user?.expiry_date,
        });
        navigateGoBack();
        Toast.show({
          type: 'success',
          text1: 'Succès',
          text2: data?.data?.message,
        });
      }
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: changePasswordService,
    onError: (error: ErrorResponse) => {
      Toast.show({
        type: 'error',
        text1: 'Erreur',
        text2: errorFormatter(
          (error?.response?.data as ErrorResponse)?.message,
        ),
      });
    },
    onSuccess: data => {
      if (data?.data?.message) {
        navigateGoBack();
        Toast.show({
          type: 'success',
          text1: 'Succès',
          text2: data?.data?.message,
        });
      }
    },
  });

  const uploadImagesMutation = useMutation({
    mutationFn: uploadImagesService,
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || 'Error uploading images';
      Toast.show({
        type: 'error',
        text1: 'Erreur',
        text2: errorFormatter(errorMessage),
      });
    },
  });

  const setProfileMutation = useMutation({
    // mutationFn: updateProfileService,
    mutationFn: setProfileProcess,

    onError: (error: ErrorResponse) => {
      Toast.show({
        type: 'error',
        text1: 'Erreur',
        text2: errorFormatter(
          (error?.response?.data as ErrorResponse)?.message,
        ),
      });
    },
    onSuccess: data => {
      if (data?.data?.data?.id) {
        // console.log(data?.data)
        let formatedResponse = data.data.data;
        // console.log(formatedResponse)
        delete formatedResponse?.host;
        setUserDetails({...userDetails, ...formatedResponse}); // BE is not returning user details , will uncomment this once BE is updated
        params?.successCallback?.();
        // navigateGoBack();
        Toast.show({
          type: 'success',
          text1: 'Succès',
          text2: 'Profile updated successfully',
        });
      }
    },
  });

  const updateProfileMutation = useMutation({
    // mutationFn: updateProfileService,
    mutationFn: updateProfileProcess,
    onError: (error: any) => {
      console.log({error});
      Toast.show({
        type: 'error',
        text1: 'Erreur',
        text2: errorFormatter(
          (error?.response?.data as ErrorResponse)?.message,
        ),
      });
    },
    onSuccess: data => {
      setUserDetails({...userDetails, profile_picture: ''});

      if (data?.data?.user?.id) {
        let formatedResponse = data.data?.user;

        delete formatedResponse?.host;

        FastImage.clearDiskCache();
        FastImage.clearMemoryCache();
        setUserDetails({...userDetails, ...formatedResponse}); // BE is not returning user details , will uncomment this once BE is updated
        params?.successCallback?.();
        // navigateGoBack();
        Toast.show({
          type: 'success',
          text1: 'Succès',
          text2: 'Profile updated successfully',
        });
      }
    },
  });

  const setDrivingDetailsMutation = useMutation({
    mutationFn: setDrivingDetailsProcess, // first time set with license image,
    onError: (error: ErrorResponse) => {
      Toast.show({
        type: 'error',
        text1: 'Erreur',
        text2: errorFormatter(
          (error?.response?.data as ErrorResponse)?.message,
        ),
      });
    },
    onSuccess: data => {
      if (data?.data?.message) {
        setUserDetails({
          ...userDetails,
          ...data?.data?.data,
          ...data?.data?.host,
        });

        if (data?.data?.isVerificationPending === false) {
          // params?.successCallback?.(data?.data?.stripeLink);
          params?.modalVisible?.({visible: true, url: data?.data?.stripeLink});
        } else {
          params?.successCallback?.();
        }
        Toast.show({
          type: 'success',
          text1: 'Succès',
          text2: data?.data?.message,
        });
      }
    },
  });
  const setRecreateStripeLinkMutation = useMutation({
    mutationKey: ['reCreateStripe'],
    mutationFn: setRecreateStripeLink,
    onSuccess: data => {
      params?.modalVisible?.({visible: true, url: data?.data?.onboardingLink});
    },
  });
  return {
    login: loginMutation.mutate,
    loginLoading: loginMutation.isPending,

    signup: signupMutation.mutate,
    signupLoading: signupMutation.isPending,

    logout: logoutMutation.mutate,
    logoutLoading: logoutMutation.isPending,

    requestOtp: requestOtpMutation.mutate,
    requestOtpLoading: requestOtpMutation.isPending,

    resendOtp: resendOtpMutation.mutate,
    resendOtpLoading: resendOtpMutation.isPending,

    verifyOtp: VerifyOtpMutation.mutate,
    verifyOtpLoading: VerifyOtpMutation.isPending,

    resetPassword: resetPasswordMutation.mutate,
    resetPasswordLoading: resetPasswordMutation.isPending,

    setDrivingDetails: setDrivingDetailsMutation.mutate,
    setDrivingDetailsLoading: setDrivingDetailsMutation.isPending,

    updateDrivingDetails: updateDrivingDetailsMutation.mutate,
    updateDrivingDetailsLoading: updateDrivingDetailsMutation.isPending,

    changePassword: changePasswordMutation.mutate,
    changePasswordLoading: changePasswordMutation.isPending,

    uploadImagesMutation: uploadImagesMutation, // to use the mutateAsync function in publishCar
    uploadImages: uploadImagesMutation.mutate,
    uploadImagesLoading: uploadImagesMutation.isPending,

    setProfile: setProfileMutation.mutate,
    setProfileLoading: setProfileMutation.isPending,

    updateProfile: updateProfileMutation.mutate,
    updateProfileLoading: updateProfileMutation.isPending,

    reCreateStripe: setRecreateStripeLinkMutation.mutate,
  };
};
