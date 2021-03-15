import {Dispatch} from 'redux'

import { IUserDetails, fetchUserAction} from '../actions/authActions'
import {config} from '../config'

const baseURL = `${config.baseUrl}${config.apiV1}`

export interface IAuthApiClient {
    register: (payload: IUserDetails,  dispatch:Dispatch<fetchUserAction>) => Promise<void>
    login: (userData: IUserDetails,  dispatch:Dispatch<fetchUserAction>) => Promise<void>
  }

export class HttpClient {
    private async execute (url:string, payload: IUserDetails, method:string) {
        return await fetch(`${baseURL}/${url}/`, {
          method: method,
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(payload),
        })
    }

    protected async post(url:string, payload: IUserDetails):Promise<Response> {
      const response = await this.execute(url, payload, 'POST')
      return await response.json()
    }

    protected async get(url:string, payload: IUserDetails):Promise<Response> {
        const response = await this.execute(url, payload, 'GET')
        return await response.json()
    }
}
