/* eslint-disable no-magic-numbers */
/* eslint-disable react/jsx-no-bind */
import React, {useState } from 'react'
import {connect} from 'react-redux'
import {signUserUp} from '../../actions/userActions'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

function Copyright(): React.ReactElement {
  return (
    <Typography align="center" color="textSecondary" variant="body2">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
       Project-Alpha
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export function SignUpSide() :React.ReactElement {
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
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
      </Grid>
    </Grid>
  )
}
}


const mapDispatchToProps = (dispatch) => {
  return {
      signUserUp: (formData) => dispatch(signUserUp(formData))
  }
}

export default connect(null, mapDispatchToProps)(SignUpSide)