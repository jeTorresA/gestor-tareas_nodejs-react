import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Swal2 from 'sweetalert2';

import { getTareaPorID, editTarea } from "../../services/tareaService";
import { getUsuarios } from "../../services/usuarioService";
import { getEstadoTareas } from "../../services/estadoTareaService";


export const TareaUpdate = () => {

    const { tareaID = '' } = useParams();
    //console.log(tareaID);
    const [ tarea, setTarea ] = useState({});

    const [ usuarios, setUsuarios ] = useState([]);
    const [ estadoTareas, setEstadoTareas ] = useState([]);
    const [ valoresForm, setValoresForm ] = useState({});
    const { nombre = "", descripcion = "", usuario, estado } = valoresForm;

    const getTarea = async () => {
        try {
            Swal2.fire({
                allowOutsideClick : false,
                text : "Cargando..."
            });
            Swal2.showLoading();
            const { data } = await getTareaPorID(tareaID);
            console.log(data);
            setTarea(data);
            Swal2.close();

        }catch (error) {
            console.log(error);
            Swal2.close();
            let mensaje;
            if (error && error.response && error.response.data){
                mensaje = error.response.data;
            }else{
                mensaje = "Ocurrio un error. Por favor intente de nuevo";
            }
            Swal2.fire('Error', mensaje, 'error');
        }
    } 

    useEffect(() => {
        getTarea();
    }, [ tareaID ]);

    useEffect(() => {
        if (tarea) {
            setValoresForm ({
                nombre : tarea.nombre,
                descripcion : tarea.descripcion,
                usuario : tarea.usuario,
                estado : tarea.estado
            });
        }
    }, [ tarea ]);

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
        try {
            Swal2.fire({
                allowOutsideClick : false, //cuando del click por fuera de la ventana, no se cierre
                text : 'Cargando...'
            });
            Swal2.showLoading();//para mostrar animacion de cargando                   
            const { data } = await editTarea(tareaID, tarea);   
            console.log(data);      
            Swal2.close();
            //handleOpenModal();//para cerrar TareaNew     
            //listarTareas();
        } catch (error) {
            console.log(error);
            Swal2.close();
        }
    }


    return (
        <div className='container-fluid mt-3 mb-2'>
            <div className='card'>
                <div className='card-header'>
                    <h5 className='card-title'>Detalle Tarea</h5>                    
                </div>
                <div className="card-body">
                    <div className='row'>
                        <div className="col-md-3">

                        </div>
                        <div className="col-md-9">
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}