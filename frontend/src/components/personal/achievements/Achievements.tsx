import React, { useCallback, useState } from 'react'
import { Typography, Popover } from '@material-ui/core'
import EmojiEventsOutlinedIcon from '@material-ui/icons/EmojiEventsOutlined'

import { useStyles } from './Achievements.styles'

export const AchievementsBoard = (): React.ReactElement => {
    const [popoverElement, setPopoverElement] = useState<HTMLElement | null>(null)

    const handlePopoverOpen = useCallback((event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        setPopoverElement(event.currentTarget)
    }, [setPopoverElement])

    const handlePopoverClose = useCallback(() => {
        setPopoverElement(null)
    }, [setPopoverElement])

    const open = Boolean(popoverElement)

    const classes = useStyles()

    return <div className={classes.root}> 
            <Typography className={classes.heading} component="h5">
                Achievements:
            </Typography>
            <Typography
                aria-haspopup="true"
                aria-owns={open ? 'mouse-over-popover' : ''}
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
            >
            <EmojiEventsOutlinedIcon className={classes.icon} />
            </Typography>
            <Popover
                anchorEl={popoverElement}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}
                className={classes.popover}
                classes={{
                paper: classes.paper,
                }}
                disableRestoreFocus
                id="mouse-over-popover"
                onClose={handlePopoverClose}
                open={open}
                transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
                }}
            >
                <Typography>Achievement for joining us</Typography>
            </Popover>
           </div>
}