import React from "react";
import { Link } from 'react-router-dom';


const TareaCard = ({ tarea }) => {
    
    return(
        <div className='col'>
            <div className="card text-center">
                <div className="card-header">
                    {`Fecha Creacion ${tarea.fechaCreacion}`}
                </div>
                <div className="card-body">
                    <h5 className="card-title">{tarea.nombre}</h5>
                    <p className="card-text">{tarea.descripcion}</p>
                    <Link to={ `/tareas/edit/${tarea._id}` }>Detalle...</Link>
                </div>
                <div className="card-footer text-muted">
                    {`Fecha Actualización ${tarea.fechaActualizacion}`}
                </div>
            </div>
        </div>
    )
}

export {
    TareaCard,
}