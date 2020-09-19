import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import './Header.css';

import logo from '../../image/Logo.png';
import { UserContext } from '../../App';

const Header = () => {

    const {places, handleSelectPlace, detail, user, loggedInUser} = useContext(UserContext);
    



    return (
        <div className='m-4 d-flex justify-content-center align-items-center px-5 '>
            <img style={{width:'120px'}} className="logo" src={logo} alt=""/>
            <div className="input-group ">
                <div className="input-group-prepend">
                  <FontAwesomeIcon style={{fontSize:'25px'}} className='text-white m-2' icon={faSearch} />
                </div>
                <input type="text" style={{backgroundColor:'#ffffff4d', width:'10px'}} className="form-control color-white" placeholder="Search your destination" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>
            <button className="btn mx-1 text-white">News</button>
            <Link to='/home' className="btn mx-1 text-white">Destination</Link>
            <button className="btn mx-1 text-white">Blog</button>
            <button className="btn mx-1 text-white">Contact</button>
            {
                loggedInUser.isLoggedIn 
                ? <h6>{loggedInUser.email}</h6>
                : <Link to='/login' className="btn btn-warning mx-1 text-dark">Login</Link>
            }
        </div>
    );
};

export default Header;