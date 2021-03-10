/* eslint-disable react/destructuring-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-no-bind */
import {CssBaseline, TextField} from '@material-ui/core'
import {Button, Avatar, Typography, FormControlLabel, Checkbox, Link, Paper, Grid }  from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

import React, {useState } from 'react'
import {connect} from 'react-redux'
import {Dispatch} from 'redux'

import { signUserUp, fetchUserAction, IUserDetails } from '../../actions/authActions'
import {useStyles} from './SignUpSignIn.styles'
import {Five, Six, Seven, Twelve, Eight, Four} from './MagicNumbersToConst'


// const initialFormData = ({
//   email: '',
//   password: '',
// })


const Page = () => {
  const styles = useStyles()
  return styles
}

class SignUpSide extends React.Component {
  constructor(props:IUserDetails) {
    super(props)

    this.state = {
      email: '',
      password: '',
    }
  }

  handleChange(e:React.SyntheticEvent) {
    this.setState({
      [(e.target as HTMLTextAreaElement).name]: (e.target as HTMLTextAreaElement).value.trim()
    })
  }

	handleSubmit = (e:React.SyntheticEvent) => {
		e.preventDefault()
    this.props.signUserUp(this.state)
    console.log('done')
  }

  classes = Page.styles

  render() {
    <Grid className={this.classes.root} component="main" container>
      <CssBaseline />
      <Grid className={this.classes.image} item md={Seven} sm={Four} xs={false} />
      <Grid component={Paper} elevation={Six} item md={Five} sm={Eight} square xs={Twelve}>
      <div className={this.classes.paper}>
        <Avatar className={this.classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={this.classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="email"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={this.handleChange}
                required
                value={this.state.email}
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
                onChange={this.handleChange}
                required
                type="password"
                value={this.state.password}
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
            className={this.classes.submit}
            color="primary"
            fullWidth
            onClick={this.handleSubmit}
            type="submit"
            variant="contained"
          >
            Sign Up
          </Button>
          <Button
            className={this.classes.submit}
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
  }
}

const mapDispatchToProps = (dispatch:Dispatch<fetchUserAction>) => {
  return {
      signUserUp: (userInfo: IUserDetails) => dispatch<any>(signUserUp(userInfo))
}
}

export default connect(null, mapDispatchToProps)(SignUpSide)