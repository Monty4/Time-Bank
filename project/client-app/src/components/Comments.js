import React, { Component} from 'react'


class Comments extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div className="col-12">
        <h6 className="card">{this.props.contractsServed}</h6>
      </div>
    )
  }
}

export default Comments