  
import {IUserAuthApiResponse, IUserDetails} from '../actions/authActions'
import { HttpClient} from './HttpClient'


export interface IAuthApiClient {
    register: (payload: IUserDetails) => Promise<IUserAuthApiResponse>
    login: (payload: IUserDetails) => Promise<IUserAuthApiResponse>
}


export class AuthApiClient extends HttpClient implements IAuthApiClient {
      async register(payload: IUserDetails): Promise<IUserAuthApiResponse> {
        return await this.post('sign-up', payload) as IUserAuthApiResponse
  }

      async login(payload: IUserDetails): Promise<IUserAuthApiResponse>{
        return await this.post('token', payload) as IUserAuthApiResponse
    }
}