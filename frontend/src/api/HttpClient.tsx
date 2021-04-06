import { IUserDetails} from '../actions/authActions'
import {config} from '../config'

const baseURL = config.baseUrl+config.apiV1

export class HttpClient {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private async execute (url:string, method:string, header: any, payload?: IUserDetails) {
    
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
    /*
    * We're using Promise<any> here, to avoid extra code
    * for casting from 'unknown' to required type.
    * */

    // eslint-disable-next-line
    async post(url:string, payload: any, header: any): Promise<any> {
      return await this.execute(url, 'POST', header, payload)
    }

    // eslint-disable-next-line
    protected async get(url:string, header: any):Promise<any> {
        return await this.execute(url, 'GET', header)
    }
}
