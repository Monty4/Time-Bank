import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

import api_client from '../api-client.js'
import Comments from './Comments'

class Datauser extends Component {
    constructor(props) {
        super(props)
        this.state={
            user: undefined
        }
    }

    componentWillMount() {
        api_client.getUser(this.props.id).then(user => {
            this.setState({user})
        })
      }

    render() {
        return (
            <main>
                {(this.state.user) ? // Al ser una llamada asíncrona, la página se carga antes de obtener datos y da error. Para que esto no ocurra, ponemos el ternario

                <div className="container">
                    <div className="row">
                        <div className="card-title section">
                            <h3>User information</h3>
                        </div>
                        <div className="col-12">
                            <div className="card searchField">
                                <div className="card-body">
                                    <form>
                                        <div className="row">
                                            <div className="col-sm-12 col-md-3">
                                                <h6><strong>Name:</strong> {this.state.user.name} {this.state.user.surname}</h6>
                                            </div>
                                            <div className="col-sm-12 col-md-3">
                                            <h6><strong>City:</strong> {this.state.user.city}</h6>
                                            </div>
                                            <div className="col-sm-12 col-md-3">
                                            <h6><strong>Borrough:</strong> {this.state.user.borough}</h6>
                                            </div>
                                            <div className="col-sm-12 col-md-3" />
                                            {(this.state.user.comments) ?
                                                this.state.user.comments.map(user => {
                                                    return <Comments user={user} />
                                                })

                                                :undefined
                                            }
                                            <div className="col-12 field">
                                                <input type="submit" defaultValue="Contract" className="btn btn-outline-secondary" />
                                            </div>
                                            <div className="col-sm-12 col-md-3" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                : undefined}
            </main>

        )
    }
}

export default Datauser