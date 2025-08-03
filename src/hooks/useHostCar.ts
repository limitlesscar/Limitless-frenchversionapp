import {useInfiniteQuery, useMutation, useQuery} from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

import {
  getHostCarDetailsService,
  getHostCarsService,
  publishCarProcess,
  unpublishCarService,
  updateCarService,
} from '../services/hostCarService';
import {errorFormatter} from '../utils/helper';
import {
  navigateGoBack,
  navigateReplace,
  navigateReset,
} from '../utils/navigation';
import {carColors} from '../utils/constants';
import {IMAGES} from '../utils/theme';

export const useHostCar = (params?: any) => {
  const publishCarMutation = useMutation({
    mutationFn: publishCarProcess,
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || error?.data?.message;
      Toast.show({
        type: 'error',
        text1: 'Erreur',
        text2: errorFormatter(errorMessage),
      });
    },
    onSuccess: data => {
      if (data?.data?.car?.id) {
        Toast.show({
          type: 'success',
          text1: 'Succès',
          text2: data?.data?.message || 'Voiture publiée avec succès',
        });
        navigateReset('RootStack');
      }
    },
  });

  const unpublishCarMutation = useMutation({
    mutationFn: unpublishCarService,
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        'Erreur lors du processus de dépublication';
      params?.successCallback(errorMessage);
      Toast.show({
        type: 'error',
        text1: 'Erreur',
        text2: errorFormatter(errorMessage),
      });
    },
    onSuccess: data => {
      params?.successCallback(data?.data?.message);
    },
  });

  const updateCarMutation = useMutation({
    mutationFn: updateCarService,
    onError: (error: any) => {
      console.log({error});
      const errorMessage =
        error?.response?.data?.message || 'Error in publishing process';
      Toast.show({
        type: 'error',
        text1: 'Erreur',
        text2: errorFormatter(errorMessage),
      });
    },
    onSuccess: data => {
      if (data?.data?.car?.id) {
        Toast.show({
          type: 'success',
          text1: 'Succès',
          text2: data?.data?.message || 'Voiture mise à jour avec succès',
        });
        navigateGoBack();
      }
    },
  });

  const getHostCarsQuery = useInfiniteQuery({
    queryKey: ['getHostCars'],
    queryFn: ({pageParam = 0}) =>
      getHostCarsService({skip: pageParam, take: 10}),
    getNextPageParam: (_lastPage, pages) => {
      // Return the next skip value here if there are more pages
      return pages.length * 10;
    },
    initialPageParam: 0,
  });

  const getHostCarDetailsQuery = useQuery({
    queryKey: ['getHostCarDetails', params?.id],
    queryFn: () =>
      getHostCarDetailsService({
        id: params?.id,
      }),
    select: data => {
      const {
        price_per_day,
        price_per_hour,
        vehicle_type,
        country_of_manufacture,
        city_of_registeration,
        transmission_type,
        color_code,
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
          value: color_code,
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
          value: `${fuel_economy} MPG`,
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
          value: `${luggage_capacity} KG`,
          icon: IMAGES.luggage,
        },
      ];

      return {...data, about: arr};
    },
  });

  return {
    publishCar: publishCarMutation.mutate,
    publishCarLoading: publishCarMutation.isPending,

    unpublishCar: unpublishCarMutation.mutate,
    unpublishCarLoading: unpublishCarMutation.isPending,

    updateCar: updateCarMutation.mutate,
    updateCarLoading: updateCarMutation.isPending,

    getHostCars: getHostCarsQuery,
    getHostCarsLoading: getHostCarsQuery.isFetching,

    getHostCarDetails: getHostCarDetailsQuery,
    getHostCarDetailsLoading: getHostCarDetailsQuery.isFetching,
  };
};
