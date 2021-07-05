import './UserProfile.css'
import { useHistory } from 'react-router-dom'
import { successMessage } from '../../../utils/message'
import { useSelector, useDispatch } from 'react-redux'
import { updateProfilePicture, updateProfileInfo } from '../../../redux-slice/UserSlice'
import { useState } from 'react'
import EditIcon from '@material-ui/icons/Edit';
import EditPassword from './EditPassword'

const UserProfile = () => {
  console.log(updateProfilePicture())
  const history = useHistory()
  const dispatch = useDispatch()
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false)

  const { auth, users } = useSelector((store) => store)
  const user = users.find((user) => user.id === auth.authId)

  // CHANGE PROFILE IMAGE

  const [uploadImage, setUploadImage] = useState(user.profileImage)
  const imageHanddler = (e) => {

    const reader = new FileReader();
    reader.onload = (e) => {
      if (reader.readyState === 2) {
        const image = e.target.result
        setUploadImage(image)
        dispatch(updateProfilePicture({
          uploadImage: image,
          authId: auth.authId,
        }))
        return successMessage('Successfully Updated Profile Photo', '')
      }
    }

    reader.readAsDataURL(e.target.files[0])

  }

  const logoutUser = (router) => {
    history.push(router)
    return successMessage('Successfully logout!', 'Thankyou For Visit')
  }

  const showChangePassword = () => {
    setShowChangePasswordForm(true)
  }

  const [editProfileInfo, setEditProfileInfo] = useState({
    firstname: user.firstname,
    lastname: user.lastname,
    username: user.username,
  })

  const onHanddleChangeEdit = (e) => {
    const { name, value } = e.target
    editProfileInfo[name] = value
    setEditProfileInfo(editProfileInfo)
    console.log(editProfileInfo)
  }

  const saveUpdate = (router) => {
    history.push(router)
    // return errorMessage('Error!', `Change Password is unavailble yet`)
    const action = "editProfileInfo"
    dispatch(updateProfileInfo({
      action,
      editProfileInfo,
      authId: auth.authId,
    }))
    successMessage('Successfully updated profile info!', ``)
  }

  return (
    <>
      <div className="user-profile">

        <div className="account_balance">
          <h1>Account Profile</h1>
        </div>

        <form>
          <div className="form_container">
            <div className="row_left">
              <label>Account Number</label>
              <h2>{user.id}</h2>
              <label style={{ cursor: 'pointer' }} htmlFor="edit_firstname">Firstname <EditIcon className="edit_profile_icon" /></label>
              <input
                type="text"
                placeholder="Account Number"
                id="edit_firstname"
                name="firstname"
                autoComplete="off"
                defaultValue={user.firstname}
                onChange={onHanddleChangeEdit}
              />
              <label style={{ cursor: 'pointer' }} htmlFor="edit_lastname">Lastname <EditIcon className="edit_profile_icon" /></label>
              <input
                type="text"
                placeholder="Account Number"
                id="edit_lastname"
                defaultValue={user.lastname}
                name="lastname"
                autoComplete="off"
                onChange={onHanddleChangeEdit}
              />
            </div>
            <div className="row_right">
              <label style={{ cursor: 'pointer' }} htmlFor="edit_username">Username <EditIcon className="edit_profile_icon" /></label>
              <input
                type="text"
                id="edit_username"
                placeholder="Account Number"
                defaultValue={user.username}
                name="username"
                autoComplete="off"
                onChange={onHanddleChangeEdit}
              />
              <label>Member Since</label>
              <h2>{user.date}</h2>
              <label>Account Role</label>
              <h2>Users</h2>
            </div>
          </div>

          <div className="profile_picture">
            <label htmlFor="input">
              <img src={uploadImage} alt="" />
              <EditIcon className="edit_profile_icon" />
              <input type="file" name="image-upload" id="input" hidden accept=".jpg, .jpeg, .png, .nov, .mp4" onChange={imageHanddler} />
            </label>
          </div>

          <div className="account_balance">
            <h1>Total Balance</h1>
            <h2>₱ {user.balance}</h2>
          </div>

          <div className="profile_btn">
            <button type="button" onClick={showChangePassword}>Change Password</button>
            <button type="button" onClick={() => saveUpdate('bank-home')}>Save Update</button>
            <button type="button" onClick={() => logoutUser('')}>Logout</button>
          </div>

        </form>
        {
          showChangePasswordForm ? <EditPassword setShowChangePasswordForm={setShowChangePasswordForm} /> : ''
        }

      </div>
    </>
  )
}

export default UserProfile
