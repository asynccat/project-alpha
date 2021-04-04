import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import SignUpSide from '../src/components/authentication/SignUp'
import ProfilePage from '../src/components/personal/ProfilePage'
import PreferencesPage from '../src/components/personal/PreferencesPage'

import SignInSide from './components/authentication/SignIn'

const App: React.FC = () => {
  
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
            <Route exact path="/welcome">
              <PreferencesPage />
            </Route>
            <Route exact path="/user/:id">
              <ProfilePage />
            </Route>
            <Redirect to="/login" />
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default App
