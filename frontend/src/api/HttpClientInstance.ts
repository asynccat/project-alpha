import {HttpClient} from './HttpClient'
import {OperateUserData} from './operatePreferenceData'

export const httpClient = new HttpClient()
// export const httpClientWithInterceptors = new HttpClientWithInterceptors()
export const operateUserDataRequest = new OperateUserData(httpClient)