import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import '../App.css'

import api_client from '../api-client.js'

import List from './List'

class Search extends Component {
  constructor(props) {
    super(props)

    this.state={
      services: [],      
      service: '',
      city: '',
      borough: ''
    }
  }

  fillService = (event) => {
    this.setState({ service: event.target.value })
  }

  fillCity = (event) => {
    this.setState({ city: event.target.value})
  }

  fillBorough = (event) => {
    this.setState({ borough: event.target.value})
  }

  submit = () => {
    api_client.getList(
      this.state.service,
      this.state.city,
      this.state.borough
    ).then(users => {
      this.props.getList(users)
    })
  }

  componentWillMount() {
    api_client.getServices().then(services => {
      this.setState({ services })
    })
  }
  
  render() {
    return (
      <main>
          <div className="container">
            <div className="row">
              <div className="card-title section">
                <h3>Search</h3>
              </div>
              <div className="col-12">
                <div className="card searchField">
                  <div className="card-body">
                    <form method="post" onSubmit={(e) => { e.preventDefault(); this.submit() }}>
                      <div className="row">
                        <div className="col-sm-12 col-md-3 field">
                          <select onChange={this.fillService}>
                          <option className="field">Select Service</option>
                          {
                            this.state.services.map(service => {
                              return <option className="field" value={service._id}>{service.title}</option>
                            })
                          }
                          </select>
                        </div>
                        <div className="col-sm-12 col-md-3">
                        </div>
                        <div className="col-sm-12 col-md-3" />
                        <div className="col-sm-12 col-md-3" />
                        <div className="col-sm-12 col-md-3 field">
                          <input type="text" placeholder="city" size="25" onChange={this.fillCity} value={this.state.city} />
                        </div>
                        <div className="col-sm-12 col-md-3 field">
                          <input type="text" placeholder="borough" size="25" onChange={this.fillBorough} />
                        </div>
                        <div className="col-sm-12 col-md-3">
                          <input type="submit" defaultValue="Search" className="btn btn-outline-secondary" />
                        </div>
                        <div className="col-sm-12 col-md-3" />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 title">
                <h5>Users matched</h5>
                <h6>{this.state.city} ({this.state.borough})</h6>
              </div>
            </div>
            <div className="card-group">
            {
              this.props.users.map(user => {
                return <List key={user._id} user={user} onClickUserId={this.props.onClickUserId} onClickUserName={this.props.onClickUserName} />
              })
            }
            </div>
            {/* <div className="row">
              <div className="text-center col-12 padding-left: 0px">
                <nav>
                  <ul className="pagination pagination-sm justify-content-center">
                    <li className="page-item disabled">
                      <a className="page-link" href="#" tabIndex={-1}>Previous</a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">1</a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">2</a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">3</a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#!">Next</a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div> */}
          </div>
        </main>
    )
  }
}

export default Search