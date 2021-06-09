import React from 'react'
import {Router, Switch, Route, Redirect } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import SignUpSide from '../src/components/authentication/SignUp'
import ProfilePage from '../src/components/personal/ProfilePage'
import PreferencesPage from '../src/components/personal/PreferencesPage'
import SignInSide from './components/authentication/SignIn'
import {history} from './history'


const App: React.FC = () => {
  
  return (
    <Router history={history}>
      <div >
        <div className="container page">
        <ToastContainer autoClose={8000} />
          <Switch>
            <Route exact path="/login">
              <h1 className="heading">Welcome to Project-alpha!</h1>
              <SignInSide />
            </Route>
            <Route exact path="/sign-up">
              <h1 className="heading">Welcome to Project-alpha!</h1>
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
