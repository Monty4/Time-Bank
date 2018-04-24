import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom'
import swal from 'sweetalert2'
import './index.css'

import api from '../../api-client.js'

class Contracts extends Component {
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
            rowColor: 'col-12 titleRow green'
        }
    }

    markAccept = (_id, status) => {
        if (status === 'accepted' || status === 'cancelled' || status === 'done' || status === 'validated') {
            api.acceptContract( _id, status )
            .then(()=>this.updateContractServed(_id, status))
        }else if (status === 'rejected') {
            api.acceptContract( _id, status )
            .then(()=>this.updateContractRequested(_id, status))
        }
    }

    updateContractServed =(_id, status)=>{
        const contractsServed = this.state.contractsServed.map(contract=>{
            if(contract._id === _id)
                contract.status = status
            return contract
        })
        this.setState({contractsServed})
    }

    updateContractRequested =(_id, status)=>{
        const contractsRequested = this.state.contractsRequested.map(contract=>{
            if(contract._id === _id)
                contract.status = status
            return contract
        })
        this.setState({contractsRequested})
    }

    fillValidate = (event) => {
        this.setState({ estimatedTime: event.target.value })
    }

    setDone = (_id, status) => {

        swal({
            title: 'Invested time',
            
            html:
                `<input type="number" min="0" max="12" id="invested" class="swal2-input" value="" placeholder="invested time">`,
                 
            focusConfirm: false,
            preConfirm: () => {
                return {
                    name: document.getElementById('invested').value,
                }
            }
        })
        .then(res => {
            api.donecontract( _id, status, res.value.name )
            .then(()=>this.updateContractServed(_id, status))
            .then(()=>this.setState({redirect:true}))
        })
        .catch(err => {
            console.log(err.message)
        })
    }

    setValidate = (_id, server, status) => {
        swal({
            title: 'Time, Review and Valuation',
            html:
              '<input type="number" min="0" max="12" id="swal-input1" class="swal2-input" placeholder="Validated time">' +
              '<input id="swal-input2" class="swal2-input" placeholder="Review">'+
              '<input type="number" min="0" max="5" id="swal-input3" class="swal2-input" placeholder="Valuation">',
            focusConfirm: false,
            preConfirm: () => {
              return {
                validateTimme: document.getElementById('swal-input1').value,
                review: document.getElementById('swal-input2').value,
                valuation: document.getElementById('swal-input3').value
              }
            }
          })
        .then(res => {
            if(res.value.valuation>5)
                res.value.valuation=5
            if(res.value.validateTimme>12)
                res.value.validateTimme=12
                
            api.validatecontract( _id, status, res.value.validateTimme )
            api.registerreview(_id, server, res.value.review, res.value.valuation)
            .then(this.updateContractServed(_id, status))
            .then(this.setState({redirect:true}))
            .then(()=>this.updateContractRequested(_id, status))
        })
        .catch(err => {
            console.log(err.message)
        })
    }
    
    componentDidMount() {
        api.retrievecontractsServed(this.state.client).then(res => {
            this.setState({ contractsServed: res.data })
        })

        api.retrievecontractsRequested(this.state.client).then(res => {
            this.setState({ contractsRequested: res.data })
        })
        
    }

    render() {
        return (
            <main>
                <div>
                    </div>
                <div className="container">
                    <div className="row">
                        <div className="card-title section">
                            <h3>My Contracts</h3>
                        </div>
                        <div className="col-12">
                            <div className="card searchField">
                                <div className="title"><h5>Offered services</h5></div>
                                <div className="card-body">
                                    <form>
                                        <div className="row">
                                            <div className="col-12 field">
                                                <div className="col-2 contractfield">
                                                    <label><strong>Status</strong></label>
                                                </div>
                                                <div className="col-2 contractfield">
                                                    <label><strong>Change status</strong></label>
                                                </div>
                                                <div className="col-4 contractfield" >
                                                    <label><strong>Client</strong></label>
                                                </div>
                                                <div className="col-4 contractfield" >
                                                    <label><strong>Service</strong></label>
                                                </div>
                                            </div>
                                            {this.state.contractsServed.map(contract => {
                                                // let rowColor = this.state.rowColor ===  'col-12 titleRow green' ? 'col-12 titleRow yellow' : 'col-12 titleRow greenn' // borrar??
                                                // this.setState({rowColor})
                                                let contractClass=''
                                                if (contract.status === 'pending') contractClass='col-2 contractfield text-primary'
                                                else if (contract.status === 'accepted' || contract.status === 'done' || 'validated') contractClass="col-2 contractfield text-success"
                                                else if (contract.status === 'cancelled') contractClass="col-2 contractfield text-danger"
                                                return (
                                                    <div className="col-12 titlesRow">
                                                    {/* <div className={this.state.rowColor}>  */}
                                                        <div className={contractClass}>
                                                            <label>{contract.status}</label>
                                                        </div>
                                                        <div className="col-2 contractfield">
                                                        { contract.status === 'pending' ? (<a className="accepted" href="" onClick={(e)=>{e.preventDefault();this.markAccept(contract._id, 'accepted')}}>Accept</a>) : undefined}
                                                        { contract.status === 'pending' ? (<a className="cancelled" href="" onClick={(e)=>{e.preventDefault();this.markAccept(contract._id, 'cancelled')}}>Cancel</a>) : undefined}
                                                        { contract.status === 'accepted' ? (<a className="accepted" href="" onClick={(e)=>{e.preventDefault();this.setDone(contract._id, 'done')}}>Done</a>) : undefined
                                                        }
                                                        </div>
                                                        <div className="col-4 contractfield" >    
                                                            <label>{contract.client.name}</label>
                                                        </div>
                                                        <div className="col-4 contractfield" >    
                                                            <label>{contract.service.title}</label>
                                                        </div>
                                                    </div>
                                                )})
                                            }
                                            <div className="col-sm-12 col-md-3" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="card searchField">
                                <div className="title"><h5>Requested services</h5></div>
                                <div className="card-body">
                                    <form>
                                        <div className="row">
                                            <div className="col-12 field">
                                                <div className="col-2 contractfield">
                                                    <label><strong>Status</strong></label>
                                                </div>
                                                <div className="col-2 contractfield">
                                                    <label><strong>Change status</strong></label>
                                                </div>
                                                <div className="col-4 contractfield" >
                                                    <label><strong>Client</strong></label>
                                                </div>
                                                <div className="col-4 contractfield" >
                                                    <label><strong>Service</strong></label>
                                                </div>
                                            </div>
                                            {this.state.contractsRequested.map((contract, index) => {
                                                let contractClass=''
                                                if (contract.status === 'pending') contractClass='col-2 contractfield text-primary'
                                                else if (contract.status === 'accepted' || contract.status === 'done' || 'validated') contractClass="col-2 contractfield text-success"
                                                else if (contract.status === 'rejected') contractClass="col-2 contractfield text-danger"
                                                return (
                                                    <div className="col-12 titlesRow"> 
                                                    <div className={contractClass}>
                                                        <label>{contract.status}</label>
                                                    </div>
                                                    <div className="col-2 contractfield">
                                                        { contract.status === 'pending' ? (<a className="cancelled" href="" onClick={(e)=>{e.preventDefault();this.markAccept(contract._id, 'rejected')}}>Reject</a>) : undefined }
                                                        { contract.status === 'done' ? (<a className="accepted" href="" onClick={(e)=>{e.preventDefault(); this.setValidate(contract._id, contract.server._id, 'validated')}}>Validate</a>) : undefined }
                                                    </div>
                                                    <div className="col-4 contractfield" >    
                                                        <label>{contract.server.name}</label>
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
                            <div>&nbsp;</div>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}

export default Contracts