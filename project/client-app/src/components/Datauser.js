import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import '../App.css'

import api from '../api-client.js'
import Comments from './Comments'

class Datauser extends Component {
    constructor() {
        super()
        this.state = {
            user: [],
            contractsServed: [],
            contractsRequested: []
        }
    }

    componentDidMount() {
        api.retrieve(this.props.match.params.id).then(res => res.data).then(user => this.setState({ user }))
        api.retrievecontractsServed(this.props.match.params.id).then(res => res.data).then(contractsServed => this.setState({ contractsServed }))
        api.retrievecontractsRequested(this.props.match.params.id).then(res => res.data).then(contractsRequested => this.setState({ contractsRequested }))
    }

    render() {
        return (
            <main>
                {(this.state.user) ? // Al ser una llamada asíncrona, la página se carga antes de obtener datos y da error. Para que esto no ocurra, ponemos el ternario
                    <div className="container">
                        <div className="row">
                            <div className="card-title section">
                                <h3>Server user information</h3>
                                <h6>Name: {this.state.user.name} {this.state.user.surname}({this.state.user.username})</h6>
                                <h6>City: {this.state.user.city}</h6>
                                <h6>Borough: {this.state.user.borough}</h6>
                            </div>
                            <div className="col-12">
                                { this.state.contractsServed.length > 0 ?
                                <div className="card searchField">
                                    <div className="title"><h5>Served Services</h5></div>
                                    <div className="card-body">
                                        <form>
                                            <div className="row">
                                            <div className="col-12"> 
                                            <div className="col-4 contractfield">
                                                <label>Status</label>
                                            </div>    
                                            <div className="col-4 contractfield" >    
                                                <label>Client</label>
                                            </div>    
                                            <div className="col-4 contractfield" >    
                                                <label>Service</label>
                                            </div>
                                            </div>
                                                {this.state.contractsServed.map((service, index) => {
                                                        return (
                                                            <div className="col-12"> 
                                                            <div className="col-4 contractfield">
                                                                <label>{service.status}</label>
                                                            </div>    
                                                            <div className="col-4 contractfield" >    
                                                                <label>{service.client}</label>
                                                            </div>    
                                                            <div className="col-4 contractfield" >    
                                                                <label>{service.service}</label>
                                                            </div>
                                                            </div>
                                                        )
                                                    })}
                                                <div className="col-sm-12 col-md-3" />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                : undefined
                            }
                            { this.state.contractsRequested.length > 0 ?
                                <div className="card searchField">
                                    <div className="title"><h5>Requested Services</h5></div>
                                    <div className="card-body">
                                        <form>
                                            <div className="row">
                                            <div className="col-12"> 
                                            <div className="col-4 contractfield">
                                                <label>Status</label>
                                            </div>    
                                            <div className="col-4 contractfield" >    
                                                <label>Client</label>
                                            </div>    
                                            <div className="col-4 contractfield" >    
                                                <label>Service</label>
                                            </div>
                                            </div>
                                                {this.state.contractsRequested.map((service, index) => {
                                                        return (
                                                            <div className="col-12"> 
                                                            <div className="col-4 contractfield">
                                                                <label>{service.status}</label>
                                                            </div>    
                                                            <div className="col-4 contractfield" >    
                                                                <label>{service.client}</label>
                                                            </div>    
                                                            <div className="col-4 contractfield" >    
                                                                <label>{service.service}</label>
                                                            </div>
                                                            </div>
                                                        )
                                                    })}
                                                
                                                <div className="col-sm-12 col-md-3" />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                : undefined
                                }
                                <div className="col-12 field">
                                    <input type="submit" defaultValue="Contract" className="btn btn-outline-secondary" />
                                </div>
                            </div>
                        </div>
                    </div>
                    : undefined
                }
            </main>
        )
    }
}

export default Datauser