import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { useHistory } from 'react-router-dom'
import { successMessage, errorMessage } from '../../../utils/message'
import { useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: '#fff',
  },
  btn: {
    padding: '10px 20px',
    borderRadius: '50px',
    marginRight: '30px',
    fontSize: '20px',
    fontWeight: 'bolder',
    color: '#f7b219',
  },
}))

const Header = () => {

  const { auth, users } = useSelector((store) => store)
  const user = users.find((user) => user.id === auth.authId)


  const classes = useStyles()
  const history = useHistory()
  const setRoute = (route) => {
    history.push(route)
    if (route === '') {
      history.push(route)
      return successMessage('Successfully logout!', 'Thankyou For Visit')
    }
    if (route === 'my-profile') {
      history.push(route)
    }
    if (route === 'users-table') {
      history.push(route)
    }
    if (route === 'bank-chat') {
      history.push('bank-home')
      return errorMessage('Error', 'This feauture is not available yet')
    }
  }
  return (
    <div className={classes.root}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          BANK APP
        </Typography>
        {/* <AppBar position="static" style={{ background: '#F7B219' }}> */}
        {
          user.role === 2 ?
            <>
              <Button className={classes.btn} color="inherit" onClick={() => setRoute('bank-chat')}> Messages</Button>
              <Button className={classes.btn} color="inherit" onClick={() => setRoute('bank-home')}> My Bank</Button>
              <Button className={classes.btn} color="inherit" onClick={() => setRoute('my-profile')}>My Profile</Button>
            </>
            :
            <>
              <Button className={classes.btn} color="inherit" onClick={() => setRoute('users-table')}> Users </Button>
            </>
        }
        <Button className={classes.btn} color="inherit" onClick={() => setRoute('')}> Logout </Button>

      </Toolbar>
      {/* </AppBar> */}
    </div>
  )
}

export default Header
