import axios from "axios";
import { ACCESS_HEADER_TOKEN, ACCESS_TOKEN } from './constants';

let axiosAuth = axios.create({
    header: {
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods' : '*'
    }
});
axiosAuth.defaults.headers.common[ACCESS_HEADER_TOKEN] = localStorage.getItem(ACCESS_TOKEN);

export default axiosAuth;