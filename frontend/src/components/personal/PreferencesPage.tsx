/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/jsx-no-bind */

import React, { useState, useCallback, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Card, CardActions, CardContent, CardHeader, CardMedia, Button, 
  Typography, Avatar, Box, Snackbar, TextField,  CircularProgress} from '@material-ui/core'
  import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'

import {changeMyData, getMyData } from '../../actions/prefAndProfileActions'
import {useStyles} from './ProfilePreferencesPage.styles'
import {RootState} from '../../reducers/index'
import './PreferencesPage.scss'
import { userLogOut } from '../../actions/authActions'

 function Alert(props: AlertProps) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

export default function PreferencesPage (): React.ReactElement {
  const [open, setOpen] = useState(false)
  
  const handleClick = () => {
    setOpen(true)
  }

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(getMyData())
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
    //@ts-ignore
    setError(user ? user.error : '')
    if (user.error) {
      handleClick()
    } 
 },[user])

  const [email, setEmail] = useState(user ? user.email : '')

  useEffect(() => {
    setEmail(user? user.email : '')
 },[user])

  const oldNickname = user.nickname

  const saveChanges = useCallback((e) => {
    e.preventDefault()
      dispatch(changeMyData({oldNickname, nickname}))
    }, [dispatch, oldNickname, nickname])

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
      <CardContent >
        <TextField className={classes.textfields} label="nickname" 
          onChange={onChangeNickname} value={nickname} variant="outlined" />
        <TextField className={classes.textfields} label="email"
         value={email} variant="outlined"   />
        <br />
        <TextField className={classes.textfields} defaultValue="HypnoToad" 
         label="Job Title" variant="outlined" />
        <TextField className={classes.textfields} defaultValue="United Swamps" 
          label="Company" variant="outlined"  />
       
      </CardContent>
    </div>
      <CardActions className={classes.actionButton}>
      <Button  className="buttons" color="primary"  onClick={saveChanges} type="submit" variant="contained">
        Save Changes
      </Button>
      <Button className="buttons" color="secondary" onClick={logOut}  type="submit" variant="contained">
        Logout
      </Button>
      </CardActions>
      <Snackbar autoHideDuration={6000} onClose={handleClose} open={open}>
        <Alert onClose={handleClose} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </Card>

  )
}