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
    },
    media: {
      height: 200,
      width: 1000,
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
      marginBottom: '15px',
    },
    nicknameButton: {
      width: 120,
      padding: 10,
    },
    textfields: {
      margin: 15,
    }
  }))