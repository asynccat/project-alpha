import {HttpClient} from './HttpClient'
import {OperateUserData} from './operatePreferenceData'

export const httpClient = new HttpClient()
export const operateUserDataRequest = new OperateUserData(httpClient)