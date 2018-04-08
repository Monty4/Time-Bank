import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

import './index.css'
import logo from '../../logo.png'

class Header extends Component {

    render() {
        return (
            <header className="header">
                <nav className="navbar navbar-expand-sm navbar-light bg-light">
                    <div className="container-fluid">
                        <div className="navbar-header">
                        <a href=""><img src={logo} alt="" /></a>
                            <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#myNavbar">
                                <span className="navbar-toggler-icon" ></span>
                            </button>
                        </div>
                        
                        <div className="collapse navbar-collapse" id="myNavbar">
                            <ul className="navbar-nav mr-auto">
                                {/* <li><NavLink className="nav-link" to="/">Home</NavLink></li> */}
                                <li><NavLink className="nav-link" to="/search">Search</NavLink></li>
                                <li><NavLink className="nav-link" to="/contracts">Contracts</NavLink></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        )
    }
}

export default Header