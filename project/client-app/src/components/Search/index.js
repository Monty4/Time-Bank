import React, { Component } from 'react'
// import { NavLink } from 'react-router-dom'
import './index.css'

import api from '../../api-client.js'

import List from './List'

class Search extends Component {
  constructor(props) {
    super(props)

    this.state={
      services: [],      
      service: '',
      city: '',
      borough: '',
      show: ''
    }
  }

  fillService = (event) => {
    this.setState({ service: event.target.value, show: '' })
  }

  fillCity = (event) => {
    this.setState({ city: event.target.value, show: ''})
  }

  fillBorough = (event) => {
    this.setState({ borough: event.target.value, show: ''})
  }

  submit = () => {
    this.setState({ show: 'yes'})
    api.list(
      this.state.service,
      this.state.city,
      this.state.borough
    ).then(users => {
      this.props.getList(users.data)
    })
  }

  componentWillMount() {
    api.services().then(services => {
      this.setState({ services: services.data })
    })
  }
  
  render() {
    return (
      <main>
          <div className="container">
            <div className="row">
              <div className="card-title section">
                <h3>Search users</h3>
              </div>
              <div className="col-12">
                <div className="card searchField">
                  <div className="card-body">
                    <form method="post" onSubmit={(e) => { e.preventDefault(); this.submit() }}>
                      <div className="row">
                        <div className="col-sm-12 col-md-3 field">
                          <select onChange={this.fillService} className="field">
                          <option className="field" value="">Select Service</option>
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
              </div>
            </div>
            <div className="card-group">
            {
              (this.state.show && this.state.service) ? this.props.users.map(user => {
                if (user._id !== '5ab41ba28971a93b24e8bb97') // Es el user Mario Montalban que se utiliza como cliente
                return <List key={user._id} user={user} service={this.state.service} />
              }): undefined
            }
            </div>
          </div>
        </main>
    )
  }
}

export default Search