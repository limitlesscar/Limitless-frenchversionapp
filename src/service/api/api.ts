import axiosInstance from '.';

import {
  ApiResponse,
  ImageUploadResponseType,
} from '../../utils/types/apiResponseType';

export type PostParams = {
  endPoint: string;
  body: any;
  method: 'post' | 'put' | 'delete' | 'get';
  token?: string;
  stopToast?: boolean;
};

export async function get({
  endPoint,
  query,
}: {
  endPoint: string;
  query?: string;
}): Promise<any> {
  try {
    let url = `${endPoint}`;
    if (query) {
      url = `${endPoint}?${query}`;
    }

    const res = await axiosInstance.get(url);
    return {success: true, data: res?.data, error: null};
  } catch (error) {
    return {success: false, error, data: null};
  }
}

export async function mutationFunction<T>({
  endPoint,
  body,
  method,
}: PostParams): Promise<ApiResponse<unknown>> {
  try {
    let res;
    if (method === 'get') {
      res = await axiosInstance.get<ApiResponse<T>>(endPoint);
    } else if (method === 'post') {
      res = await axiosInstance.post<ApiResponse<T>>(endPoint, body);
    }

    return {data: res?.data, success: true, error: null};
  } catch (error) {
    return {data: null, success: true, error: error};
  }
}
export async function upload({
  endPoint,
  body,
}: PostParams): Promise<ImageUploadResponseType> {
  try {
    const res = await axiosInstance.post<ImageUploadResponseType>(
      endPoint,
      body,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          accept: '*/*',
        },
      },
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}
/*
  Axios instance with:
  - Base URL set from constants.
  - Automatically attaches Bearer access token from Zustand user store to each request.
  - On 401 Unauthorized responses:
    • Attempts to refresh access token using stored refresh token.
    • If refresh succeeds, updates stored access token.
    • If refresh fails or no refresh token, clears user data and tokens (logs out user).
  - Navigation calls to reset app state on logout are present but commented out.
*/
