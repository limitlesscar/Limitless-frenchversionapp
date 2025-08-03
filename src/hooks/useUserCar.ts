import {useInfiniteQuery, useMutation, useQuery} from '@tanstack/react-query';

import {
  getUserCarByIdService,
  getUserCarDetailsService,
  getUserCarMapService,
  getUserCarsService,
  getUserDetailsService,
} from '../services/userCarService';
import {IMAGES} from '../utils/theme';
import {carColors} from '../utils/constants';
import {userDetailEndPoint} from '../utils/endpoints';
import useUserStore from '../service/store/user.store';
import useOffsetDate from '../service/hooks/useOffsetDate';

export const useUserCar = (params?: any) => {
  const {encodeTime} = useOffsetDate();

  const getUserCarsQuery = useInfiniteQuery({
    queryKey: ['getUserCars', params?.applyFilter, params?.applySearchFilter],
    queryFn: async ({pageParam = 0}) => {
      let payload = params;
      delete payload?.applyFilter;
      payload.vehicle_type =
        payload.vehicle_type === 'All' ? undefined : payload.vehicle_type;

      let startDate = encodeTime(decodeURIComponent(payload.start_date_time));
      let endDate = encodeTime(decodeURIComponent(payload.end_date_time));

      payload.end_date_time = endDate;
      payload.start_date_time = startDate;
      console.log({payload});
      return await getUserCarsService({
        skip: pageParam,
        take: 100,
        // address: params?.address,
        // start_date_time: params?.start_date_time,
        // end_date_time: params?.end_date_time,
        filters: {...payload},
        // vehicle_type: params?.vehicle_type,
      });
    },

    getNextPageParam: (_lastPage, pages) => {
      // Return the next skip value here if there are more pages
      return pages.length * 10;
    },
    initialPageParam: 0,
  });

  // to be implemented for limited car information on maps card
  const getUserCarByIdQuery = useQuery({
    queryKey: ['getUserCarById', params?.id],
    queryFn: () => getUserCarByIdService({id: params?.id}),
  });
  const getUserDetailQuery = useQuery({
    queryKey: ['getuserDetail'],
    queryFn: () => getUserDetailsService(),
  });
  // const {mutate:getUserDetailMutation} = useMutation({
  //   mutationFn: getUserDetailsService, // first time set with license image,
  //   onError: () => {

  //   },
  //   onSuccess: data => {
  //     // if (data?.data?.message) {
  //       console.log({data})
  //       // setUserDetails({

  //       //   ...data?.data?.data,
  //       //   ...data?.data?.host,
  //       // });

  //     // }
  //   },
  // });

  const getUserCarMapQuery = useInfiniteQuery({
    queryKey: ['getUserCarMap'],
    queryFn: async ({pageParam = 0}) => {
      return await getUserCarMapService({
        skip: pageParam,
        take: 100,
      });
    },

    getNextPageParam: (_lastPage, pages) => {
      // Return the next skip value here if there are more pages
      return pages.length * 10;
    },
    initialPageParam: 0,
  });

  const getUserCarDetailsQuery = useQuery({
    queryKey: ['getUserCarDetails', params?.id],
    queryFn: () =>
      getUserCarDetailsService({
        id: params?.id,
        // user_id: params?.user_id,
        chat_type: params?.chat_type,
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

      return {...data, about: arr};
    },
  });

  return {
    getUserCars: getUserCarsQuery,
    getUserCarsLoading: getUserCarsQuery.isFetching,

    getUserCarById: getUserCarByIdQuery,
    getUserCarByIdLoading: getUserCarByIdQuery.isPending,

    getUserCarMap: getUserCarMapQuery,
    getUserCarMapLoading: getUserCarMapQuery.isPending,

    getUserCarDetails: getUserCarDetailsQuery,
    getUserCarDetailsLoading: getUserCarDetailsQuery.isFetching,

    // getUserDetail:getUserDetailMutation
    getUserDetailQuery: getUserDetailQuery,
  };
};

/*
  Hook `useUserCar` fournissant plusieurs requêtes pour gérer les données des voitures utilisateur,
  basé sur la librairie React Query (@tanstack/react-query) avec support de pagination infinie.

  Fonctionnalités principales :
  - `getUserCarsQuery` : récupération paginée des voitures utilisateur avec filtres et recherche,
    utilise `useInfiniteQuery` pour charger plus de pages à la demande.
  - `getUserCarByIdQuery` : récupération des informations d'une voiture précise par son ID.
  - `getUserDetailQuery` : récupération des détails utilisateur globaux.
  - `getUserCarMapQuery` : récupération paginée des voitures affichées sur une carte.
  - `getUserCarDetailsQuery` : récupération détaillée des informations d'une voiture (prix, type, marque, consommation, etc.)
    avec transformation des données pour une présentation facile dans l'UI (tableau `about` avec icônes).

  Le hook expose aussi les états de chargement (fetching, pending) pour chaque requête.

  Ce hook centralise la logique de récupération et transformation des données relatives aux voitures,
  et facilite la gestion côté interface grâce à React Query (caching, mise à jour automatique, pagination).
*/
