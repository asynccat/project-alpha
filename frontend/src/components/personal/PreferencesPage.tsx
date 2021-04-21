
import React, { useState, useCallback, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Card, CardActions, CardContent, CardHeader, CardMedia, Button, 
  Typography, Avatar, Box, TextField } from '@material-ui/core'

import {changeMyData, getMyData} from '../../actions/prefAndProfileActions'
import {useStyles} from './ProfilePreferencesPage.styles'
import {RootState} from '../../reducers/index'
import './PreferencesPage.scss'
import { userLogOut } from '../../actions/authActions'

export default function PreferencesPage (): React.ReactElement {
  const dispatch = useDispatch()
  
  useEffect(() => {
        dispatch(getMyData())
    }, [dispatch])  

    const user = useSelector((state: RootState) => state.changeMyDataReducer)

  const [nickname, setNickname] = useState(user ? user.nickname : '')

  useEffect(() => {
    setNickname(user? user.nickname : '')
 },[user])

  const onChangeNickname = useCallback((e) => {
    setNickname(e.target.value)
  }, [setNickname])

  const [email, setEmail] = useState(user ? user.email : '')

  useEffect(() => {
    setEmail(user? user.email : '')
 },[user])


  const onChangeEmail = useCallback((e) => {
    setEmail(e.target.value)
  }, [setEmail])

  const [id, setId] = useState(user? user.id : 1)
  const onChangeId = useCallback((e) => {
    setId(e.target.value)
  }, [setId])


  const saveChanges = useCallback((e) => {
    e.preventDefault()
    dispatch(changeMyData({nickname, email, id}))
  }, [dispatch, nickname, email, id])

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
          </Box>
        }
      />
</div>
    <div className="myDataDetails">
      <CardContent >
        <TextField className={classes.textfields} label="nickname" 
          onChange={onChangeNickname} value={nickname} variant="outlined" />
        <TextField className={classes.textfields} label="email"
          onChange={onChangeEmail} value={email} variant="outlined"   />
        <br />
        <TextField className={classes.textfields} 
         label="id" onChange={onChangeId} value={id} variant="outlined" />
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
    </Card>

  )
}