import {HttpClient} from './HttpClient'
import { HttpClientWithInterceptors } from './httpClientWithInterceptors'
import {OperateUserData} from './operatePreferenceData'
import {CustomizationRequest} from './customizationRequest'

export const httpClient = new HttpClient()
export const httpClientWithInterceptors = new HttpClientWithInterceptors()
export const operateUserDataRequest = new OperateUserData(httpClientWithInterceptors)

export const customizationRequest = new CustomizationRequest(httpClient)