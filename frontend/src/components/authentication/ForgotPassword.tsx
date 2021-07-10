import React, {useState, useCallback} from 'react'
import {useDispatch} from 'react-redux'
import {CssBaseline, TextField} from '@material-ui/core'
import {Button, Avatar, Typography, Link, Paper, Grid }  from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { useFormik } from 'formik'

import * as gridSize from '../../constants/styles.values'
import {SIX as SHADOW_DEPTH_SIX} from '../../constants/styles.values'
import { recover } from '../../actions/authActions'
import {validationSchema} from '../../utils/ValidationSchemes'
import {useStyles} from './SignUp.styles'

export default function ForgotPasswordSide(): React.ReactElement {

    const [email, setEmail] = useState('')
    const onChangeEmail = useCallback((e) => {
      setEmail(e.target.value)
    }, [setEmail])
  
    const dispatch = useDispatch()
  
    const recoverPassword = useCallback((e) => {
      e.preventDefault()
      dispatch(recover({email}))
    }, [dispatch, email])
  
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
            Recover password
          </Typography>
          <form className={classes.form} noValidate>
            <Grid alignItems="center" container direction="column" justify="center" spacing={2}>
              <Grid item xs={12}>
                Enter your e-mail to recover your password.
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
                  Go back
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        </Grid>
      </Grid>
    )
  }
  