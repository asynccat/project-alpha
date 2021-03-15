/* eslint-disable max-classes-per-file */
import {Dispatch} from 'redux'

import { IUserDetails, fetchUserAction, setUserAction} from '../actions/authActions'
import {config} from '../config'

const baseURL = `${config.baseUrl}${config.apiV1}`

  export interface IAuthApiClient {
    register: (payload: IUserDetails,  dispatch:Dispatch<fetchUserAction>) => Promise<void>
    login: (userData: IUserDetails,  dispatch:Dispatch<fetchUserAction>) => Promise<void>
  }

  export class HttpClient {
    protected async post(url:string, payload: IUserDetails):Promise<void> {
      const response = await fetch(`${baseURL}/${url}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      })
      const result = await response.json()
      return result
    }

  protected async get(url:string, payload: IUserDetails):Promise<Response> {
    const response = await fetch(`${baseURL}/${url}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    })
    const result = await response.json()
    return result
  }
}

  export class AuthApiClient extends HttpClient implements IAuthApiClient {
      register(payload: IUserDetails, dispatch:Dispatch<fetchUserAction>): Promise<void> {
        const result = this.post('sign-up', payload)
        localStorage.setItem('token', result.token)
        dispatch(setUserAction(result.user))
    }

      login(payload: IUserDetails, dispatch:Dispatch<fetchUserAction>): Promise<void>{
        const result = this.post('token', payload)
        localStorage.setItem('token', result.token)
        dispatch(setUserAction(result.user))
    }
  }
