import React, { Component } from 'react'
import api from 'api-client'

import '../App.css'
import '../login.css'

class Login extends Component {
  constructor() {
    super()
    
    this.state = {
      name: '',
      surname: '',
      username: '',
      password: '',
      city: '',
      borrough: '',
      email: ''
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

  fillCity = (event) => {
    this.setState({ city: event.target.value})
  }

  fillBorrough = (event) => {
    this.setState({ borrough: event.target.value})
  }

  fillEmail = (event) => {
    this.setState({ email: event.target.value})
  }

  submit = () => {
    api.register(
      this.state.name,
      this.state.surname,
      this.state.username,
      this.state.password,
      this.state.city,
      this.state.borrough,
      this.state.email
    )
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
                    <label htmlFor="uname">City</label>
                    <input type="text" placeholder="Enter City" name="uname" className="formText" onChange={this.fillCity} required />
                    <label htmlFor="uname">Borrough</label>
                    <input type="text" placeholder="Enter Borrough" name="uname" className="formText" onChange={this.fillBorrough } required />
                    <label htmlFor="uname">email</label>
                    <input type="text" placeholder="Enter email" name="uname" className="formText" onChange={this.fillEmail} required />
                    <button type="submit" className="btn btn-primary">Login</button>
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

export default Login