import React from 'react';
import { Outlet, NavLink } from 'react-router-dom'; /**se usa NavLink en vez de Link para poder usar los estilos
para la clase active de Bootstrap sobre las etiquetas a
*/

const Header = () =>  {
    return(
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <NavLink to='/tareas' className="navbar-brand">Tareas</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink to='/tareas' className="nav-link" activeClassName="active" aria-current="page">Tareas</NavLink>
                            </li>    {/** active es una clase de Boostrap pero tambien puede ser personalizada */}          
                            {/*<li className="nav-item">
                                <NavLink to='/estadotareas' className="nav-link" activeClassName="active" aria-current="page">Estados Tareas</NavLink>
    </li>*/}
                            <li className="nav-item">
                                <NavLink to='/usuarios' className="nav-link" activeClassName="active" aria-current="page">Usuarios</NavLink>
                            </li>
                        </ul>                
                    </div>
                </div>
            </nav>
            <Outlet />
        </>
    );
}

export {
    Header,
}