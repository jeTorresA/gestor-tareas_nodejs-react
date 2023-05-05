import {React, useState, useEffect } from 'react';
import { getUsuarios } from '../../services/usuarioService';
import { UsuarioCard } from './UsuarioCard';
import { UsuarioNew } from './UsuarioNew';

const UsuarioView = () => {

    const [ usuarios, setUsuarios ] = useState([]);
    const [ openModal, setOpenModal ] = useState(false);


    const listarUsuarios = async () => {
        try {
            const { data } = await getUsuarios();
            setUsuarios(data);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect( () => {
        listarUsuarios()
    }, []);


    const handleOpenModal = () => {
        setOpenModal(!openModal);
    } 



    return(
        <div className='container-fluid'>
            <div className='mt-2 mb-2 row row-cols-1 row-cols-md-3 g-4'>
                {
                    usuarios.map( (usuario) => {
                        return <UsuarioCard key={usuario._id} usuario={usuario} />
                    })
                }
            </div>
            {
                openModal ? <UsuarioNew handleOpenModal={ handleOpenModal } listarUsuarios={ listarUsuarios } />
                          : <button className='btn btn-primary fab'>
                            <i className='fa-solid fa-plus' onClick={ handleOpenModal } ></i>
                          </button>
            }
        </div>
    );
}

export {
    UsuarioView,
}