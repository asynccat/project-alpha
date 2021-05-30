/* eslint-disable no-magic-numbers */

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { CSSProperties } from '@material-ui/core/styles/withStyles'

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
   },
 }),
)

export function getModalStyle(): CSSProperties {
 const rand = () => Math.round(Math.random() * 20) - 10

 const top = 20 + rand()
 const left = 50 + rand()

 return {
   top: `${top}%`,
   left: `${left}%`,
   transform: `translate(-${top}%, -${left}%)`
 }
}