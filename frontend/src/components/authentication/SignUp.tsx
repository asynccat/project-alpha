import React, {useCallback, useState} from 'react'
import {useDispatch} from 'react-redux'
import {CssBaseline, TextField} from '@material-ui/core'
import {Button, Avatar, Typography, Link, Paper, Grid }  from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

import { signUserUp } from '../../actions/authActions'
import * as gridSize from '../../constants/styles.values'
import {SIX as SHADOW_DEPTH_SIX} from '../../constants/styles.values'

import { useStyles } from './SignUp.styles'

export default function SignUpSide(): React.ReactElement {

  const [email, setEmail] = useState('')
  const onChangeEmail = useCallback((e) => {
    setEmail(e.target.value)
  }, [setEmail])

  const [password, setPassword] = useState('')
  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value)
  }, [setPassword])

  const dispatch = useDispatch()

  const signUp = useCallback((e) => {
    e.preventDefault()
    // eslint-disable-next-line
    // @ts-ignore
    dispatch(signUserUp({email, password}))
  }, [dispatch, email, password])

  const classes = useStyles()

  return (
    <Grid className={classes.root} component="main" container>
      <CssBaseline />    
      <Grid component={Paper}
            elevation={SHADOW_DEPTH_SIX}
            item md={gridSize.FIVE}
            sm={gridSize.EIGHT}
            square
            xs={gridSize.TWELVE}
            >
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
