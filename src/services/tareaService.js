import { axiosInstance } from "../helpers/axios-config";
/*
const getInventarios = () => {
    const respuesta = axiosInstance.get('tareas', {
        headers: {//cómo quiero obtener los datos al llamr este servicio
            'Content-Type' : 'application/json'
        }
    });
    return respuesta;
}*/ 

/**
 * NOTA: Se puede hacer de estas dos maneras. LA DE ARRIBA Y LA DE ABAJO
 * 
 */

const getTareas = () => {
    return axiosInstance.get('tareas', {
        headers: {//cómo quiero obtener los datos al llamr este servicio
            'Content-Type' : 'application/json'
        }
    });   
}

const crearTarea = (data) => {//data es el body de la peticion    
    return axiosInstance.post('tareas', data, {        
        headers: {//cómo quiero obtener los datos al llamr este servicio
            'Content-Type' : 'application/json'
        }
    });   
}

const editTarea = (tareaID, data) => {//data es el body de la peticion
    return axiosInstance.put(`tareas/${tareaID}`, data, {
        headers: {//cómo quiero obtener los datos al llamr este servicio
            'Content-Type' : 'application/json'
        }
    });   
}

const getTareaPorID = (tareaID) => {
    return axiosInstance.get(`tareas/${tareaID}`, {
        headers: {//cómo quiero obtener los datos al llamr este servicio
            'Content-Type' : 'application/json'
        }
    });   
}

export {
    getTareas, crearTarea, editTarea, getTareaPorID
}