import React, { Component} from 'react'

import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router-dom' 

class List extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id:'',
      userData: '',
    }
  }

  sendUserID = (id) => {
    this.props.history.push(`/datauser/${id}/${this.props.service}`) // user id and sevice id
  }

  render() {
    return(
      <div className="col-sm-12 col-md-4">
        <div className="card user">
          <div className="card-body">
            <h6 className="card-title">{this.props.user.name} {this.props.user.surname}</h6>
            <h6 className="card-title">({this.props.user.city} -{this.props.user.borough})</h6>
            <div className="progress">
            <div className="progress-bar" role="progressbar" style={{ width: `${this.props.user.valuation}%` }} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}>{this.props.user.valuation}%</div>
            </div>
            <p />
            <button className="btn btn-primary" to="/datauser" onClick={(e)=>{e.preventDefault(); this.sendUserID(this.props.user._id)}}>View more</button>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(List)