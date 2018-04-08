import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom'
// import '../App.css'

import api from '../../api-client.js'
import Comments from '../Comments/index'

class Datauser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: [],
            contractsServed: [],
            contractsRequested: [],
            service: '',
            serviceName: '',
            server:'',
            client: '5ab41ba28971a93b24e8bb97',
            status: '',
            estimatedTime:0,
            investedTime:0,
            validatedTime:0,
            redirect: false,
            reviews: []
        }
    }

    fillTime = (event) => {
        this.setState({ estimatedTime: event.target.value })
    }

    componentDidMount() {
        api.retrieve(this.props.match.params.id).then(res => res.data).then(user => this.setState({ user }))

        api.service(this.props.match.params.service).then(res => res.data).then(serviceName => this.setState({ serviceName: serviceName.title }))

        api.retrievecontractsServed(this.props.match.params.id).then(res => {
            this.setState({ contractsServed: res.data })
        })

        api.retrievecontractsRequested(this.props.match.params.id).then(res => {
            this.setState({ contractsRequested: res.data })
        })

        api.listUserReviews(this.props.match.params.id).then(res => {
             this.setState({ reviews: res.data })
        })

        this.setState({service: this.props.match.params.service})
        this.setState({server: this.props.match.params.id})
        this.setState({status: 'pending'})
    }

    createContract( service, server, client, status, estimatedTime, investedTime, validatedTime ) {

        api.registercontract( service, server, client, status, estimatedTime, investedTime, validatedTime )
        .then(()=>this.setState({redirect:true}))
      }

    render() {
        return (
            <main>
                {(this.state.user) ? // Al ser una llamada asíncrona, la página se carga antes de obtener datos y da error. Para que esto no ocurra, ponemos el ternario
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12 col-md-6 card-title section">
                                <h3>User information</h3>
                                <h6><strong>Name(Username):</strong> {this.state.user.name} {this.state.user.surname}({this.state.user.username})</h6>
                                <h6><strong>City/Borough:</strong> {this.state.user.city} / {this.state.user.borough}</h6>
                                
                            </div>
                            <div className="col-sm-12 col-md-6 card-title section">
                                <h3>Contract data</h3>
                                <h6><strong>Service to contract:</strong> {this.state.serviceName}</h6>
                                <input type="text" placeholder="Estimated time" onChange={this.fillTime} />
                            </div>
                            <div className="col-sm-12 col-md-4" />
                            <div className="col-sm-12 col-md-4">
                                <button className="btn btn-outline-secondary" to="/datauser" onClick={(e)=>{e.preventDefault(); this.createContract(this.state.service, this.state.server, this.state.client, this.state.status, this.state.estimatedTime, this.state.investedTime, this.state.validatedTime)}}>Contract</button>
                            </div>
                            <div className="col-sm-12 col-md-4" />
                            <div className="col-12">
                                { this.state.contractsServed.length > 0 ?
                                <div className="card searchField">
                                    <div className="title"><h5>Served Contracts</h5></div>
                                    <div className="card-body">
                                        <form>
                                            <div className="row">
                                            <div className="col-12"> 
                                            <div className="col-4 contractfield">
                                                <label><strong>Status</strong></label>
                                            </div>    
                                            <div className="col-4 contractfield" >    
                                                <label><strong>Client</strong></label>
                                            </div>    
                                            <div className="col-4 contractfield" >    
                                                <label><strong>Service</strong></label>
                                            </div>
                                            </div>
                                                {this.state.contractsServed.map(contract => {
                                                    return (
                                                        <div className="col-12"> 
                                                            <div className="col-4 contractfield">
                                                                <label>{contract.status}</label>
                                                            </div>    
                                                            <div className="col-4 contractfield" >    
                                                                <label>{contract.client.name}</label>
                                                            </div>    
                                                            <div className="col-4 contractfield" >    
                                                                <label>{contract.service.title}</label>
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
                                    <div className="title"><h5>Requested Contracts</h5></div>
                                    <div className="card-body">
                                        <form>
                                            <div className="row">
                                            <div className="col-12"> 
                                            <div className="col-4 contractfield">
                                                <label><strong>Status</strong></label>
                                            </div>    
                                            <div className="col-4 contractfield" >    
                                                <label><strong>Client</strong></label>
                                            </div>    
                                            <div className="col-4 contractfield" >    
                                                <label><strong>Service</strong></label>
                                            </div>
                                            </div>
                                                {this.state.contractsRequested.map((service, index) => {
                                                        return (
                                                            <div className="col-12"> 
                                                            <div className="col-4 contractfield">
                                                                <label>{service.status}</label>
                                                            </div>    
                                                            <div className="col-4 contractfield" >    
                                                                <label>{service.server.name}</label>
                                                            </div>    
                                                            <div className="col-4 contractfield" >    
                                                                <label>{service.service.title}</label>
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
                                <div>
                                    <div className="card-body">
                                        <div className="row">
                                            {this.state.reviews.map((review, index) => {
                                                return (
                                                    <div className="col-12 card searchField"> 
                                                        <div className="col-4 contractfield">
                                                            <label><strong>Review {index+1}</strong> (Valuation: {review.valuation})</label>
                                                        </div>    
                                                        <div className="col-4 contractfield" >    
                                                            <label></label>
                                                        </div>    
                                                        <div className="col-4 contractfield" >    
                                                            <label>{review.comment}</label>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    : undefined
                }
                {this.state.redirect 
                ?
                <Redirect to='/contracts' />
                :
                undefined
                }
            </main>
        )
    }
}

export default Datauser