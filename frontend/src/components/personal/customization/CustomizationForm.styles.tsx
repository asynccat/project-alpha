/* eslint-disable no-magic-numbers */
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '3%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      backgroundColor: 'plum',
      fontFamily: 'Roboto',
      fontSize: 14,
    },
    formControl: {
      margin: theme.spacing(3),
    },
    submitButton: {
      maxWidth: 120,
      display: 'flex',
      justifyContent: 'center',
    },
    plainText: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      marginBottom: '5%',
    },
    textarea: {
      marginRight: '5%',
      marginLeft: '5%',
      marginBottom: '5%',
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '5%',
    },
    timeText: {
      paddingLeft: 24,
    }
  }),
)