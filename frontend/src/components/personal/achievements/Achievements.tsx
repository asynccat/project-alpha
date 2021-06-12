import React from 'react'
import {Typography} from '@material-ui/core'
import EmojiEventsOutlinedIcon from '@material-ui/icons/EmojiEventsOutlined'

import { useStyles } from './Achievements.styles'

export const AchievementsBoard = (): React.ReactElement => {
    const classes = useStyles()

    return <div className={classes.root}> 
            <Typography className={classes.heading} component="h5">
                Achievements:
            </Typography>
            <EmojiEventsOutlinedIcon className={classes.icon} />
            <EmojiEventsOutlinedIcon className={classes.icon} />
           </div>
}