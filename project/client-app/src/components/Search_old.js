import React, { Component } from 'react'
import '../App.css'

import api_client from '../api-client.js'

import List from './List'

class Search extends Component {
  constructor(props) {
    super(props)

    this.state = {
      users: []
    }
  }

  componentWillMount() {
    api_client.getList().then(users => this.setState({ users }))
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
                    <form>
                      <div className="row">
                        <div className="col-sm-12 col-md-3 field">
                          <input type="text" placeholder="service" size="20" />
                        </div>
                        <div className="col-sm-12 col-md-3">
                        </div>
                        <div className="col-sm-12 col-md-3" />
                        <div className="col-sm-12 col-md-3" />
                        <div className="col-sm-12 col-md-3 field">
                          <input type="text" placeholder="city" size="20" />
                        </div>
                        <div className="col-sm-12 col-md-3 field">
                          <input type="text" placeholder="borrough" size="20" />
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
                this.state.users.map(user => {
                  return <List key={user._id} user={user} />
                })
              }
            </div>
            <div className="row">
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
            </div>
          </div>
        </main>
    )
  }
}

export default Search