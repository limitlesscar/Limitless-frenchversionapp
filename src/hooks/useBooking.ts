import {useMutation, useQuery} from '@tanstack/react-query';
import {
  cancelBookingService,
  getCarBookingsByIdService,
  getHostBookingByIdService,
  getUserBookingByIdService,
  giveReviewsService,
  validateBookingService,
} from '../services/bookingService';
import Toast from 'react-native-toast-message';
import {ErrorResponse} from '../utils/types/errorType';
import {errorFormatter} from '../utils/helper';
import {IMAGES} from '../utils/theme';
import {carColors} from '../utils/constants';
import {navigateReplace, navigateReset} from '../utils/navigation';
import useOffsetDate from '../service/hooks/useOffsetDate';

export const useBooking = (params?: any) => {
  const {encodeTime} = useOffsetDate();
  const validateBookingMutation = useMutation({
    mutationKey: ['validateBooking', params?.validate],
    mutationFn: mutationParams => {
      let payload: any = mutationParams;
      delete payload?.validate;

      console.log(payload);

      payload.start_date_time = encodeTime(payload.start_date_time);
      payload.end_date_time = encodeTime(payload.end_date_time);

      return validateBookingService(payload);
    },
    onSuccess: res => {
      params?.handleSuccess?.(res);
    },
    onError: error => {
      const errorMessage =
        (error?.response?.data as ErrorResponse)?.message ||
        'An unknown error occurred';
      Toast.show({
        type: 'error',
        text1: 'Erreur',
        text2: errorFormatter(errorMessage),
      });
    },
  });

  const getHostBookingByIdQuery = useQuery({
    queryKey: ['getHostCarById', params?.host_booking_id],
    queryFn: () => getHostBookingByIdService({id: params?.host_booking_id}),
  });

  const getUserBookingByIdQuery = useQuery({
    queryKey: ['getUserCarById', params?.user_booking_id],
    queryFn: () => getUserBookingByIdService({id: params?.user_booking_id}),
    select: data => {
      const {
        price_per_day,
        price_per_hour,
        vehicle_type,
        country_of_manufacture,
        city_of_registeration,
        transmission_type,
        color,
        brand,
        mileage,
        fuel_economy,
        engine_type,
        maximum_passengers,
        luggage_capacity,
      } = data?.data?.car || {};
      const arr = [
        {
          key: 'Prix par jour',
          value: `${price_per_day} €`,
          icon: IMAGES.price,
        },
        {
          key: 'Prix par heure',
          value: `${price_per_hour} €`,
          icon: IMAGES.price,
        },
        {
          key: 'Type de véhicule',
          value: vehicle_type,
          icon: IMAGES.vehicleType,
        },
        {
          key: 'Pays de fabrication',
          value: country_of_manufacture,
          icon: IMAGES.manufactureCity,
        },
        {
          key: "Ville d'immatriculation",
          value: city_of_registeration,
          icon: IMAGES.registerationCity,
        },
        {
          key: 'Transmission',
          value: transmission_type,
          icon: IMAGES.transmissionIcon,
        },
        {
          key: 'Couleur',
          value: carColors[color as keyof typeof carColors],
          icon: IMAGES.color,
        },
        {
          key: 'Marque',
          value: brand,
          icon: IMAGES.brand,
        },
        {
          key: 'Kilométrage',
          value: `${mileage}`,
          icon: IMAGES.mileage,
        },
        {
          key: 'Consommation de carburant',
          value: `${fuel_economy}`,
          icon: IMAGES.fuelEconomy,
        },
        {
          key: 'Type de moteur',
          value: `${engine_type}`,
          icon: IMAGES.engineType,
        },
        {
          key: 'Passagers',
          value: maximum_passengers,
          icon: IMAGES.passengers,
        },
        {
          key: 'Bagages',
          value: luggage_capacity,
          icon: IMAGES.luggage,
        },
      ];
      const reviews = data?.data?.car?.bookings;
      return {
        reviews: reviews,
        about: arr,
        car: data?.data?.car,
        bookingDetails: data?.data?.booking_details,
        chat: data?.data?.chat,
      };
    },
  });

  const cancelBookingMutation = useMutation({
    mutationKey: ['validateBooking', params?.cancel_booking_id],
    mutationFn: payload => cancelBookingService(payload),
    onSuccess: res => {
      // params?.handleSuccess?.(res);
      navigateReset('RootStack');
    },
    onError: error => {
      const errorMessage =
        (error?.response?.data as ErrorResponse)?.message ||
        'An unknown error occurred';
      Toast.show({
        type: 'error',
        text1: 'Erreur',
        text2: errorFormatter(errorMessage),
      });
    },
  });
  const setBookingReviewMutation = useMutation({
    mutationKey: ['validateBooking', params?.cancel_booking_id],
    mutationFn: payload => giveReviewsService(payload),
    onSuccess: res => {
      // params?.handleSuccess?.(res);
      Toast.show({
        type: 'success',
         text1: 'Succès',
        text2: 'Review added successfully',
      });
      navigateReplace('RootStack');
      // navigateReset('RootStack');
    },
    onError: error => {
      const errorMessage =
        (error?.response?.data as ErrorResponse)?.message ||
        'An unknown error occurred';
      Toast.show({
        type: 'error',
        text1: 'Erreur',
        text2: errorFormatter(errorMessage),
      });
    },
  });

  const getCarBookingsQuery = useQuery({
    queryKey: ['getCarBookings', params?.id],
    queryFn: () => getCarBookingsByIdService({id: params?.id}),
  });

  return {
    validateBooking: validateBookingMutation.mutate,
    validateBookingLoading: validateBookingMutation.isPending,

    cancelBooking: cancelBookingMutation.mutate,
    cancelBookingLoading: cancelBookingMutation.isPending,

    getHostBookingById: getHostBookingByIdQuery,
    getHostBookingByIdLoading: getHostBookingByIdQuery.isPending,

    getUserBookingById: getUserBookingByIdQuery,
    getUserBookingByIdLoading: getUserBookingByIdQuery.isPending,

    setReview: setBookingReviewMutation.mutate,
    reviewLoading: setBookingReviewMutation.isPending,

    getCarBookings: getCarBookingsQuery,
    getCarBookingsLoading: getCarBookingsQuery.isPending,
  };
};
