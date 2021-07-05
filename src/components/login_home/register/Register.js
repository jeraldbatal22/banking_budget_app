import './Register.css'
import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import { errorMessage, successMessage } from '../../../utils/message'
import { registerNewUser } from '../../../redux-slice/UserSlice'
import { useDispatch, useSelector } from 'react-redux'
import profileImage from './../../../images/profile.jpg'
import moment from 'moment'
const Register = () => {

  const dispatch = useDispatch()
  const [formTouched, setFormTouched] = useState({
    firstname: false,
    lastname: false,
    username: false,
    password: false,
    confirmPassword: false,
  })

  const onBlurHandle = (e) => {
    const { name, value } = e.target
    newUser[name] = value
    if (newUser[name] === '') {
      formTouched[name] = true
    } else {
      formTouched[name] = false
    }
    setFormTouched({ ...formTouched })
  }

  const [newUser, setNewUser] = useState({
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    confirmPassword: '',
  })

  const onHanddleChange = (e) => {
    const { name, value } = e.target
    newUser[name] = value
    if (newUser[name] !== '') {
      newUser[name] = value
      formTouched[name] = false
    }
    setFormTouched({ ...formTouched })
    setNewUser({
      ...newUser,
      ...{
        id: parseFloat(Date.now().toString()),
        date: moment().format('MMMM Do YYYY'),
        balance: 0,
        history: [],
        expenses: [],
        usersDeposit: [],
        role: 2,
        profileImage: profileImage,
        chatMessageHistory: [],
      }
    })
  }
  const users = useSelector(({ users }) => users)

  const onSubmitNewUser = (e) => {
    let message = ''

    for (const key in newUser) {
      if (newUser[key] === '') {
        message += `${key.charAt(0).toUpperCase() + key.slice(1)
          } is required <br>` //
      }
    }

    if (newUser.password.length < 8) {
      message += 'Password must be greater than 8 <br>'
    }

    if (newUser.confirmPassword !== newUser.password) {
      message += `Password not Match <br>`
    }

    const isExist = users.findIndex((user) => user.username === newUser.username)

    if (isExist !== -1) {
      message += 'Username is already Exist '
    }

    errorMessage('Error!', message)

    if (message === '') {
      // delete newUser.confirmPassword
      dispatch(registerNewUser({
        newUser
      }))
      // newUser.confirmPassword = ''
      successMessage('Successfully register your account', '')
      history.push('/login')
    }
  }

  const history = useHistory()
  const backToHome = () => {
    history.push('/')
  }

  return (
    <div className="container">
      <div className="register">
        <div className="title">
          <span> Register Form</span>
        </div>

        <form>
          <p>{formTouched.firstname ? 'Firstname is required.' : ''}</p>
          <div className="row">
            <input
              type="text"
              placeholder="Firstname"
              id="firstname"
              name="firstname"
              autoComplete="off"
              onChange={onHanddleChange}
              onBlur={onBlurHandle}
            />
          </div>
          <p>{formTouched.lastname ? 'Lastname is required.' : ''}</p>
          <div className="row">
            <input
              type="text"
              placeholder="Lastname"
              name="lastname"
              onChange={onHanddleChange}
              onBlur={onBlurHandle}
            />
          </div>
          <p>{formTouched.username ? 'Username is required.' : ''}</p>
          <div className="row">
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={onHanddleChange}
              onBlur={onBlurHandle}
            />
          </div>
          <p>{formTouched.password ? 'Password is required.' : ''}</p>
          <div className="row">
            <input
              type="password"
              placeholder="Password"
              name="password"
              autoComplete="off"
              onChange={onHanddleChange}
              onBlur={onBlurHandle}
            />
          </div>
          <p>{formTouched.confirmPassword ? 'Confirm Password is required.' : ''}</p>
          <div className="row">
            <input
              type="password"
              placeholder="Conifrm Password"
              name="confirmPassword"
              autoComplete="off"
              onChange={onHanddleChange}
              onBlur={onBlurHandle}
            />
          </div>
          <div className="row button">
            <button type="button" className="submit" onClick={onSubmitNewUser}>
              Submit Form
            </button>
          </div>

          <div className="row button back">
            <button type="button" className="cancel" onClick={backToHome}>
              Back To Home
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
