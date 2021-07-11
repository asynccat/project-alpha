import {HttpClient, changedHttpRequestOptions} from './HttpClient'
import {IUserDetails,
  IUserAuthApiRegisterResponse,
  IUserAuthApiLoginResponse,
  UserEmail,
  IMessageResponse}
 from '../actions/authActions'
import {ITokenSendType, ITokenRefreshType} from '../services/TokenRefresh'

export interface IAuthApiClient {
    register: (payload: IUserDetails) => Promise<IUserAuthApiRegisterResponse>
    login: (payload: IUserDetails) => Promise<IUserAuthApiLoginResponse>
    postRefresh: (payload: ITokenSendType) => Promise<ITokenRefreshType>
    recover: (payload: UserEmail) => Promise<IMessageResponse>
}

export class AuthApiClient extends HttpClient implements IAuthApiClient {
    
  async register(payload: IUserDetails): Promise<IUserAuthApiRegisterResponse> {
    return await this.post('sign-up', payload, changedHttpRequestOptions, ) as IUserAuthApiRegisterResponse
  }

  async login(payload: IUserDetails): Promise<IUserAuthApiLoginResponse>{
    return await this.post('token', payload, changedHttpRequestOptions) as IUserAuthApiLoginResponse
  }

  async postRefresh(payload: ITokenSendType): Promise<ITokenRefreshType> {
    return await this.post('token/refresh', payload, changedHttpRequestOptions) as ITokenRefreshType
  }

  async recover(payload: UserEmail): Promise<IMessageResponse> {
    return await this.post('recover', payload, changedHttpRequestOptions) as IMessageResponse
  }
}