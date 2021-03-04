import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {autoLogin} from './actions/userActions'
import SignInSide from './components/authentication/SignIn'
import SignUpSide from './components/authentication/SignUp'

const App: React.FC = () => {
  useEffect(() => {
    fetch(`${process.env.REACT_APP_DJANGO_SERVER}/api/v1/hello/`)
  })
  useEffect(() => {
    dispatch(autoLogin())
  }, [])

  const userReducer = useSelector(state => state.userReducer)
  const dispatch = useDispatch()

  return (
    <div >

      <h1>Welcome to Project-alpha!</h1>
      <div className="container page">
      {
          !userReducer.loggedIn ? <h1>Sign Up or Login!</h1> : <h1>Welcome, {userReducer.user.username}</h1>
        }
        <SignInSide/>
        <SignUpSide/>

      </div>
    </div>
  )
}

export default App
