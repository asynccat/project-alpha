
/* eslint-disable react/jsx-no-bind */

import React, { useState, useCallback, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {Card, CardActions, CardContent, CardHeader, CardMedia, Button, 
  Typography, Avatar, Box, TextField,  CircularProgress} from '@material-ui/core'

import {updateUserNickname, fetchUserPreferences } from '../../actions/prefAndProfileActions'
import {useStyles} from './ProfilePreferencesPage.styles'
import {RootState} from '../../reducers/index'
import './PreferencesPage.scss'
import { userLogOut } from '../../actions/authActions'
import PasswordChangeForm from './PasswordChangeForm'
import EmailChangeForm from './EmailChangeForm'
import PreferencesCustomizationForm from './CustomizationForm'

export default function PreferencesPage (): React.ReactElement {
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

  const oldNickname = user.nickname

  const saveNickNameChange = useCallback((e) => {
    e.preventDefault()
      dispatch(updateUserNickname({oldNickname, nickname}))
    }, [dispatch, oldNickname, nickname])


  const logOut = useCallback((e) => {
    e.preventDefault()
    dispatch(userLogOut())
  }, [dispatch])

  const classes = useStyles()

  return (
  <div className="preferencePage-main">
 <PreferencesCustomizationForm />
   
    <Card className={classes.root}>
      <Box className={classes.topping}>
      <CardActions className={classes.logout}>
        <Button className="buttons logout" color="secondary" onClick={logOut}  type="submit" variant="contained">
          Logout
        </Button>
      </CardActions>
    <div className="preferences-name-and-avatar">
      <CardMedia
        className={classes.media}
        image="https://source.unsplash.com/random"
        />
      <CardHeader 
        avatar={
          <Avatar alt="Remy Sharp" className={classes.large} />
        }
        className={classes.header}
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
      </Box>

      <div className="avatarName">
      </div>
      <div className="myDataDetails">
        <div> { loader? <CircularProgress/> : ''} </div>
          <CardContent>
            <div className="nickEmail">
              <div className="nickButton">
                <TextField className={classes.textfields}  label="nickname" 
                  onChange={onChangeNickname} value={nickname} variant="outlined" 
                />
                <Button  className={classes.nicknameButton} color="primary" 
                  data-testid="nickSubmit" onClick={saveNickNameChange}
                  type="submit" variant="contained">
                  change {'\n'} nickname
                </Button>
              </div>
              <EmailChangeForm />
            </div>
             
              <PasswordChangeForm />
          </CardContent>
      </div>
    </Card>
  </div>
  )
}