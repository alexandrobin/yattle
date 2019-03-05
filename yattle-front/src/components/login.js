/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import Query from '@foundationjs/query'
import {
  UserController,
} from '../controllers'

class LoginForm extends React.Component {
    state = {
      username: '',
      password: '',
    }

    onSubmit = (e) => {
      e.preventDefault()

      if (this.state.username.trim() !== '') {
        Query.query({
          login: {
            args: {
              username: this.state.username,
            },
          },
        }).then(({
          login: token,
        }) => {
          Query.configure({
            token,
          })
          window.localStorage.setItem('token', token)
          window.location.href = '/'
        })
      }
    }

    handleUsernameChange = (e) => {
      this.setState({
        username: e.target.value,
      })
    }

    handlePasswordChange = (e) => {
      this.setState({
        password: e.target.value,
      })
    }

    render() {
      return (
        <div id="login">
          <form onSubmit={
                this.onSubmit
            }
          >
            <label htmlFor="username">Username:</label>


            <input
              type="text"
              name="username"
              value={
                this.state.username
            }
              onChange={
                this.handleUsernameChange
            }
            />
            <label htmlFor="password"> Password: </label>
            <input
              type="text"
              name="password"
              value={
                this.state.password
            }
              onChange={
                this.handlePasswordChange
            }
            />
            <button type="submit">
Login
            </button>
          </form>
        </div>
      )
    }
}

class SigninForm extends React.Component {
    state = {
      username: '',
      password: '',
    }

    onSubmit = (e) => {
      e.preventDefault()

      UserController.mutate
        .create()
        .withContent({
          username: this.state.username,
          password: this.state.password,
        })
        .then(data => console.log(data))
    }

    handlePasswordChange = (e) => {
      this.setState({
        password: e.target.value,
      })
    }

    handleUsernameChange = (e) => {
      this.setState({
        password: e.target.value,
      })
    }

    render() {
      return (
        <div>
          <form id="signin" onSubmit={this.onSubmit}>
            <label>
Username
              <input onChange={this.handleUsernameChange} type="text" />
            </label>
            <label>
Password
              <input onChange={this.handlePasswordChange} type="password" />
            </label>
            <button type="submit">Sign In</button>
          </form>
        </div>
      )
    }
}

class Login extends React.Component {
  render() {
    return (
      <div>
        <LoginForm />
        <SigninForm />
      </div>
    )
  }
}

export default Login
