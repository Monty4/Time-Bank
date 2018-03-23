import React, { Component} from 'react'

import { NavLink } from 'react-router-dom'

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
            <div className="progress-bar" role="progressbar" style={{ width: `${this.props.user.valuation}%` }} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}>{this.props.user.valuation}%</div>
            </div>
            <p />
            <NavLink className="btn btn-primary" to="/datauser" onClick={()=>{this.sendUserID(`${this.props.user._id}`); this.sendUserName(`${this.props.user.name}`)}}>View more</NavLink>
          </div>
        </div>
      </div>
    )
  }
}

export default List