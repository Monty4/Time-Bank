import React, { Component } from 'react'

import './index.css'

class Home extends Component {

  render() {
    return (
      <main>
        <div className="cont">
          <div className="col-12 justify-content-center">
            <div className="text-center">
              <h1>TIME-BANK PROJECT</h1>
              <h2>Skylab Coders Final Project</h2>
            </div>

            <div className="row">
              <div className="col-sm-2" />
              <div className="col-sm-8 text-center">
                <h3>A place to share your time and knowledge with other users</h3>
              </div>
              <div className="col-sm-2" />
            </div>
          </div>
        </div>
      </main>
    )
  }
}

export default Home