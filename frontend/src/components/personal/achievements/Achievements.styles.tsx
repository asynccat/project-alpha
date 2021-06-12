/* eslint-disable no-magic-numbers */
import { makeStyles, createStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() =>
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
    }
    })
)