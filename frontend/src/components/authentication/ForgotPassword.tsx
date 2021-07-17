import React, {useState, useCallback} from 'react'
import {CssBaseline, TextField} from '@material-ui/core'
import {Button, Avatar, Typography, Link, Paper, Grid, Box }  from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

import * as gridSize from '../../constants/styles.values'
import {SIX as SHADOW_DEPTH_SIX} from '../../constants/styles.values'
import { emailFormatIsValid } from '../../utils/FormatVerifications'
import {useStyles} from './SignUp.styles'
import { AuthApiClient } from '../../api/authRequest'

export default function ForgotPasswordSide(): React.ReactElement {

  const classes = useStyles()

  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState(false)
  
  const onChangeEmail = useCallback((e) => {
    setEmail(e.target.value)
  }, [])
  
  const recoverPassword = useCallback(async (e) => {
    e.preventDefault()
    try{
      if (emailFormatIsValid(email)) {
        const authApiClient = new AuthApiClient()
        const {message, error} = await authApiClient.recover(email)
        setMessage(message)
        setError(error)
      } else {
        setMessage('Invalid e-mail format.')
        setError(true)
      }
    } catch(err) {
      setMessage(err.message)
      setError(true)
    }
  }, [email])
  
  const showMessage = () => {
    const color = error ? 'error.main' : 'info.main'
    return (<Box color={color}>{message}</Box>)
  }

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
            Recover password
          </Typography>
          <form className={classes.form} noValidate>
            <Grid alignItems="center" container direction="column" justify="center" spacing={2}>
              <Grid item xs={12}>
                Enter the e-mail linked to your account to recover your password.
              </Grid>
            </Grid>
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
            </Grid>
            <Grid alignItems="center" container direction="column" justify="center" spacing={2}>
              <Grid item xs={12}>
                {showMessage()}
              </Grid>
            </Grid>
            <Button
              className={classes.submit}
              color="primary"
              fullWidth
              onClick={recoverPassword}
              type="submit"
              variant="contained"
            >
              Submit
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Return to Sign In
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  )
}
  