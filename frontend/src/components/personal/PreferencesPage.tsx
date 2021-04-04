import React, { useState, useCallback } from 'react'
import {useDispatch} from 'react-redux'
import {Card, CardActions, CardContent, CardHeader, CardMedia, Button, 
  Typography, Avatar, Box, TextField } from '@material-ui/core'

import {changeMyData} from '../../actions/prefAndProfileActions'
import {useStyles} from './ProfilePreferencesPage.styles'

export default function PreferencesPage (): React.ReactElement {
  const [username, setUsername] = useState('')
  const onChangeUsername = useCallback((e) => {
    setUsername(e.target.value)
  }, [setUsername])

  const [address, setAddress] = useState('')
  const onChangeAddress = useCallback((e) => {
    setAddress(e.target.value)
  }, [setAddress])

  const [job, setJob] = useState('')
  const onChangeJob = useCallback((e) => {
    setJob(e.target.value)
  }, [setJob])
  
  const [company, setCompany] = useState('')
  const onChangeCompany = useCallback((e) => {
    setCompany(e.target.value)
  }, [setCompany])

  const dispatch = useDispatch()

  const saveChanges = useCallback((e) => {
    e.preventDefault()
    // eslint-disable-next-line
    // @ts-ignore
    dispatch(changeMyData({username, address, job, company}))
  }, [dispatch, username, address, job, company])


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
            Lizard Amphisbaenia
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
        <TextField className={classes.textfields} defaultValue="Lizard Amphisbaenia" 
          label="User Name" onChange={onChangeUsername} required variant="outlined" />
        <TextField className={classes.textfields} defaultValue="Las Vegas, US" 
          label="Address" onChange={onChangeAddress} variant="outlined"  />
        <br />
        <TextField className={classes.textfields} defaultValue="HypnoToad" 
          label="Job Title" onChange={onChangeJob} variant="outlined" />
        <TextField className={classes.textfields} defaultValue="United Swamps" 
          label="Company" onChange={onChangeCompany} variant="outlined"  />
       
      </CardContent>
      <CardActions className={classes.contactButton}>
      <Button  color="secondary" onClick={saveChanges} type="submit" variant="contained">
        Save Changes
      </Button>
      </CardActions>
    </Card>
  )
}