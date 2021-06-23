import {HttpClient} from './HttpClient'
import { HttpClientWithInterceptors } from './httpClientWithInterceptors'
import {OperateUserData} from './operatePreferenceData'

export const httpClient = new HttpClient()
// export const httpClientWithInterceptors = new HttpClientWithInterceptors()
export const operateUserDataRequest = new OperateUserData(httpClient)