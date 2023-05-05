import React from "react";
import { Link } from "react-router-dom";

export const UsuarioCard = ({ usuario }) => {
    //console.log(usuario);
    return (
        <div>
            <div className='col'>
                <div className="card text-left">             
                    <div className="card-body">
                        <h5 className="card-title">Nombre : {usuario.nombre}</h5>
                        <hr/>
                        <p className="card-text">email : {usuario.email}</p>  
                        <p className="card-text">estado : {usuario.estado}</p>                       
                    </div>
                    <div className="card-footer text-muted">
                        <Link to={ `/usuarios/edit/${usuario._id}` }>Detalle...</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}