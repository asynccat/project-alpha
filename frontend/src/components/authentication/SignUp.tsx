/* eslint-disable react/destructuring-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-no-bind */
import {CssBaseline, TextField} from '@material-ui/core'
import {Button, Avatar, Typography, FormControlLabel, Checkbox, Link, Paper, Grid }  from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

import React, {useCallback, useState} from 'react'
import {connect, useDispatch} from 'react-redux'
import {Dispatch} from 'redux'

import { signUserUp, fetchUserAction, IUserDetails } from '../../actions/authActions'
import {useStyles} from './SignUpSignIn.styles'
import {Five, Six, Seven, Twelve, Eight, Four} from './MagicNumbersToConst'


function SignUpSide(): React.ReactElement {

  const [email, setEmail] = useState('')
  const onChangeEmail = useCallback((e) => {
    console.log('typing', e.target.value)
    setEmail(e.target.value)
  }, [setEmail])

  const [password, setPassword] = useState('')
  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value)
  }, [setPassword])

  const dispatch = useDispatch()

  const signUp = useCallback((e) => {
    e.preventDefault()
    dispatch(signUserUp({email, password}))
  }, [dispatch, email, password])

  const classes = useStyles()

  return (
    <Grid className={classes.root} component="main" container>
      <CssBaseline />
      <Grid className={classes.image} item md={Seven} sm={Four} xs={false} />
      <Grid component={Paper} elevation={Six} item md={Five} sm={Eight} square xs={Twelve}>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="email"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={onChangeEmail}
                required
                value={email}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="current-password"
                fullWidth
                id="password"
                label="Password"
                name="password"
                onChange={onChangePassword}
                required
                type="password"
                value={password}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox color="primary" value="allowExtraEmails" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            className={classes.submit}
            color="primary"
            fullWidth
            onClick={signUp}
            type="submit"
            variant="contained"
          >
            Sign Up
          </Button>
          <Button
            className={classes.submit}
            color="primary"
            fullWidth
            onClick={() => null}
            type="submit"
            variant="contained"
          >
            Sign Up with Google
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      </Grid>
    </Grid>
  )
}

const mapDispatchToProps = (dispatch:Dispatch<fetchUserAction>) => {
  return {
      signUserUp: (userInfo: IUserDetails) => dispatch<any>(signUserUp(userInfo))
}
}

export default connect(null, mapDispatchToProps)(SignUpSide)