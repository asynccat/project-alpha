import {config} from '../config'
import {HttpClient, IHttpRequestOptions, defaultHttpRequestOptions} from './HttpClient'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AbstractApiData = any
const baseURL = config.baseUrl+config.apiV1

export class HttpClientWithInterceptors extends HttpClient {
  protected async execute (url:string, method: string, payload?: AbstractApiData, 
    options: IHttpRequestOptions = defaultHttpRequestOptions
    ) : Promise<AbstractApiData>  {
     const token = localStorage.getItem('token')
     const header = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: ''
    }
    if (token&&!options.useCredentials) {
      header.Authorization = `Bearer ${token}`
    }

    if (url !== 'change_email') {
      const response = await fetch(`${baseURL}/${url}/`, {
        method: method,
        headers: header,
        body: JSON.stringify(payload),
      })
    if (response.ok) {
      return await response.json()
    }
    const e = await response.text()
    throw new Error(e)
    }
    else {
      const response =  {
        email: 'helloInterceptor@email.com',
      }
      return response
    }
}
}