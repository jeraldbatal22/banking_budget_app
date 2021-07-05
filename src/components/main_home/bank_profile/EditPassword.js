import './EditPassword.css'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { errorMessage, successMessage } from '../../../utils/message'
import {updateProfileInfo } from '../../../redux-slice/UserSlice'

const EditPassword = ({setShowChangePasswordForm}) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { auth, users } = useSelector((store) => store )
  const user = users.find((user) => user.id === auth.authId)

  const [editProfileInfo, setEditProfileInfo] = useState({
    currentPassword:'',
    newPassword:'',
    confirmNewPassword:'',
  })

  const onHanddleChange = (e) => {
    const {name, value} = e.target
    editProfileInfo[name] = value
    setEditProfileInfo(editProfileInfo)
  }

  const onHanddleSubmit = (e) => {
    e.preventDefault()
    if(user.password !== editProfileInfo.currentPassword) {
      return errorMessage('Error Password', 'Current Password does not match')
    }
    if(editProfileInfo.newPassword === "") {
      return errorMessage('Error', 'Please Input New password')
    }
    if (editProfileInfo.newPassword.length < 8) {
      return errorMessage('Error', 'New Password must be greater than 8')
    }
    if(editProfileInfo.confirmNewPassword === "") {
      return errorMessage('Error', 'Please Input New password')
    }
    if (editProfileInfo.newPassword !== editProfileInfo.confirmNewPassword) {
      return errorMessage('Error', 'New password does not match')
    } else {
      const action = "newPassword"
      dispatch(updateProfileInfo({
        action,
        newPassword:editProfileInfo.newPassword,
        user:user.id
      }))
      history.push('login')
      return successMessage(`Successfully changed your password`, `You've been logout. Please login using your new password`)
    }
  }

  const cancelForm = () => {
    setShowChangePasswordForm(false)
  }
  return (
    <>
      <div className="change_password_main">
        <form className="change_password_form">
          <div className="change_password_form__controls">
            <h1 style={{color:'#fff'}}>Change Password</h1>
            <div className="new-password__control">
              <input type="password" name="currentPassword" placeholder="Current Password"autoComplete="off" onChange={onHanddleChange}/>
            </div>

            <div className="new-password__control">
              <input type="password" name="newPassword" autoComplete="off" placeholder="New Password" onChange={onHanddleChange}/>
            </div>

            <div className="new-password__control">
              <input type="password" name="confirmNewPassword" autoComplete="off" placeholder="Confirm New Password" onChange={onHanddleChange}/>
            </div>

          </div>

          <div className="change_password_form__actions">
            <button type="button" onClick={cancelForm}>Cancel</button>
            <button onClick={onHanddleSubmit}>Update</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default EditPassword
