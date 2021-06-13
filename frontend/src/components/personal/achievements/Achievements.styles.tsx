/* eslint-disable no-magic-numbers */
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: 'rgb(163, 160, 162)',
      fontFamily: 'Roboto',
      fontSize: 14,
      padding: 10,
      borderRadius: 4,
    },
    heading: {
        paddingRight: 10,
    },
    icon: {
        '&:hover': {
            transform: 'scale(1.8)',
            marginRight: 10,
            marginLeft: 10,
          }
    },
    popover: {
      pointerEvents: 'none',
    },
    paper: {
      padding: theme.spacing(1),
    },
    })
)