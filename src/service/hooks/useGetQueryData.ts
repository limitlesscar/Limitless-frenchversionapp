import {ApiResponse} from '../../utils/types/apiResponseType';
import {get} from '../api/api';
import {useQuery, UseQueryOptions, UseQueryResult} from '@tanstack/react-query';

interface ApiError extends Error {
  statusCode?: number;
  message: string;
  data?: any;
}

export const useGetQueryData = <T>({
  endPoint,
  query,

  ...rest
}: {
  endPoint: string;
  query?: string;
  rest?: UseQueryOptions<ApiResponse<T>, ApiError>;
}): UseQueryResult<ApiResponse<T>, ApiError> => {
  const {...queryInfo} = useQuery<ApiResponse<T>, ApiError>({
    queryKey: [endPoint, query],
    queryFn: () => get({endPoint, query}),
    ...rest,
  });

  return {...queryInfo};
};

//  Hook personnalisé pour effectuer une requête GET avec react-query.
// Il accepte un endpoint, une chaîne de requête optionnelle, et des options supplémentaires.
// Renvoie les données, le statut de la requête et les erreurs.

// Custom hook to perform a GET request using react-query.
// It accepts an endpoint, an optional query string, and additional options.
// Returns data, query status, and errors.
