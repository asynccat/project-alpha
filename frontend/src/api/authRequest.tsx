import { HttpClient, changedHttpRequestOptions} from './HttpClient'
import {IUserDetails, IUserAuthApiRegisterResponse, IUserAuthApiLoginResponse}
 from '../actions/authActions'
import {ITokenSendType, ITokenRefreshType} from '../services/TokenRefresh'

export interface IAuthApiClient {
    register: (payload: IUserDetails) => Promise<IUserAuthApiRegisterResponse>
    login: (payload: IUserDetails) => Promise<IUserAuthApiLoginResponse>
    postRefresh: (payload: ITokenSendType) => Promise<ITokenRefreshType>
}

export class AuthApiClient extends HttpClient implements IAuthApiClient {
    
      async register(payload: IUserDetails): 
      Promise<IUserAuthApiRegisterResponse> {
        return await this.post('sign-up', changedHttpRequestOptions, payload) as IUserAuthApiRegisterResponse
  }

      async login(payload: IUserDetails): Promise<IUserAuthApiLoginResponse>{
        const response = await this.post('token', changedHttpRequestOptions, payload) as IUserAuthApiLoginResponse
        response.id = 100500
        // TODO: remove when id will be returning from server
        return response
    }

    async postRefresh(payload: ITokenSendType): Promise<ITokenRefreshType> {
        return await this.post('token/refresh', changedHttpRequestOptions, payload) as ITokenRefreshType
    }
}