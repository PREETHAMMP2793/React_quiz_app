// eslint-disable-next-line no-unused-vars
import React from "react";
import logo from '../assets/logo-removebg-preview.png'


function Navbar(){

    return(
        <div>
            {/* Navbar */}
            <nav className="navbar navbar-dark text-white" >
                <div className="container-fluid">
                <span className="navbar-brand mb-0 h1">
                    <img 
                    src={logo} 
                    alt="Logo" 
                    style={{ marginRight: '10px',width: '80px',height: '80px', }} 
                    />Logo
                </span>
                <span className="text-center bree-serif-regular">Quest Informatics</span>
                </div>
            </nav>
        </div>
    )
}

export default Navbar