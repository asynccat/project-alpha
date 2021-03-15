import { IUserDetails} from '../actions/authActions'
import {config} from '../config'

const baseURL = config.baseUrl

export class HttpClient {
    private async execute (url:string, payload: IUserDetails, method:string) {
        const response = await fetch(`${baseURL}/${url}/`, {
          method: method,
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(payload),
        })
        return await response.json()
    }
    /*
    * We're using Promise<any> here, to avoid extra code
    * for casting from 'unknown' to required type.
    * */

    // eslint-disable-next-line
    protected async post(url:string, payload: IUserDetails): Promise<any> {
      return await this.execute(url, payload, 'POST')
    }

    // eslint-disable-next-line
    protected async get(url:string, payload: IUserDetails):Promise<any> {
        return await this.execute(url, payload, 'GET')
    }
}
