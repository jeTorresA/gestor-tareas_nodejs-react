import { axiosInstance } from '../helpers/axios-config';


const getEstadoTareas = () => {
    return axiosInstance.get('estadotarea', {
        headers : {
            'Content-Type' : 'application/json'
        }
    });
}

export {
    getEstadoTareas,
}