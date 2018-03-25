import React, { Component } from 'react'
import { Route, HashRouter } from 'react-router-dom'

import './App.css'
import Menu from './components/Menu'
import Search from './components/Search'
import Datauser from './components/Datauser'
import Register from './components/Register'
import api from './api-client.js'



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
  
    api.list().then(users => {
      this.setState({ users: users.data})
    })
}

  getFilteredUsers = (users) => {
    this.setState({users})
  }

  render() {
    return (
      <div>
      <HashRouter>
        <div>
          <Route path="/" render={() => (
            <Menu />
          )} />

          <Route path="/register" render={() => (
            <Register setFormFields={this.setFormFields} />
          )} />

          <Route path="/search" render={() => (
            <Search getList={this.getFilteredUsers} users={this.state.users} onClickUserId={this.setUserId} onClickUserName={this.setUserName} />
          )} />

          <Route path="/datauser/:id" render={routerProps => (
            <Datauser  {...routerProps}/>
          )} />

        </div>
      </HashRouter>
      </div>
    )
  }
}

export default TimebankApp;
