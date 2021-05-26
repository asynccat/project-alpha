/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
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
    },
    
  }))

  export const useStyleModal = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '1px dotted #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      fontFamily: 'Roboto',
      lineHeight: '1.5rem'
    },
  }),
)

export function rand() {
  return Math.round(Math.random() * 20) - 10
}

export function getModalStyle() {
  const top = 20 + rand()
  const left = 50 + rand()

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  }
}

