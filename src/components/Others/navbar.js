import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';

export default function navbar() {
    return (
        <div className="flex">
            {/* <Link to="/groups/add" className="btn btn-sm bg-arrows text-white m-2">
                Ir a Estudiantes
            </Link>
            <Link to="/groups" className="btn btn-sm bg-arrows text-white m-2">
                Ir a Grupo
            </Link> */}

            <nav className="navbar navbar-expand-lg navbar-light bg-primary">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <NavLink to="/groups" className="nav-link" activeClassName="active">Grupos</NavLink>
                            <NavLink to="/students" className="nav-link" activeClassName="active">Estudiantes</NavLink>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}
