import { IUserDetails} from '../actions/authActions'
import {config} from '../config'

const baseURL = config.baseUrl+config.apiV1
const token = localStorage.getItem('token')

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
Authorization: `Bearer ${token}`}

export class HttpClient {
    private async execute (url:string, payload: IUserDetails, method:string) {
        const response = await fetch(`${baseURL}/${url}/`, {
          method: method,
          headers: headers,
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
    async post(url:string, payload: any): Promise<any> {
      return await this.execute(url, payload, 'POST')
    }

    // eslint-disable-next-line
    protected async get(url:string, payload: any):Promise<any> {
        return await this.execute(url, payload, 'GET')
    }
}
