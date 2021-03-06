import React, { Component } from 'react'
import { Route, HashRouter } from 'react-router-dom'

import './App.css'

import Header from './components/Header/index'
import Home from './components/Home/index'
import Search from './components/Search/index'
import Datauser from './components/Datauser/index'
import Contracts from './components/Contracts/index'
import Footer from './components/Footer/index'

import api from './api-client.js'
// import storage from './components/Services/storage.js'

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

          {/* {
          (storage.getToken()) ?
          <Route path="/search" render={() => (
            <Search getList={this.getFilteredUsers} users={this.state.users} onClickUserId={this.setUserId} onClickUserName={this.setUserName} />
          )} />
          :
          undefined
          } */}

          <Route path="/contracts" render={() => (
            <Contracts />
          )} />

          <Route path="/datauser/:id/:service" render={routerProps => (
            <Datauser  {...routerProps}/>
          )} />

          {/* <Route path="/register" render={() => (
            <Register setFormFields={this.setFormFields} />
          )} /> */}

          <Route path="/register" render={() => (
            <Search />
          )} />
          
          <Footer />
        </div>
      </HashRouter>
      </div>
    )
  }
}

export default TimebankApp;
