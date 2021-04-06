/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState, useCallback, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Card, CardActions, CardContent, CardHeader, CardMedia, Button, 
  Typography, Avatar, Box, TextField } from '@material-ui/core'

import {changeMyData, getMyData} from '../../actions/prefAndProfileActions'
import {useStyles} from './ProfilePreferencesPage.styles'
import {RootState} from '../../reducers/index'

export default function PreferencesPage (): React.ReactElement {
  const dispatch = useDispatch()
  
  useEffect(() => {
      dispatch(getMyData())
  }, [dispatch])

// @ts-ignore
const umail = useSelector((state: RootState) => state.email)
// @ts-ignore
const nick = useSelector((state: RootState) => state.nickname)

  const [nickname, setNickname] = useState('')
  const onChangeNickname = useCallback((e) => {
    setNickname(e.target.value)
  }, [setNickname])

  const [email, setEmail] = useState('')

  const onChangeEmail = useCallback((e) => {
    setEmail(e.target.value)
  }, [setEmail])


  const saveChanges = useCallback((e) => {
    e.preventDefault()
    // eslint-disable-next-line
    // @ts-ignore
    dispatch(changeMyData({nickname, email}))
  }, [dispatch, nickname, email])

  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <Box className={classes.topping}>
      <CardMedia
        className={classes.media}
        image="https://source.unsplash.com/random"
        />
      </Box>

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

      <CardContent >
        <TextField className={classes.textfields} label="nickname" 
          onChange={onChangeNickname} required value={nick} variant="outlined" />
        <TextField className={classes.textfields} label="email"
          onChange={onChangeEmail} value={umail} variant="outlined"   />
        <br />
        <TextField className={classes.textfields} defaultValue="HypnoToad" 
          label="Job Title" variant="outlined" />
        <TextField className={classes.textfields} defaultValue="United Swamps" 
          label="Company" variant="outlined"  />
       
      </CardContent>
      <CardActions className={classes.contactButton}>
      <Button  color="secondary" onClick={saveChanges} type="submit" variant="contained">
        Save Changes
      </Button>
      </CardActions>
    </Card>
  )
}