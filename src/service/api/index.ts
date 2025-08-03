import axios from 'axios';
import {API_URL} from '../../utils/constants';
import useUserStore from '../store/user.store';
import MMKVStorage from '../../utils/MMKVStorage';
//import {navigate, navigateReplace, navigateReset} from '../../utils/navigation';

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
  config => {
    const token = useUserStore.getState()?.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      const refreshToken =
        useUserStore.getState()?.refreshToken ||
        (await MMKVStorage.getItem('refreshToken'));

      if (refreshToken) {
        try {
          const response = await axios.post(`${API_URL}/auth/refresh`, {
            refreshToken,
          });
          const newAccessToken = response.data.accessToken;

          useUserStore.setState({accessToken: newAccessToken});
          await MMKVStorage.setItem('accessToken', newAccessToken);

          // // Retry the failed request with the new token
          // error.config.headers.Authorization = `Bearer ${newAccessToken}`;
          // return axiosInstance.request(error.config);
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError);

          useUserStore.setState({
            accessToken: null,
            refreshToken: null,
            userDetails: null,
          });
          await MMKVStorage.removeItem('fcmtoken');
          // navigateReset('RootStack');
        }
      } else {
        // No refresh token, navigate to the login screen
        useUserStore.setState({
          accessToken: null,
          refreshToken: null,
          userDetails: null,
        });
        await MMKVStorage.removeItem('fcmtoken');
        // navigateReset('RootStack');
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;

/*
Summary:
- This axios instance automatically attaches the access token from the user store to every request.
- When a 401 Unauthorized error occurs, it tries to refresh the access token using a stored refresh token.
- If refresh is successful, it updates the token and optionally could retry the failed request.
- If refresh fails or no refresh token exists, it clears user info and tokens to log the user out.
- Navigation to login/reset stack is commented out but can be added where indicated.
*/
