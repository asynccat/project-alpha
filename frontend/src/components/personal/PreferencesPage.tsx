
import React, { useState, useCallback, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Card, CardActions, CardContent, CardHeader, CardMedia, Button, 
  Typography, Avatar, Box, TextField } from '@material-ui/core'

import {changeMyData, getMyData} from '../../actions/prefAndProfileActions'
import {useStyles} from './ProfilePreferencesPage.styles'
import {RootState} from '../../reducers/index'
import './PreferencesPage.scss'

export default function PreferencesPage (): React.ReactElement {
  const dispatch = useDispatch()
  
  useEffect(() => {
        dispatch(getMyData())
    }, [dispatch])  

  const umail = useSelector((state: RootState) => state.changeMyDataReducer.email)
  const nick = useSelector((state: RootState) => state.changeMyDataReducer.nickname)

  const [nickname, setNickname] = useState(nick)
  const onChangeNickname = useCallback((e) => {
    setNickname(e.target.value)
  }, [setNickname])

  const [email, setEmail] = useState(umail)
  const onChangeEmail = useCallback((e) => {
    setEmail(e.target.value)
  }, [setEmail])

  const [id, setId] = useState(1)
  const onChangeId = useCallback((e) => {
    setId(e.target.value)
  }, [setId])


  const saveChanges = useCallback((e) => {
    e.preventDefault()
    dispatch(changeMyData({nickname, email, id}))
  }, [dispatch, nickname, email, id])

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
          {nick}
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
          onChange={onChangeNickname} value={nick} variant="outlined" />
        <TextField className={classes.textfields} label="email"
          onChange={onChangeEmail} value={umail} variant="outlined"   />
        <br />
        <TextField className={classes.textfields} defaultValue={1}
          label="id" onChange={onChangeId} value={id} variant="outlined" />
        <TextField className={classes.textfields} defaultValue="United Swamps" 
          label="Company" variant="outlined"  />
       
      </CardContent>
    </div>
      <CardActions className={classes.contactButton}>
      <Button  color="secondary" onClick={saveChanges} type="submit" variant="contained">
        Save Changes
      </Button>
      </CardActions>
    </Card>

  )
}