/* eslint-disable no-magic-numbers */
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      backgroundColor: 'plum',
      fontFamily: 'Roboto',
      fontSize: 14,
      boxShadow:'0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
      overflow: 'visible',
      alignItems: 'stretch',
      width: '100%',
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