/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-magic-numbers */
/* eslint-disable react/jsx-no-bind */
import React, {useState } from 'react'
import {connect} from 'react-redux'
import {Dispatch} from 'redux'

import {signUserUp} from '../../actions/userActions'
import { fetchUserAction, UserDetailsOnRegister } from '../../actions'
import {useStyles} from './SignUpStyles'

import {CssBaseline, TextField} from '@material-ui/core'
import {Button, Avatar, Typography, FormControlLabel, Checkbox, Link, Paper, Grid }  from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

function SignUpSide() :React.ReactElement {
	const initialFormData = Object.freeze({
		email: '',
		username: '',
		password: '',
	})

	const [formData, updateFormData] = useState(initialFormData)

	const handleChange = (e:React.SyntheticEvent) => {
		updateFormData({
			...formData,
			[(e.target as HTMLTextAreaElement).name]: ((e.target as HTMLTextAreaElement)).value.trim(),
		})
	}

	const handleSubmit = (e:React.SyntheticEvent) => {
		e.preventDefault()
    signUserUp(formData)
   
  }
  const classes = useStyles()

  return (
    <Grid className={classes.root} component="main" container>
      <CssBaseline />
      <Grid className={classes.image} item md={7} sm={4} xs={false} />
      <Grid component={Paper} elevation={6} item md={5} sm={8} square xs={12}>
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
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                autoComplete="username"
								fullWidth
								id="username"
								label="Username"
								name="username"
								onChange={handleChange}
								required
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
                onChange={handleChange}
                required
                type="password"
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
            onClick={handleSubmit}
            type="submit"
            variant="contained"
          >
            Sign Up
          </Button>
          <Button
            className={classes.submit}
            color="primary"
            fullWidth
          
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
      signUserUp: (formData: UserDetailsOnRegister) => dispatch<any>(signUserUp(formData))
}
}

export default connect(null, mapDispatchToProps)(SignUpSide)