import './Login.css'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { loginUser } from './../../../redux-slice/AuthSlice'
import { useDispatch, useSelector } from 'react-redux'
import { errorMessage, successMessage } from '../../../utils/message'

const Login = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const [formUser, setFormUser] = useState({
    username: '',
    password: ''
  })

  const users = useSelector(({ users }) => users)

  const onHanddleChange = (e) => {
    const { value, name } = e.target
    formUser[name] = value
    setFormUser({ ...formUser })
  }

  const getRoute = (route) => {
    history.push(route)
  }

  const onHanddleLogin = (e) => {
    e.preventDefault()
    if (formUser.username === '') {
      return errorMessage('Error!', 'Please input your username!')
    }

    if (formUser.password === '') {
      return errorMessage('Error!', 'Please input your password!')
    }

    const res = users.filter((user) => user.username === formUser.username && user.password === formUser.password)
    
    if (res.length === 0) {
      return errorMessage('Error!', 'Incorrect Username or Password!')
    }  else {
      dispatch(loginUser({ 
        isSuccess: true, 
        authId: res[0].id
      }))
      successMessage(
        `Welcome ${formUser.username}!`,
        'Successfully login',
      )
      if(res[0].role === 2) {
        return history.push('/bank-home')
      } else {
        return history.push('/users-table')
      }

    }
 
  }

  return (
    <div className="container">
      <div className="login">
        <div className="title">
          <span> Login Form</span>
        </div>

        <form>
          <div className="row">
            <input type="text" placeholder="Username"  name="username" onChange={onHanddleChange} />
          </div>
          <div className="row">
            <input
              type="password"
              placeholder="Password"
              name="password"
              autoComplete="off"
              
              onChange={onHanddleChange}
            />
          </div>

          <div className="row button">
            <button type="button" className="submit" onClick={onHanddleLogin}>
              Login
            </button>
          </div>

          <div className="row button back">
            <button
              type="button"
              className="cancel"
              onClick={() => getRoute('')}
            >
              Back To Home
            </button>

            <div className="signup-link">
              Not registered yet?{' '}
              <button
                type="button"
                onClick={() => getRoute('register')}
                className="not-registered"
              >
                Signup now
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
