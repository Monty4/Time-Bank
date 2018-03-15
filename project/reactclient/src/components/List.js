import React from 'react'
import '../App.css'

function List(props) {
  console.log(props)
  return (

<div className="col-sm-12 col-md-4">
    <div className="card user">
      <div className="card-body">
      
        <h6 className="card-title">{props.user.name} {props.user.surname}</h6>
        <div className="progress">
         <div className="progress-bar" role="progressbar" style={{ width: `${props.user.value}%` }} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}>{props.user.value}%</div>
      </div>
      <p />
      <a href="#!" className="btn btn-primary">Ver...</a>
      
      </div>
    </div>
    </div>
    )
}

export default List