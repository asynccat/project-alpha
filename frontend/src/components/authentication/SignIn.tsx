import React, { useState, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {CssBaseline, TextField} from '@material-ui/core'
import {Button, Avatar, Typography, FormControlLabel, Checkbox, Link, Paper, Grid }  from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

import * as gridSize from '../../constants/styles.values'
import {SIX as SHADOW_DEPTH_SIX} from '../../constants/styles.values'
import { login } from '../../actions/authActions'

import {useStyles} from './SignUpSignIn.styles'

export default function SignInSide(): React.ReactElement {

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
  const history = useHistory()

  const signIn = useCallback((e) => {
    e.preventDefault()
    const payload = {email, password}
    // eslint-disable-next-line
    // @ts-ignore
    dispatch(login(payload))
    history.push('/welcome')
  }, [dispatch, email, password, history])

  const classes = useStyles()

  return (
    <Grid className={classes.root} component="main" container>
      <CssBaseline />
      <Grid
        className={classes.image}
        item
        md={gridSize.SEVEN}
        sm={gridSize.FOUR}
        xs={false} />
      <Grid component={Paper}
            elevation={SHADOW_DEPTH_SIX}
            item
            md={gridSize.FIVE}
            sm={gridSize.EIGHT}
            square
            xs={gridSize.TWELVE}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              autoComplete="email"
              autoFocus
              fullWidth
              id="email"
              label="Email Address"
              margin="normal"
              name="email"
              onChange={onChangeEmail}
              required
              variant="outlined"
            />
            <TextField
              autoComplete="current-password"
              fullWidth
              id="password"
              label="Password"
              margin="normal"
              name="password"
              onChange={onChangePassword}
              required
              type="password"
              variant="outlined"
            />
            <FormControlLabel
              control={<Checkbox color="primary" value="remember" />}
              label="Remember me"
            />
            <Button
              className={classes.submit}
              color="primary"
              fullWidth
              onClick={signIn}
              type="submit"
              variant="contained"
            >
              Sign In
            </Button>
            <Button
              className={classes.submit}
              color="primary"
              fullWidth
              type="submit"
              variant="contained"
            >
              Sign In with Google
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/sign-up" variant="body2">
                  Don&apos;t have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  )
}