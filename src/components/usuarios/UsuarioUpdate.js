import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUsuarioPorID, editUsuario } from "../../services/usuarioService";


export const UsuarioUpdate = () =>  {

    const { usuarioID = '' } = useParams();

    const [ usuario, setUsuario ] = useState({});

    const [ valoresForm, setValoresForm ] = useState({});
    const { nombre = '', email = '', estado } = valoresForm;

    const getUsuario = async () => {
        try {
            const { data } = await getUsuarioPorID(usuarioID);
            setUsuario(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect( () => {
        getUsuario();
    }, [ usuarioID ]);

    useEffect( () => {
        if (usuario) {
            setValoresForm ({
                nombre : usuario.nombre,
                email : usuario.email,
                estado : usuario.estado
            })
        }
    }, [ usuario ]);


    const handleOnChange = ({ target }) => {
        //console.log(target);
        const { name, value } = target;
        setValoresForm({ ...valoresForm, [ name ] : value });
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const usuario = {
            nombre, 
            email, 
            estado
        }
        console.log(usuario);
        try {
            await editUsuario( usuarioID, usuario );
            //handleOpenModal();
            //listarUsuarios();
        } catch (error) {
            console.log(error);
        }
    }

    return <div className="sidebar">
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    <div className="sidebar-header">
                        <h3>Nuevo Usuario</h3>
                       {/* <i className="fa-solid fa-xmark" onClick={ handleOpenModal } ></i>*/}
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <hr/>
                    </div>
                </div> 
                <form onSubmit={ (e) => { handleOnSubmit(e) } }>
                    <div className='row'>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Nombre Usuario</label>
                                <input type="text" name='nombre' 
                                    value={nombre} 
                                    className="form-control"                               
                                    required
                                    onChange={ (e) => { handleOnChange(e) } } />
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">email</label>
                                <input type="text" name='email' 
                                    value={email} 
                                    className="form-control"                               
                                    required
                                    onChange={ (e) => { handleOnChange(e) } } />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="mb-3">
                                <label className="form-label">Estado</label>
                                <select className="form-select"
                                        name="estado" value={estado}
                                        required onChange={ (e) => { handleOnChange(e) } }>

                                    <option selected value="">---Seleccione---</option>
                                    <option value="Activo">Avtivo</option>
                                    <option value="Inactivo">Inactivo</option>
                                    
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <button className="btn btn-primary">Guardar</button>
                        </div>
                    </div>
                </form>              
            </div>            
        </div>
    </div>
}