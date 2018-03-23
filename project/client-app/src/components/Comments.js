import React, { Component} from 'react'


class Comments extends Component {
  constructor(props) {
    super(props)
    console.log(this.props.user.comments)
  }

  render() {
    return(
      <div className="col-12">
        <h6 className="card">{this.props.user}</h6>
      </div>
    )
  }
}

export default Comments