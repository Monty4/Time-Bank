import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import swal from 'sweetalert2'
import api from '../../api-client.js'
import storage from '../Services/storage.js'

import './index.css'
import logo from '../../logo.png'

class Header extends Component {
    constructor() {
        super()
        this.state = {
            services: [],
            userid: '',
            username: '',
            wallet: 0,
            valuation: 0,
            redirect: false,
            loged: false,
            user: []
        }
    }

    componentDidMount() {
        api.services().then(services => {
          this.setState({ services: services.data })
        })
      }

    componentWillMount() {
        (storage.getToken()) ? this.setState({ loged: true }) : this.setState({ loged: false })

        api.listUser(storage.getToken()).then(res => res.data).then(user => this.setState({ user }))
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
        .then (res => {
            api.login(res.value.username, res.value.password)
            .then(result => {
                if (result.status === 'OK') {
                    storage.setToken(result.data.token)
                    this.setState({ loged: true })
                    this.setState({ userid: result.data.user._id})
                    this.setState({ username: result.data.user.username})
                    api.listUser(storage.getToken()).then(res => res.data).then(user => {
                        this.setState({ user })
                    })
                    this.setState({redirect:true})
                }
                else {
                    console.log('Error, username and/or password wrong')
                }
            })
        })
        .catch(err => {
            console.log(err.message)
        })
        
    }

    swalRegister() {
        let options = ''
        this.state.services.map(service => {
            options += "<option value='" + service._id + "'>" + service.title + "</option>"
        })
        swal({
            title: 'Register',
            html:
                "<input id='name' class='swal2-input' placeholder='Name' type='text'>" +
                "<input id='surname' class='swal2-input' placeholder='Surname' type='text'>" +
                "<input id='username' class='swal2-input' placeholder='Username' type='text'>" +
                "<input id='email' class='swal2-input' placeholder='Email' type='email'>" +
                "<input id='password' class='swal2-input' placeholder='Password' type='password'>" +
                "<input id='city' class='swal2-input' placeholder='City' type='text'>" +
                "<input id='borough' class='swal2-input' placeholder='Borough' type='text'>" +
                "<select id='services' class='swal2-input'>" + 
                "<option value='' disabled selected>Service</option>" + 
                options +
                "</select>" ,
                                
            focusConfirm: false,
            preConfirm: () => {
                return {
                    name: document.getElementById('name').value,
                    surname: document.getElementById('surname').value,
                    username: document.getElementById('username').value,
                    email: document.getElementById('email').value,
                    password: document.getElementById('password').value,
                    city: document.getElementById('city').value,
                    borough: document.getElementById('borough').value,
                    services: document.getElementById('services').value
                }
            }
        }).then (res => {
            let service = res.value.services
            api.register(res.value.name, res.value.surname, res.value.username, res.value.email, res.value.password, [service], res.value.city, res.value.borough, this.state.wallet, this.state.valuation)
        })
        .catch(err => {
            console.log(err.message)
        })
    }
    

    logOut() {
        // this.props.history.push('/')
        storage.removeToken()
        this.setState({ loged: false, redirect: false })
    }

    render() {
        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-light header-color">
                    {/* <a class="navbar-brand" href="#">Navbar</a> */}
                    <a class="navbar-brand" href=""><img src={logo} alt="" /></a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="collapsibleNavbar">
                        <div className="left-menu col-6">
                        <ul className="navbar-nav">
                            <li><NavLink className="nav-link" to="/search">Search</NavLink></li>
                            <li><NavLink className="nav-link" to="/contracts">Contracts</NavLink></li>
                        </ul>
                        </div>

                        <div className="right-menu col-6">
                            {(this.state.loged)
                                ?
                                <ul className="navbar-nav mr-auto navbar-right">
                                    <li><a href="" onClick={e => { e.preventDefault(); this.logOut() }}><span className="glyphicon glyphicon-user" /> Logout {this.state.username}</a></li>
                                    <li><span className="glyphicon glyphicon-user" /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li>
                                </ul>
                                :
                                <ul className="navbar-nav mr-auto navbar-right">
                                    <li><a href="" onClick={e => { e.preventDefault(); this.swalLogin() }}><span className="glyphicon glyphicon-log-in" /> Login</a></li>
                                    <li><a href="" onClick={e => { e.preventDefault(); this.swalRegister() }}><span className="glyphicon glyphicon-user" /> Register</a></li>
                                </ul>
                            }
                        </div>
                        
                    </div>
                </nav>
                {/* <nav className="navbar navbar-expand-sm navbar-light bg-light header-color">
                    <div className="container-fluid">
                        <div className="navbar-header">
                        <a href=""><img src={logo} alt="" /></a>
                            <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#myNavbar">
                                <span className="navbar-toggler-icon" ></span>
                            </button>
                        </div>
                        
                        <div className="collapse navbar-collapse" id="myNavbar">
                            {(this.state.loged)
                                ?
                                <ul className="navbar-nav mr-auto navbar-left">
                                    <li><NavLink className="nav-link" to="/search">Search</NavLink></li>
                                    <li><NavLink className="nav-link" to="/contracts">Contracts</NavLink></li>
                                </ul>
                                :
                                undefined
                            }
                        </div>
                        
                        <div>
                            {(this.state.loged)
                                ?
                                <ul className="navbar-nav mr-auto navbar-right">
                                    <li><a href="" onClick={e => { e.preventDefault(); this.logOut() }}><span className="glyphicon glyphicon-user" /> Logout {this.state.username}</a></li>
                                    <li><span className="glyphicon glyphicon-user" /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li>
                                </ul>
                                :
                                <ul className="navbar-nav mr-auto navbar-right">
                                    <li><a href="" onClick={e => { e.preventDefault(); this.swalLogin() }}><span className="glyphicon glyphicon-log-in" /> Login</a></li>
                                    <li><a href="" onClick={e => { e.preventDefault(); this.swalRegister() }}><span className="glyphicon glyphicon-user" /> Register</a></li>
                                </ul>
                            }
                        </div>
                    </div>
                </nav> */}
                
                {/* { this.state.redirect ? <Redirect to='/search' /> : undefined } */}
                { (this.state.redirect && this.state.loged) ? <Redirect to='/search' /> : <Redirect to='/' /> }
                
            </header>
        )
    }
}

export default Header