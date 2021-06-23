/* eslint-disable no-magic-numbers */
import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1000,
    overflow: 'visible',
    width: '100%',
  '& > * + *': {
    marginTop: theme.spacing(2),
    },
    '@media (max-width: 600px)': {
      marginTop: 0,
    },
  },
  media: {
    height: 150,
    width: '100%',
  },
  large: {
    width: 150,
    height: 150,
    marginTop: -100,
    marginLeft: 10,
    margin: 'auto',
    border: '4px solid white'
  },
  header: {
    '@media (max-width: 600px)': {
      display: 'flex',
      flexDirection: 'column',
    }
  },
  topping: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
  },
  actionButton: {
    display: 'flex',
    justifyContent: 'center',
    width: 120,
    padding: 10,
  },
  passwordChangeButton: {
    display: 'flex',
    justifyContent: 'center',
    padding: 10,
  },
  logout: {
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    right: '5%',
    // '@media (max-width: 600px)': {
    //   top: '3%',
    //   right: '5%',
    // },
    // '@media (min-width: 1200px)': {
    //   top: '8%',
    //   right: '18%',
    // },
  },
  nicknameButton: {
    display: 'flex',
    justifyContent: 'center',
    width: 120,
  },
  textfields: {
    margin: 15,
  },
}))

 

