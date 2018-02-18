import axios from "axios";
import { ACCESS_HEADER_TOKEN, ACCESS_TOKEN } from './constants';

let axiosAuth = axios.create();
axiosAuth.defaults.headers.common[ACCESS_HEADER_TOKEN] = localStorage.getItem(ACCESS_TOKEN);

export default axiosAuth;