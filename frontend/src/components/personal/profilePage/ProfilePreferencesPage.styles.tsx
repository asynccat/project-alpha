/* eslint-disable no-magic-numbers */
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

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
    border: '4px solid white',
    position: 'relative',
  
  },
  manipulationVisible: {
    visibility: 'visible',
    backgroundColor: 'rgba(0,0,0,0.7)',
    display: 'flex',
    color: 'white',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    justifyContent: 'center',
    padding: 10,
    position: 'absolute',
    marginLeft: 10,
    marginTop: -44,
    zIndex: 10,
},
  manipulationHidden: {
    visibility: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    padding: 10,
    position: 'absolute',
    marginLeft: 10,
    marginTop: -44,
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
  },
  nicknameButton: {
    display: 'flex',
    justifyContent: 'center',
    width: 120,
  },
  textfields: {
    margin: 15,
  },
  errorMessage: {
    color: 'red',
  },
}))

export const useStyleModal = makeStyles((theme: Theme) =>
 createStyles({
   paper: {
     position: 'absolute',
     width: 500,
     backgroundColor: theme.palette.background.paper,
     border: '1px dotted #000',
     boxShadow: theme.shadows[5],
     padding: theme.spacing(2, 4, 3),
     fontFamily: 'Roboto',
     lineHeight: '1.5rem',
     left: '36%',
     top: '20%',
   '@media (max-width: 600px)': {
    width: '100%',
    top: '20%',
    left: 0,
   }
 }
}),
)

