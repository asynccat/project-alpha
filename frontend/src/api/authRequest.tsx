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
        const response = await this.post('token', true, payload) as IUserAuthApiResponse
        response.id = 100500
        // TODO: remove when id will be returning from server
        return response
    }
}