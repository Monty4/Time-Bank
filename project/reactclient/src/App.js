import React, { Component } from 'react'
import { Route, HashRouter } from 'react-router-dom'

import './App.css'
import Menu from './components/Menu'
import Search from './components/Search'
import Datauser from './components/Datauser'
import Login from './components/Login'
import api_client from './api-client.js'



class TimebankApp extends Component {

  constructor() {
    super()
    this.state = {
      users: [],
      userID: '',
      userName: '',
      userPassword: '',
      userSurname: '',
      userCity: '',
      userBorrough: ''
    }
  }

  setUserId = (userID) => {
    this.setState({
      userID
    })
  }

  setUserName = (userName) => {
    this.setState({
      userName
    })
  }

  setFormFields = (userName) => {
    this.setState({
      userName
    })
  }

  componentWillMount() {
  
    api_client.getList().then(users => {
      this.setState({ users})
    })

    
  }

  render() {
    return (
      <div>
      <HashRouter>
        <div>
          <Route path="/" render={() => (
            <Menu />
          )} />

          <Route path="/login" render={() => (
            <Login setFormFields={this.setFormFields} />
          )} />

          <Route path="/search" render={() => (
            <Search users={this.state.users} onClickUserId={this.setUserId} onClickUserName={this.setUserName} />
          )} />

          <Route path="/datauser" render={() => (
            <Datauser id={this.state.userID} />
          )} />

        </div>
      </HashRouter>
      </div>
    )
  }
}

export default TimebankApp;
