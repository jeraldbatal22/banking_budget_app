import './Home.css'
import { useHistory } from 'react-router-dom'

const Home = () => {
  const history = useHistory()

  const getRoute = (route) => {
    history.push(route)
  }

  return (
    <>
      <div className="home">
        <div className="center buttons">
          <h1>
            <span>Budget</span> App <span>Bank</span>
          </h1>
          <p>
            A banking app is a mobile app where you can access the details of
            your bank account and complete transactions directly from your
            phone, tablet, or mobile device.
          </p>
          <div className="buttons">
            <button onClick={() => getRoute('login')} className="btn2">
              Get Started
            </button>
            <button onClick={() => getRoute('register')} className="btn2">
              Register
            </button>
            <button onClick={() => getRoute('login')} className="btn2">
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
