import {config} from '../config'

const baseURL = config.baseUrl+config.apiV1

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AbstractApiData = any

export interface IHttpClient {
  post: <Payload, Response>(url:string, useCredentials: boolean,  payload: Payload) => Promise<Response>
  get: <Response>(url:string, useCredentials: boolean) => Promise<Response>
}

export class HttpClient {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private async execute (url:string, method: string,  useCredentials: boolean, payload?: AbstractApiData) {
     const token = localStorage.getItem('token')
        const response = await fetch(`${baseURL}/${url}/`, {
          method: method,
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json', 
            Authorization: token&&!useCredentials? `Bearer ${token}` : '',
          },
          body: JSON.stringify(payload),
        })
        if (response.ok) {
          return await response.json()
        }
        const e = await response.text()
        throw new Error(e)
      }
    /*
    * We're using Promise<any> here, to avoid extra code
    * for casting from 'unknown' to required type.
    * */

    // eslint-disable-next-line
    async post(url:string, useCredentials: boolean, payload: AbstractApiData): Promise<AbstractApiData> {
      return await this.execute(url, 'POST', useCredentials, payload)
    }

    // eslint-disable-next-line
    async get(url:string, useCredentials: boolean): Promise<AbstractApiData> {
        return await this.execute(url, 'GET', useCredentials)
    }
}
