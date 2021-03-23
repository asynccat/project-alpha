import * as React from 'react'
import {Card, CardActions, CardContent, CardHeader, CardMedia, Button, 
  Typography, Avatar, Box } from '@material-ui/core'

import {useStyles} from './PersonalPage.styles'
import cat from './images/cat.gif'

export default function Welcome (): React.ReactElement {
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

      <CardContent>
        <Typography component="p">
              User Name: Lizard Amphisbaenia
        </Typography>
        <Typography component="p">
              Gender: female
        </Typography>
        <Typography component="p">
              Job Title: HypnoToad
        </Typography>
        <Typography component="p">
              Company: United Swamps
        </Typography>
        <Typography component="p">
              Last seen: 11 mar 2021
        </Typography>
      </CardContent>
      <CardActions className={classes.contactButton}>
      <Button  color="secondary" variant="contained">
        Contact Lizard
      </Button>
      </CardActions>
    </Card>
  )
}