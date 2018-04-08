import React, { Component } from 'react'
import { Route, HashRouter } from 'react-router-dom'

import './App.css'

import Header from './components/Header/index'
import Home from './components/Home/index'
import Search from './components/Search/index'
import Datauser from './components/Datauser/index'
import Contracts from './components/Contracts/index'

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
          <Header />
          
          <Route exact path="/" render={() => (
            <Home />
          )} />

          <Route path="/search" render={() => (
            <Search getList={this.getFilteredUsers} users={this.state.users} onClickUserId={this.setUserId} onClickUserName={this.setUserName} />
          )} />

          <Route path="/contracts" render={() => (
            <Contracts />
          )} />

          <Route path="/datauser/:id/:service" render={routerProps => (
            <Datauser  {...routerProps}/>
          )} />

          {/* <Route path="/register" render={() => (
            <Register setFormFields={this.setFormFields} />
          )} /> */}
          
        </div>
      </HashRouter>
      </div>
    )
  }
}

export default TimebankApp;
