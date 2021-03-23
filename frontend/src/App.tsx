import React from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import {AppStateType} from './index'
import SignUpSide from '../src/components/authentication/SignUp'
import ProfilePage from './components/personal/ProfilePage'
import SignInSide from './components/authentication/SignIn'
import PreferencesPage from './components/personal/PreferencesPage'

const App: React.FC = () => {
  // const isAuth = useSelector<AppStateType >(state => state.loggedIn)
  
  return (
    <Router>
      <div >
        <h1>Welcome to Project-alpha!</h1>
        <div className="container page">
          <Switch>
            <Route exact path="/login">
              <SignInSide />
            </Route>
            <Route exact path="/sign-up">
              <SignUpSide />
            </Route>
            <Route exact path="/users/:id">
              <ProfilePage />
            </Route>
            <Route exact path="/me">
              <PreferencesPage />
            </Route>
            <Redirect to="/login" />
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default App
