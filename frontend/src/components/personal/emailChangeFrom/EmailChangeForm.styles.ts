/* eslint-disable no-magic-numbers */

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

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
     lineHeight: '1.5rem',
     left: '36%',
     top: '20%'
   },
 }),
)