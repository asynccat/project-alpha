import {IUserDetails, IUserAuthApiRegisterResponse, IUserAuthApiLoginResponse}
 from '../actions/authActions'
import { HttpClient} from './HttpClient'
import {ITokenSendType, ITokenRefreshType} from '../services/TokenRefresh'

export interface IAuthApiClient {
    register: (payload: IUserDetails) => Promise<IUserAuthApiRegisterResponse>
    login: (payload: IUserDetails) => Promise<IUserAuthApiLoginResponse>
    postRefresh: (payload: ITokenSendType) => Promise<ITokenRefreshType>
}

export class AuthApiClient extends HttpClient implements IAuthApiClient {
    
      async register(payload: IUserDetails): Promise<IUserAuthApiRegisterResponse> {
        return await this.post('sign-up',  true, payload) as IUserAuthApiRegisterResponse
  }

      async login(payload: IUserDetails): Promise<IUserAuthApiLoginResponse>{
        return await this.post('token', true, payload) as IUserAuthApiLoginResponse
    }

    async postRefresh(payload: ITokenSendType): Promise<ITokenRefreshType> {
        return await this.post('token/refresh', true, payload) as ITokenRefreshType
    }
}