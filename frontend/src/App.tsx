import React, {useEffect} from 'react'
import { useSelector} from 'react-redux'

import SignUpSide from './components/authentication/SignUp'
import {AppStateType} from './index'
import Welcome from './components/personal/PersonalPage'


// eslint-disable-next-line complexity
const App: React.FC = () => {
  useEffect(() => {
    fetch(`${process.env.REACT_APP_DJANGO_SERVER}/api/v1/hello/`)
  })
    
  const isAuth = useSelector<AppStateType >(state => state.loggedIn)
  
  return (
    <div >
      <h1>Welcome to Project-alpha!</h1>
      <div className="container page">
      {
         !isAuth  ? <SignUpSide/> : <Welcome />
        }
      </div>
    </div>
  )
}

export default App
