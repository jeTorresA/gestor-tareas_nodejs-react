import React, { useEffect, useState } from 'react';
import Swal2 from 'sweetalert2';

import { getEstadoTareas } from '../../services/estadoTareaService';
import { getUsuarios } from '../../services/usuarioService';
import { crearTarea } from '../../services/tareaService';

export const TareaNew = ({ handleOpenModal, listarTareas }) => {

    const [ usuarios, setUsuarios ] = useState([]);
    const [ estadoTareas, setEstadoTareas ] = useState([]);
    const [ valoresForm, setValoresForm ] = useState({});
    const { nombre = "", descripcion = "", usuario, estado } = valoresForm; //es necesario declararlas vacias para que no genere error

    const listarUsuarios = async () => {
        try {
           const { data } = await getUsuarios();
           setUsuarios(data);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect (() => {
        listarUsuarios();
    }, []);

    const listarEstadoTareas = async () => {
        try {
            const { data } = await getEstadoTareas();
            setEstadoTareas(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        listarEstadoTareas();
    }, []);

    const handleOnChange = ({ target }) => {
        const { name, value } = target;
        setValoresForm({ ...valoresForm, [name] : value });
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const tarea = {//con solo asignar el valor del objeto, se crea tambien el nombre igual que el nombre de la variable
            nombre,
            descripcion,          
            usuario : {
                _id : usuario
            },
            estado : {
                _id : estado
            }            
        }
        console.log("objeto enviado");
        console.log(tarea);
        try {
            Swal2.fire({
                allowOutsideClick : false, //cuando del click por fuera de la ventana, no se cierre
                text : 'Cargando...'
            });
            Swal2.showLoading();//para mostrar animacion de cargando                   
            const { data } = await crearTarea(tarea);
            console.log(data);
            Swal2.close();
            handleOpenModal();//para cerrar TareaNew     
            listarTareas();
        } catch (error) {
            console.log(error);
            Swal2.close();
            let mensaje;
            if (error && error.response && error.response.data){
                mensaje = error.response.data;
            }else {
                mensaje = "Ocurrio un error. Por favor intente de nuevo";
            }
            Swal2.fire('Error', mensaje, 'error');
        }
    }

    return(
        <div className='sidebar'>
            <h1 className='container-fluid'>
                <div className='row'>
                    <div className='col'>
                        <div className='sidebar-header'>
                            <h3>Nueva Tarea</h3>                           
                            <i className='fa-solid fa-xmark' onClick={ handleOpenModal }></i>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <hr />
                    </div>
                </div>
                <form onSubmit={ (e) => { handleOnSubmit(e) } }>
                    <div className='row'>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Título Tarea</label>
                                <input type="text" name='nombre' 
                                    value={nombre} className="form-control"                                    
                                    placeholder="escribe el título de tu tarea"
                                    required
                                    onChange={ (e) => { handleOnChange(e) } } />
                            </div>
                        </div>
                    </div> 
                    <div className='row'>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Descripción Tarea</label>
                                <textarea name='descripcion' 
                                    value={descripcion} 
                                    className="form-control" 
                                    rows="4"
                                    required
                                    onChange={ (e) => { handleOnChange(e) } } >
                                </textarea>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Usuario</label>
                                <select className="form-select" 
                                    aria-label="Default select example"
                                    name='usuario'
                                    value={usuario}
                                    required
                                    onChange={ (e) => { handleOnChange(e) } } >
                                    <option selected value="">---Seleccione---</option>
                                    {
                                        usuarios.map((usu) => {
                                            return <option key={usu._id} value={usu._id}>{usu.nombre}</option>
                                        })
                                    }
                                    {/**<option value="1">One</option>
                                    <option value="2">Two</option>
                                <option value="3">Three</option>*/}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Estado Tarea</label>
                                <select className="form-select" 
                                    aria-label="Default select example"
                                    name='estado'
                                    value={estado}
                                    required
                                    onChange={ (e) => { handleOnChange(e) } } >
                                    <option selected value="">---Seleccione---</option>
                                    {
                                        estadoTareas.map((estadoTarea) => {
                                            return <option key={estadoTarea._id} value={estadoTarea._id}>{estadoTarea.nombre}</option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <button className='btn btn-primary'>Guardar</button>
                        </div>
                    </div>
                </form>
            </h1>
        </div>
    )
}