/* eslint-disable no-magic-numbers */
import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { NavLink } from 'react-router-dom'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
)

export default function ButtonAppBar() : React.ReactElement {
  const classes = useStyles()


  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton aria-label="menu" className={classes.menuButton} color="inherit" edge="start" >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" >
            Hello, world!
          </Typography>
          <Button color="inherit"><NavLink to="/">Back to mainpage</NavLink></Button>
          <Button color="inherit"> <NavLink to="/sign-up">Sign Up</NavLink></Button>
          <Button color="inherit"><NavLink to="/login">Sign In</NavLink></Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}
