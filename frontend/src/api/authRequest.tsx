/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {IUserAuthApiResponse, IUserDetails} from '../actions/authActions'
import { HttpClient} from './HttpClient'


export interface IAuthApiClient {
    register: (payload: IUserDetails) => Promise<IUserAuthApiResponse>
    login: (payload: IUserDetails) => Promise<IUserAuthApiResponse>
}

export class AuthApiClient extends HttpClient implements IAuthApiClient {
    
      async register(payload: IUserDetails): Promise<IUserAuthApiResponse> {
        return await this.post('sign-up', true, payload) as IUserAuthApiResponse
  }

      async login(payload: IUserDetails): Promise<IUserAuthApiResponse>{
        return await this.post('token', true, payload) as IUserAuthApiResponse
    }
}