/* eslint-disable no-magic-numbers */
import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles({
    root: {
      maxWidth: 800,
    },
    media: {
      height: 200,
      width: 800,
    },
    large: {
      width: 150,
      height: 150,
      marginTop: 10,
      marginLeft: 10,
      margin: 'auto',
    },
    topping: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    actionButton: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '15px'
    },
    textfields: {
      margin: 15,
    }
  })