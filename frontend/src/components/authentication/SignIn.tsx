/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-no-bind */
import {CssBaseline, TextField} from '@material-ui/core'
import {Button, Avatar, Typography, FormControlLabel, Checkbox, Link, Paper, Grid }  from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

import React, {useState } from 'react'
import {connect} from 'react-redux'
import {Dispatch} from 'redux'

import { login, AuthActions, IUserDetails } from '../../actions/authActions'
import {useStyles} from './SignUpSignIn.styles'
import {Five, Six, Seven, Twelve, Eight, Four} from './MagicNumbersToConst'

const initialFormData = ({
  email: '',
  password: '',
})

export function SignInSide(): React.ReactElement {

	const [formData, updateFormData] = useState(initialFormData)

	const handleChange = (e:React.SyntheticEvent) => {
		updateFormData({
			...formData,
      [(e.target as HTMLTextAreaElement).name]: ((e.target as HTMLTextAreaElement)).value.trim(),
		})
	}

	const handleSubmit = (e:React.SyntheticEvent) => {
		e.preventDefault()
		console.log(formData)
    login(formData)
  }

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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onClick={handleSubmit}
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
                <Link href="#" variant="body2">
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

const mapDispatchToProps = (dispatch:Dispatch<AuthActions>) => {
  return {
    login: (formData: IUserDetails) => dispatch<any>(login(formData))
  }
}

export default connect(null, mapDispatchToProps)(SignInSide)