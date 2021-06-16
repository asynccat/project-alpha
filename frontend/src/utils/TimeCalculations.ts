import { MINUTES_QTY_TWO_CHARS_LONG, SIXTY_MINUTES_IN_HOUR } from '../constants/valuableNumbers'

export const getTime = (timezone: string) : string  => {
    const time = new Date()

    //Make minutes quantity two-digits number even if its below 10
    const getGMTMins = () =>  `${String(time.getMinutes()).padStart(MINUTES_QTY_TWO_CHARS_LONG, '0')}`
    const getUTCMins = () =>  `${String(time.getUTCMinutes()).padStart(MINUTES_QTY_TWO_CHARS_LONG, '0')}`

    if (timezone === 'GMT') {
      return `${time.getHours()} : ${getGMTMins()}`
    }
    return `${time.getUTCHours()} : ${getUTCMins()}`
  }

  export const getTimeDiffLocalTimeWithGMT = (): string => {
    const time = new Date()
    const offset = -time.getTimezoneOffset()/SIXTY_MINUTES_IN_HOUR 
    return offset > 0 ? `+ ${offset}` : `- ${offset}`
  }