
/* eslint-disable react/jsx-no-bind */

import React, { useState, useCallback, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Card, CardActions, CardContent, CardHeader, CardMedia, Button, 
  Typography, Avatar, Box, Snackbar, TextField,  CircularProgress} from '@material-ui/core'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'

import {updateUserNickname, fetchUserPreferences, updateUserPassword,
  userPreferencesRequestFailed, userPreferencesRequestInitiated } from '../../actions/prefAndProfileActions'
import {useStyles} from './ProfilePreferencesPage.styles'
import {RootState} from '../../reducers/index'
import './PreferencesPage.scss'
import { userLogOut } from '../../actions/authActions'
import {TWOSIGNS} from '../../constants/valuableNumbers'

 function Alert(props: AlertProps) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

export default function PreferencesPage (): React.ReactElement {
  const [open, setOpen] = useState(false)

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(fetchUserPreferences())
  }, [dispatch])  
  
  const user = useSelector((state: RootState) => state.operatePreferencesDataReducer)
  const id = useSelector((state: RootState) => state.userReducer.id)
  const loader = useSelector((state: RootState) => state.operatePreferencesDataReducer.isLoading)

  const [nickname, setNickname] = useState(user ? user.nickname : '')

  useEffect(() => {
    setNickname(user? user.nickname : '')
 },[user])

  const onChangeNickname = useCallback((e) => {
    setNickname(e.target.value)
  }, [setNickname])

  const [error, setError] = useState(user ? user : '')
  useEffect(() => {
    setError(user ? user.error : '')
    if (user.error.length > TWOSIGNS) {
      setOpen(true)
    }
 },[user])

 const [status, setStatus] = useState(user ? user : '')
  useEffect(() => {
    setStatus(user ? user.status : '')
    if (user.status.length > TWOSIGNS) {
      console.log(user.status.length)
      setOpen(true)
    } 
 },[user])

  const [email, setEmail] = useState(user ? user.email : '')

  useEffect(() => {
    setEmail(user? user.email : '')
 },[user])

  const oldNickname = user.nickname

  const saveChanges = useCallback((e) => {
    e.preventDefault()
      dispatch(updateUserNickname({oldNickname, nickname}))
    }, [dispatch, oldNickname, nickname])

  const [old_password, setOldPassword] = useState('')
  const [new_password, setNewPassword] = useState('')
  const [confirm_password, setConfirmPassword] = useState('')

    const onChangeOldPassword = useCallback((e) => {
      setOldPassword(e.target.value)
    }, [setOldPassword])

    const onChangeNewPassword = useCallback((e) => {
      setNewPassword(e.target.value)
    }, [setNewPassword])

    const onChangeConfirmPassword = useCallback((e) => {
      setConfirmPassword(e.target.value)
    }, [setConfirmPassword])

  const savePasswordChange = useCallback((e) => {
      e.preventDefault()
      if (new_password === confirm_password) {
        dispatch(updateUserPassword({old_password, new_password, confirm_password}))
      } else {
        dispatch(userPreferencesRequestInitiated())
        dispatch(userPreferencesRequestFailed('passwords are not the same'))
      }
      setConfirmPassword('')
      setNewPassword('')
      setOldPassword('')
      }, [dispatch, old_password, new_password, confirm_password])


  const logOut = useCallback((e) => {
    e.preventDefault()
    dispatch(userLogOut())
  }, [dispatch])

  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <Box className={classes.topping}>
      <CardMedia
        className={classes.media}
        image="https://source.unsplash.com/random"
        />
      </Box>

<div className="avatarName">
      <CardHeader
        avatar={
          <Avatar alt="Remy Sharp" className={classes.large} />
        }
        title={
          <Typography component="div" margin-bottom="large" variant="h5">
          {nickname}
          </Typography>
        }
        // eslint-disable-next-line react/jsx-sort-props
        subheader={
          <Box>
            <Typography component="p">
              Las Vegas, US
            </Typography>
            <Typography component="p">
            User
            </Typography>
            <Typography component="p">
            # {id}
            </Typography>
          </Box>
        }
      />
</div>
  <div className="myDataDetails">
    <div> { loader? <CircularProgress/> : ''} </div>
      <CardContent>
        <div className="nickEmail">
          <div className="nickButton">
            <TextField className={classes.textfields} label="nickname" 
              onChange={onChangeNickname} value={nickname} variant="outlined" />

              <Button  className={classes.nicknameButton} color="primary"  onClick={saveNickNameChange}
                type="submit" variant="contained">
                change nickname
              </Button>
          </div>
        <div className="emailButton">
          <TextField className={classes.textfields} label="email"
            value={email} variant="outlined"   />
          <Button  color="primary" type="submit" variant="contained">
              change email
          </Button>
        </div>
        </div>

       
        <Collapsible className="collapsible" trigger="Change Password&nbsp; &gt;">
       <div className="PasswordFields">
          <TextField className={classes.textfields} label="Old password" onChange={onChangeOldPassword}
          value={old_password} variant="outlined" />
          <TextField className={classes.textfields} label="New password" onChange={onChangeNewPassword}
            value={new_password} variant="outlined"  />
          <TextField className={classes.textfields} label="Repeat new password" onChange={onChangeConfirmPassword}
            value={confirm_password} variant="outlined"  />
       </div>
          <CardActions className={classes.actionButton}>
            <Button className="buttons" color="primary" onClick={savePasswordChange} type="submit" variant="contained">
             change Password
            </Button>
          </CardActions>
        </Collapsible>
      </CardContent>

  </div>
      <CardActions className={classes.actionButton}>
      <Button className="buttons" color="secondary" onClick={logOut}  type="submit" variant="contained">
        Logout
      </Button>
      </CardActions>
      { error ?
      <Snackbar autoHideDuration={6000} onClose={handleClose} open={open}>
        <Alert onClose={handleClose} severity="error">{error}
        </Alert>
      </Snackbar>
 : '' }

      { status ?
      <Snackbar autoHideDuration={6000} onClose={handleClose} open={open}>
        <Alert onClose={handleClose} severity="success">{status}
        </Alert>
      </Snackbar>
      : '' }
    </Card>

  )
}