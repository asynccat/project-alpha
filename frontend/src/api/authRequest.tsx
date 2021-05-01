import {IUserAuthApiResponse, IUserDetails} from '../actions/authActions'
import { HttpClient, changedHttpRequestOptions} from './HttpClient'


export interface IAuthApiClient {
    register: (payload: IUserDetails) => Promise<IUserAuthApiRegisterResponse>
    login: (payload: IUserDetails) => Promise<IUserAuthApiLoginResponse>
    postRefresh: (payload: ITokenSendType) => Promise<ITokenRefreshType>
}

export class AuthApiClient extends HttpClient implements IAuthApiClient {
    
      async register(payload: IUserDetails): 
      Promise<IUserAuthApiResponse> {
        return await this.post('sign-up', changedHttpRequestOptions, payload) as IUserAuthApiResponse
  }

      async login(payload: IUserDetails): Promise<IUserAuthApiResponse>{
        const response = await this.post('token', changedHttpRequestOptions, payload) as IUserAuthApiResponse
        response.id = 100500
        // TODO: remove when id will be returning from server
        return response
    }
}