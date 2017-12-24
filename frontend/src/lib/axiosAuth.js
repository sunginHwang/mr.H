import axios from "axios";

let axiosAuth = axios.create();
axiosAuth.defaults.headers.common['mrh-user-token'] = localStorage.getItem('_MRH_USER_');

export default axiosAuth;