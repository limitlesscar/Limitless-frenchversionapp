import axiosInstance from '../service/api';
import {HelpcenterEndpoint} from '../utils/endpoints';

export const getHelpcenterDataService = async (search: string) =>
  await axiosInstance.get(`${HelpcenterEndpoint}?search=${search}`);
