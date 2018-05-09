import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import swal from 'sweetalert2'
import api from '../../api-client.js'

import './index.css'
import logo from '../../logo.png'

class Header extends Component {
    constructor() {
        super()
        this.state = {
            services: ['5ab18bf0f5ca252380467fcb'],
            

            redirect: false
        }
    }

    swalLogin() {
        swal({
            title: 'Login',
            html:
                "<input id='username' class='swal2-input' placeholder='Username' type='text'>" +
                "<input id='password' class='swal2-input' placeholder='Password' type='password'>",
            focusConfirm: false,
            preConfirm: () => {
                return {
                    username: document.getElementById('username').value,
                    password: document.getElementById('password').value,
                }
            }
        })
    }

    swalRegister() {
        swal({
            title: 'Register',
            html:
                "<input id='name' class='swal2-input' placeholder='Name' type='text'>" +
                "<input id='surname' class='swal2-input' placeholder='Surname' type='text'>" +
                "<input id='username' class='swal2-input' placeholder='Username' type='text'>" +
                "<input id='email' class='swal2-input' placeholder='Email' type='text'>" +
                "<input id='password' class='swal2-input' placeholder='Password' type='password'>" +
                "<input id='city' class='swal2-input' placeholder='City' type='text'>" +
                "<input id='borough' class='swal2-input' placeholder='Borough' type='text'>" ,
                

                input: 'select',
                inputId: 'service',
                inputOptions: {
                    '5ab18bf0f5ca252380467fcb': 'Mechanics',
                    '5ab18d59f5ca252380467fcc': 'Painting',
                    '5ab3df89d27c623d0c741607': 'Programmer'
                },
                inputPlaceholder: 'Select service',
                showCancelButton: true,
                
                
            focusConfirm: false,
            preConfirm: () => {
                return {
                    name: document.getElementById('name').value,
                    surname: document.getElementById('surname').value,
                    username: document.getElementById('username').value,
                    email: document.getElementById('email').value,
                    password: document.getElementById('password').value,
                    city: document.getElementById('city').value,
                    borough: document.getElementById('borough').value
                }
            }
        }).then (res => {
            api.register(res.value.name, res.value.surname, res.value.username, res.value.email, res.value.password, this.state.services, res.value.city, res.value.borough)
            .then(()=>this.setState({redirect:true}))
        })
    }

    render() {
        return (
            <header>
                <nav className="navbar navbar-expand-sm navbar-light bg-light header-color">
                    <div className="container-fluid">
                        <div className="navbar-header">
                        <a href=""><img src={logo} alt="" /></a>
                            <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#myNavbar">
                                <span className="navbar-toggler-icon" ></span>
                            </button>
                        </div>
                        
                        <div className="collapse navbar-collapse" id="myNavbar">
                            <ul className="navbar-nav mr-auto navbar-left">
                                <li><NavLink className="nav-link" to="/search">Search</NavLink></li>
                                <li><NavLink className="nav-link" to="/contracts">Contracts</NavLink></li>
                            </ul>
                        </div>

                        <div>
                            <ul className="navbar-nav mr-auto navbar-right">
                                <li><a href="" onClick={e => { e.preventDefault(); this.swalLogin() }}><span className="glyphicon glyphicon-log-in" /> Login</a></li>
                                <li><a href="" onClick={e => { e.preventDefault(); this.swalRegister() }}><span className="glyphicon glyphicon-user" /> Register</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
                {this.state.redirect 
                ?
                <Redirect to='/search' />
                :
                undefined
                }
            </header>
        )
    }
}

export default Header