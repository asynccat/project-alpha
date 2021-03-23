import * as React from 'react'
import {Card, CardActions, CardContent, CardHeader, CardMedia, Button, 
  Typography, Avatar, Box, TextField } from '@material-ui/core'

import {useStyles} from './ProfilePreferencesPage.styles'
import cat from './images/cat.gif'

export default function PreferencesPage (): React.ReactElement {
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
          <Avatar alt="Remy Sharp" className={classes.large} src={cat} />
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
          label="User Name" required variant="outlined" />
        <TextField className={classes.textfields} defaultValue="Las Vegas, US" 
          label="Address" variant="outlined"  />
        <br />
        <TextField className={classes.textfields} defaultValue="HypnoToad" 
          label="Job Title" variant="outlined" />
        <TextField className={classes.textfields} defaultValue="United Swamps" 
          label="Company" variant="outlined"  />
       
      </CardContent>
      <CardActions className={classes.contactButton}>
      <Button  color="secondary" variant="contained">
        Save Changes
      </Button>
      </CardActions>
    </Card>
  )
}