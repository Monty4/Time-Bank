import React, { Component } from 'react'

import '../App.css'
import '../login.css'

function Home() {
  return (
    <main>
      <div className="container">
            <div className="row">
              <div className="card-title section">
        <h2>Register Form</h2>
        <form action="/action_page.php">
          {/* <div className="imgcontainer">
            <img src="../../images/boy64.png" alt="Avatar" className="avatar" />
          </div> */}
          <div className="container">
            <label htmlFor="uname">Name</label>
            <input type="text" placeholder="Enter Username" name="uname" className="formText" required />
            <label htmlFor="uname">Surname</label>
            <input type="text" placeholder="Enter Username" name="uname" className="formText" required />
            <label htmlFor="psw">Password</label>
            <input type="password" placeholder="Enter Password" name="psw" className="formText" required />
            <button type="submit" className="btn btn-primary" onClick="">Login</button>
            <label>
              <input type="checkbox" defaultChecked="checked" name="remember" /> Remember me
          </label>
          </div>
          <div className="container" style={{ backgroundColor: '#f1f1f1' }}>
            <button type="button" className="cancelbtn">Cancel</button>
            <span className="psw">Forgot <a href="#">password?</a></span>
          </div>
        </form>
      </div>
</div>
</div>
    </main>
  )
}

export default Home