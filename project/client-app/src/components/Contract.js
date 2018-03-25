import React, { Component} from 'react'


class Contract extends Component {
  constructor(props) {
    super(props)
    // console.log(props.contractsServed)
  }

  render() {
    return(
      <div className="col-12">
        <h6 className="card">{this.props.contractsServed}</h6>
      </div>
    )
  }
}

export default Contract