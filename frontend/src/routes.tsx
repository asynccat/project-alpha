import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import SignInSide from '../src/components/authentication/SignIn'
import SignUpSide from '../src/components/authentication/SignUp'
import Welcome from './components/personal/Personalpage'



export const routing = ():React.ReactElement => {
    return (
      <Switch>
        <Route exact path="/login">
          <SignInSide />
        </Route>
        <Route exact path="/sign-up">
          <SignUpSide />
        </Route>
        <Route exact path="/welcome">
          <Welcome />
        </Route>
        <Redirect to="/" />
      </Switch>
    )
}
