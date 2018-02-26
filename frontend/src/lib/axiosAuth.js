import axios from "axios";
import { ACCESS_HEADER_TOKEN, ACCESS_TOKEN } from './constants';

let axiosAuth = axios.create();
axiosAuth.defaults.headers.common[ACCESS_HEADER_TOKEN] = localStorage.getItem(ACCESS_TOKEN);
axiosAuth.defaults.headers.common['Access-Control-Allow-Headers'] = '*';
axiosAuth.defaults.headers.common['Access-Control-Allow-Methods'] = '*';
axiosAuth.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export default axiosAuth;