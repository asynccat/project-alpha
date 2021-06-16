import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { Button, FormControl, FormGroup, FormControlLabel, Checkbox, Select, 
  InputLabel, MenuItem, TextareaAutosize, Typography } from '@material-ui/core'

import { successChangeUserNotification, 
  userNotificationRequestFailed } from '../../../actions/notificationActions'
import { RootState } from '../../../reducers/index'
import { useStyles } from './NotificationForm.styles'
import { FIVE } from '../../../constants/styles.values'
import { getTimeDiffLocalTimeWithGMT, getTime } from '../../../utils/TimeCalculations'


export default function PreferencesNotificationForm (): React.ReactElement {
  const dispatch = useDispatch()
  
  const custom = useSelector((state: RootState) => state.notificationReducer)

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      sendEmailsWithNews: custom? custom.sendEmailsWithNews : true,
      sendUpdatesThreads: custom? custom.sendUpdatesThreads: false,
      sendUserReviews: custom? custom.sendUserReviews : false,
      sendUserQuestsReviews: custom? custom.sendUserQuestsReviews : false,
      sendUpdatesMessages: custom? custom.sendUpdatesMessages : false,
      timezone: custom? custom.timezone :'UTC',
      aboutUser: custom? custom.aboutUser : ''
    },
    onSubmit: (values) => {
      console.log(values)
        try {
          dispatch(successChangeUserNotification(values))
      } catch (error) {
          dispatch(userNotificationRequestFailed(error))
      }
    }
  })
    
    
    
    const classes = useStyles()

    return (
    <form className="emailButton" onSubmit={formik.handleSubmit}>
      <div className={classes.root}>
        <FormControl className={classes.formControl}>
            <InputLabel>My Timezone</InputLabel>
            <Select
              name="timezone"
              onChange={formik.handleChange}
              value={formik.values.timezone}
            >
              <MenuItem value={'UTC'}>UTC</MenuItem>
              <MenuItem value={'GMT'}>GMT {getTimeDiffLocalTimeWithGMT()} </MenuItem>
            </Select>
        </FormControl>
        <Typography className={classes.timeText} component="p">
           My time: 	&#8986; {(formik.values.timezone)? getTime(formik.values.timezone) : ''} 
        </Typography>
        <FormControl className={classes.formControl} component="fieldset">
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={formik.values.sendEmailsWithNews} 
              name="sendEmailsWithNews" onChange={formik.handleChange}
               />}
              label="Send me emails with news from project alpha"
            />
            <br/>
            <br/>
            <Typography component="p" >
            Send me emails about updates in:
            </Typography>   
            <br />
            <FormGroup>
                <FormControlLabel
                control={<Checkbox checked={formik.values.sendUpdatesThreads} 
                name="sendUpdatesThreads" onChange={formik.handleChange} />}
                label="Threads I follow"
                />
                <FormControlLabel
                control={<Checkbox checked={formik.values.sendUserReviews} 
                name="sendUserReviews" onChange={formik.handleChange} />}
                label="My reviews"
                />
            </FormGroup>
            <FormGroup>
                <FormControlLabel
                control={<Checkbox checked={formik.values.sendUserQuestsReviews} 
                name="sendUserQuestsReviews" onChange={formik.handleChange} />}
                label="Reviews on my quests"
                />
                <FormControlLabel
                control={<Checkbox checked={formik.values.sendUpdatesMessages} 
                name="sendUpdatesMessages" onChange={formik.handleChange} />}
                label="New personal messages"
                />
            </FormGroup>
          </FormGroup>
        </FormControl>
        <Typography className={classes.plainText} component="p" >
            About me
        </Typography>  
        <TextareaAutosize aria-label="minimum height" className={classes.textarea}
          name="aboutUser" onChange={formik.handleChange} placeholder="Type there info about you"
          rowsMin={FIVE} value={formik.values.aboutUser} />
        <div className={classes.buttonContainer}>
          <Button  className={classes.submitButton} color="primary"
               data-testid="submit-notification-button"
               type="submit" variant="contained">
              Submit
          </Button>
        </div>
      </div>
    </form>
    )
}