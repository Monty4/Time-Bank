import React, { Component } from 'react'
import { Redirect } from 'react-router'
import api_client from '../api-client'

import '../App.css'
import '../login.css'

class Register extends Component {
  constructor() {
    super()
    
    this.state = {
      name: '',
      surname: '',
      username: '',
      password: '',
      service: [],
      city: '',
      borough: '',
      email: '',
      services: []
    }
  }

  fillName = (event) => {
    this.setState({ name: event.target.value })
  }

  fillSurname = (event) => {
    this.setState({ surname: event.target.value})
  }

  fillUsername = (event) => {
    this.setState({ username: event.target.value})
  }

  fillPassword = (event) => {
    this.setState({ password: event.target.value})
  }

  fillService = (event) => {
    this.setState({ service: event.target.value})
  }

  fillCity = (event) => {
    this.setState({ city: event.target.value})
  }

  fillBorough = (event) => {
    this.setState({ borough: event.target.value})
  }

  fillEmail = (event) => {
    this.setState({ email: event.target.value})
  }

  submit = () => {
    api_client.registerUser(
      this.state.name,
      this.state.surname,
      this.state.username,
      this.state.password,
      [this.state.service],
      this.state.city,
      this.state.borough,
      this.state.email
    )
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
              <h2>Register User</h2>
              <form method="post" onSubmit={(e) => { e.preventDefault(); this.submit() }}>
                <div className="container">
                  <div className="col-sm-12 col-md-6">
                    <label htmlFor="uname">Name</label>
                    <input type="text" placeholder="Enter Name" name="uname" className="formText" onChange={this.fillName} required />
                    <label htmlFor="uname">Surname</label>
                    <input type="text" placeholder="Enter Surname" name="uname" className="formText" onChange={this.fillSurname} required />
                    <label htmlFor="uname">Username</label>
                    <input type="text" placeholder="Enter Username" name="uname" className="formText" onChange={this.fillUsername} required />
                    <label htmlFor="psw">Password</label>
                    <input type="password" placeholder="Enter Password" name="psw" className="formText" onChange={this.fillPassword} required />
                    <label htmlFor="uname">Service</label>
                    <select onChange={this.fillService} className="formText">
                      <option className="field" value="">Select Service</option>
                      {
                        this.state.services.map(service => {
                          return <option className="field" key={service._id} value={service._id}>{service.title}</option>
                        })
                      }
                    </select>
                    <label htmlFor="uname">City</label>
                    <input type="text" placeholder="Enter City" name="uname" className="formText" onChange={this.fillCity} required />
                    <label htmlFor="uname">Borough</label>
                    <input type="text" placeholder="Enter Borough" name="uname" className="formText" onChange={this.fillBorough } required />
                    <label htmlFor="uname">email</label>
                    <input type="text" placeholder="Enter email" name="uname" className="formText" onChange={this.fillEmail} required />
                    <button type="submit" className="btn btn-primary">Register</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    )
  }
}

export default Register