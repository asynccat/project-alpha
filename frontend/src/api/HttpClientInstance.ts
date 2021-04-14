import {HttpClient} from './HttpClient'
import {WorkWithMyData} from './WorkWithMyData'


export const httpClient = new HttpClient()
export const workWithMyDataRequest = new WorkWithMyData(httpClient)