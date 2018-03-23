import React, { Component} from 'react'

import { button } from 'react-router-dom'

import { withRouter } from 'react-router'

class List extends Component {
  constructor(props) {
    super(props)
  }

  sendUserID = (userID) => {
    this.props.onClickUserId(userID)
  }

  sendUserName = (userName) => {
    this.props.onClickUserName(userName)
  }

  render() {
    return(
      <div className="col-sm-12 col-md-4">
        <div className="card user">
          <div className="card-body">
            <h6 className="card-title">{this.props.user.name} {this.props.user.surname}</h6>
            <div className="progress">
            <div className="progress-bar" role="progressbar" style={{ width: `${this.props.user.value}%` }} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}>{this.props.user.value}%</div>
            </div>
            <p />
            <button className="btn btn-primary" to="/datauser" onClick={(e)=>{e.preventDefault; this.sendUserID(`${this.props.user._id}`); this.sendUserName(`${this.props.user.name}`)}}>View more</button>
          </div>
        </div>
      </div>
    )
  }
}

export default List