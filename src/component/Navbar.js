import React, {useContext, useEffect, useState} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import NoteContext from '../context/notes/NoteContext'

const Navbar = () => {
    let navigate = useNavigate()
    const context = useContext(NoteContext)
    const {setauthToken, authToken} = context;
    let location = useLocation();
    useEffect(() => {

    }, [location]);

    const logout = ()=>{
        localStorage.removeItem('auth');
        setauthToken(null)
        navigate("/login");
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <Link className="navbar-brand" to={authToken ? '/' : '/login'}>iNotebook</Link>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item"><Link className={`nav-link  ${location.pathname === '/' ? ' active' : ''}`} aria-current="page" to={authToken ? '/' : '/login'}>Home</Link></li>
                        <li className="nav-item"><Link className={`nav-link  ${location.pathname === '/about'? 'active' : ''}`} aria-current="page" to={authToken ? '/about' : '/login'}>About</Link></li>
                    </ul>
                </div>
                {
                    !authToken &&
                    <div className="d-flex float-end">
                        <Link to={'/login'} className='btn btn-primary mx-2'>Login</Link>
                        <Link to={'/signup'} className='btn btn-primary'>Signup</Link>
                    </div>
                }
                {
                    authToken && 
                    <div className="d-flex float-end">
                        <button onClick={logout}  className='btn btn-primary mx-2'>Log Out</button>
                    </div>
                }
            </div>
        </nav>
    )
}

export default Navbar;