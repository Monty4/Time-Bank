import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

import '../App.css'

function Menu() {
    return (
        <nav className="navbar navbar-expand-sm navbar-light bg-light">
          <div>
            <NavLink className="nav-link" to="/"><img src="images/LogoBlue.png" id="logo" /></NavLink>
          </div>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarMenu" aria-controls="navbarMenu" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" ></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarMenu">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/search">Search</NavLink>
              </li>
              <li className="nav-item">
              <NavLink className="nav-link" to="/contracts">Contracts</NavLink>
              </li>
            </ul>
        </div>
        </nav>
    )
}

export default Menu