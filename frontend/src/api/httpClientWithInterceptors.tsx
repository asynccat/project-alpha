
import {HttpClient, IHttpRequestOptions, defaultHttpRequestOptions} from './HttpClient'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AbstractApiData = any

export class HttpClientWithInterceptors extends HttpClient {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  private execute (url:string, method: string, payload?: AbstractApiData, 
    options: IHttpRequestOptions = defaultHttpRequestOptions
    ) {
     const token = localStorage.getItem('token')
     const header = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: ''
    }
    if (token&&!options.useCredentials) {
      header.Authorization = `Bearer ${token}`
    }
      const response = {
        email: 'helloInterceptor@email.com',
      }
    return response 
      }
}