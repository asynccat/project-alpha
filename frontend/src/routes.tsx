import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import SignInSide from '../src/components/authentication/SignIn'
import SignUpSide from '../src/components/authentication/SignUp'
import Personal from './components/personal/Personal'



export const routing = ():React.ReactElement => {
    return (
      <Switch>
        <Route exact path="/login">
          <SignInSide />
        </Route>
        <Route exact path="/sign-up">
          <SignUpSide />
        </Route>
        <Route exact path="/me">
          <Personal />
        </Route>
        <Redirect to="/" />
      </Switch>
    )
}
