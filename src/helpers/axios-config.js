/** Se puede hacer el consumo de servicios mediante axios o mediante fetch ya es decision 
 * axios es de un tercero y fetch es propio de js
 */

import axios from 'axios';

const axiosInstance = axios.create({
    baseURL : 'http://192.168.0.10:4000/'
});

export {
    axiosInstance,
}