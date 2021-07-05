import './App.css'
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom'
import Header from './components/main_home/bank_header/Header'
import BankHome from './components/main_home/bank_home/BankHome'
import UserProfile from './components/main_home/bank_profile/UserProfile'
import UsersTable from './components/main_home/bank_users_table/UsersTable'
import Home from './components/login_home/home/Home'
import Register from './components/login_home/register/Register'
import Login from './components/login_home/login/Login'
import { useSelector } from 'react-redux'
import BankChat from './components/main_home/bank_home/bank_chat/BankChat'

function App() {

  const auth = useSelector(({ auth }) => auth )

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/register">
            <Register />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          { (auth.isAuth)  ? 
            (<Switch>
              <Route path="/bank-chat">
                <Header />
                <BankChat />
              </Route>

              <Route path="/bank-home">
                <Header />
                <BankHome />
              </Route>

              <Route path="/my-profile">
                <Header />
                <UserProfile />
              </Route>

              <Route path="/users-table">
                <Header />
                <UsersTable />
              </Route>

            </Switch>)  : <Redirect to="/login"></Redirect>
        }
         
        </Switch>
      </Router>
    </div>
  )
}

export default App
