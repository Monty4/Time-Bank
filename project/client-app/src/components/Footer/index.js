import React, { Component } from 'react';
import './index.css'

class Footer extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            
                <div class="fixed-bottom bg-primary footer">
                    <ul className="navbar-nav mr-auto">
                        <li>About Us</li>
                    </ul>
                </div>
            
        )
    }
}

export default Footer