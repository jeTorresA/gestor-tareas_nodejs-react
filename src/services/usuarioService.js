import { axiosInstance } from '../helpers/axios-config';


const getUsuarios = () => {
    return axiosInstance.get('usuario', {
        headers : {
            'Content-Type' : 'application/json'
        }
    });
}

const getUsuarioPorID = (usuarioID) => {
    return axiosInstance.get(`usuario/${usuarioID}`, {
        headers : {
            'Content-Type' : 'application/json'        
        }
    })
}

const crearUsuario = (data) => {
    return axiosInstance.post('usuario', data, {
        headers : {
            'Content-Type' : 'application/json'
        }
    });
}

const editUsuario = (usuarioID, data) => {
    return axiosInstance.put(`usuario/${usuarioID}`, data, {
        'Content-Type' : 'application/json'
    });
}

export {
    getUsuarios, crearUsuario, editUsuario, getUsuarioPorID
}