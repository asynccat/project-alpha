/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {IUserAuthApiResponse, IUserDetails} from '../actions/authActions'
import { HttpClient} from './HttpClient'


export interface IAuthApiClient {
    register: (payload: IUserDetails, headers: any) => Promise<IUserAuthApiResponse>
    login: (payload: IUserDetails, headers: any) => Promise<IUserAuthApiResponse>
}

export class AuthApiClient extends HttpClient implements IAuthApiClient {
    
      async register(payload: IUserDetails, headers: any): Promise<IUserAuthApiResponse> {
        return await this.post('sign-up', payload, headers) as IUserAuthApiResponse
  }

      async login(payload: IUserDetails, headers: any): Promise<IUserAuthApiResponse>{
        return await this.post('token', payload, headers) as IUserAuthApiResponse
    }
}