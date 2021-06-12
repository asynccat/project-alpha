import React, {useState, useCallback, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Button, FormControl, FormGroup, FormControlLabel, Checkbox, Select, 
  InputLabel, MenuItem, TextareaAutosize, Typography } from '@material-ui/core'

import {fetchUserCustomization, successChangeUserCustomization } from '../../actions/customizationActions'
import {RootState} from '../../reducers/index'
import {useStyles} from './CustomizationForm.styles'
import { FIVE } from '../../constants/styles.values'
import {MINUTES_QTY_TWO_CHARS_LONG, SIXTY_MINUTES_IN_HOUR } from '../../constants/valuableNumbers'

export default function PreferencesCustomizationForm (): React.ReactElement {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(fetchUserCustomization())
  }, [dispatch])  

  const custom = useSelector((state: RootState) => state.customizationReducer)

  const [checkboxState, setCheckboxState] = useState({
      emailNews: custom? custom.emailNews : true,
      emailThreads: custom? custom.emailThreads : false,
      emailMyReviews: custom? custom.emailMyReviews : false,
      emailQuestReviews: custom? custom.emailQuestReviews : false,
      emailMessages: custom? custom.emailMessages : false,
    })
    
    const [textAndTimeState, setTextAndTimeState] = useState({
      timeZone: custom? custom.timeZone :'UTC',
      aboutMe: custom? custom.aboutMe : ''
    })
    
    const { emailNews, emailThreads, emailMyReviews, emailQuestReviews,  emailMessages} = checkboxState
    const { timeZone, aboutMe } = textAndTimeState
    
    const handleCheckboxChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
      setCheckboxState({ ...checkboxState, [event.target.name]: event.target.checked })
    }, [checkboxState, setCheckboxState])
    
    const handleTextAndTimeChange = useCallback((event: React.ChangeEvent<{ value: unknown }>) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      setTextAndTimeState({...textAndTimeState, [event.target.name]: event.target.value as string })
    }, [textAndTimeState, setTextAndTimeState])

    const handleSubmit = useCallback((e) => {
      e.preventDefault()
    const customizationData = Object.assign(checkboxState, textAndTimeState)
    console.log(customizationData)
    dispatch(successChangeUserCustomization(customizationData))
    }, [dispatch, checkboxState, textAndTimeState])

    const getTime = () => {
      const zone = textAndTimeState.timeZone
      const time = new Date()
      if (zone === 'GMT') {
        //Make minutes quantity two-digits number even if its below 10
        const minutes = String(time.getMinutes()).padStart(MINUTES_QTY_TWO_CHARS_LONG, '0')
        const now = `${time.getHours()} : ${minutes}`
        return now
      }
       //Make minutes quantity two-digits number even if its below 10
      const minutes = String(time.getUTCMinutes()).padStart(MINUTES_QTY_TWO_CHARS_LONG, '0')
      const now = `${time.getUTCHours()} : ${minutes}`
      return now
    }

    const getTimeDiffLocalTimeWithGMT = () => {
      const time = new Date()
      const offset = -time.getTimezoneOffset()/SIXTY_MINUTES_IN_HOUR 
      return offset > 0 ? `+ ${offset}` : `- ${offset}`
    }
    
    const classes = useStyles()

    return (
      <div className={classes.root}>
        <FormControl className={classes.formControl}>
            <InputLabel>My Timezone</InputLabel>
            <Select
              name="timeZone"
              onChange={handleTextAndTimeChange}
              value={timeZone}
            >
              <MenuItem value={'UTC'}>UTC</MenuItem>
              <MenuItem value={'GMT'}>GMT {getTimeDiffLocalTimeWithGMT()}</MenuItem>
            </Select>
        </FormControl>
        <Typography className={classes.timeText} component="p">
           My time: 	&#8986; {getTime()}
        </Typography>
        <FormControl className={classes.formControl} component="fieldset">
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={emailNews} name="emailNews" onChange={handleCheckboxChange} />}
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
                control={<Checkbox checked={emailThreads} name="emailThreads" onChange={handleCheckboxChange} />}
                label="Threads I follow"
                />
                <FormControlLabel
                control={<Checkbox checked={emailMyReviews} name="emailMyReviews" onChange={handleCheckboxChange} />}
                label="My reviews"
                />
            </FormGroup>
            <FormGroup>
                <FormControlLabel
                control={<Checkbox checked={emailQuestReviews} 
                name="emailQuestReviews" onChange={handleCheckboxChange} />}
                label="Reviews on my quests"
                />
                <FormControlLabel
                control={<Checkbox checked={emailMessages} name="emailMessages" onChange={handleCheckboxChange} />}
                label="New personal messages"
                />
            </FormGroup>
          </FormGroup>
        </FormControl>
        <Typography className={classes.plainText} component="p" >
            About me
        </Typography>  
        <TextareaAutosize aria-label="minimum height" className={classes.textarea}
          name="aboutMe" onChange={handleTextAndTimeChange} 
          placeholder="Type there info about you" rowsMin={FIVE} value={aboutMe} />
        <div className={classes.buttonContainer}>
          <Button  className={classes.submitButton} color="primary" onClick={handleSubmit} 
              type="submit" variant="contained">
              Submit
          </Button>
        </div>
      </div>
    )
}