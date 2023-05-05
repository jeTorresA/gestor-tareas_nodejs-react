import React, { useState, useEffect } from 'react';
import Swal2 from 'sweetalert2';

import { getTareas } from '../../services/tareaService';
import { TareaCard } from './TareaCard';
import { TareaNew } from './TareaNew';

const TareaView = () => {

    const [ tareas, setTareas ] = useState([]);
    const [ openModal, setOpenModal ] = useState(false);  /**variable de estado para controlar la 
    visibilidad del popup */

    const listarTareas = async ()  => {
        try {//desestructurando para obtner solo data
            Swal2.fire({
                allowOutsideClick : false,
                text : "Cargando..."
            });
            Swal2.showLoading();
            const { data } = await getTareas(); //desestructurando el objeto porque si lo dejamos sin llaves {}, se obtinen todos los datos de la respuesta
            console.log(data);
            setTareas(data);
            Swal2.close();
        } catch (error) {
            console.log(error);
            Swal2.close();
            let mensaje;
            if (error & error.response && error.response.data){
                mensaje = error.response.data;
            }else {
                mensaje = "Ocurrio un error. Por favor intente de nuevo";
            }
            Swal2.fire('Error', mensaje, 'error');        
        }
    }

    useEffect ( () => {
        listarTareas();
    }, []);

    //listarTareas();

    const handleOpenModal = () => {
        setOpenModal(!openModal);
    }

    return (
        <div className='container-fluid'>
            <div className='mt-2 mb-2 row row-cols-1 row-cols-md-3 g-4'>
                {
                    tareas.map( (tarea) => {
                        return <TareaCard key={tarea._id} tarea={tarea} /> 
                    })
                }
            </div>
            {/**Esto es un if terciario*/
                openModal ? <TareaNew 
                                handleOpenModal = { handleOpenModal } 
                                listarTareas = { listarTareas } /> : <button className='btn btn-primary fab'>
                    <i className="fa-solid fa-plus" onClick={ handleOpenModal }></i>
                </button>
            }            
            
        </div>
    )

}

export {
    TareaView,
}



