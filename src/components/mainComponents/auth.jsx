import React, { Component } from 'react'
import PlayDB from '../../config/playDB'

export default class Auth extends Component {
  state = {
    email: '',
    password: ''
  }

  handleChange = e => {
    this.setState({ [e.target.id ] : e.target.value })
  }
  handleLogin = e => {
    let { email, password } = this.state
    PlayDB.auth().signInWithEmailAndPassword(email, password)
      .catch(console.log)
  }

  render() {
    return (
      <div className="row valign-wrapper container" style={{ marginTop: "20px"}}>
        <div className="col s12 m7" style={{ margin : "auto" }}>
          <div className="card">
            <div className="card-image">
              <img src="https://firebasestorage.googleapis.com/v0/b/radio-2-1fb64.appspot.com/o/images%2Fcoffee.jpg?alt=media&token=76f5face-f4d9-4f54-85a5-69f2efd53886" alt="Win Radio"/>
                <span className="card-title">Win Radio</span>
            </div>
            <div className="card-content">
              <div className="row">
                <div className="input-field col s12">
                  <input id="email" type="email" className="validate" onChange={ this.handleChange }/>
                  <label htmlFor="email">Email</label>
                </div>
                <div className="input-field col s12">
                  <input id="password" type="password" className="validate" onChange={ this.handleChange }/>
                  <label htmlFor="password">Password</label>
                </div>
                <div className="input-field col s12">
                  <button className="waves-effect waves-light btn-small right light-green darken-1" onClick={ this.handleLogin }>Login</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
