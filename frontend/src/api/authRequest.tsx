import { IUserDetails } from '../actions/authActions'
import {config} from '../config'

const baseURL = `${config.baseUrl}${config.apiV1}`

export function authRequest(url: string, method: string, payload: IUserDetails): Promise<Response> {
    return fetch(`${baseURL}/${url}/`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    })
  }
