import { IHttpClient} from './HttpClient'
import { IUserPreferencesResponse, IUpdateNicknameActionPayload, 
  IUpdatePasswordActionPayload,
  IUpdatePasswordActionPayloadSnakeCase, IUpdateEmailActionPayload } from '../actions/prefAndProfileActions'

export interface IUserPreferenceOperateData {
  fetchUserPreferences: () => Promise<IUserPreferencesResponse>
  updateNickname: (payload: IUpdateNicknameActionPayload) => Promise<INicknameUpdateResponse>
  updatePassword: (payload: IUpdatePasswordActionPayload) => Promise<IPasswordUpdateResponse >
  updateEmail: (payload: IUpdateEmailActionPayload) => Promise<IEmailUpdateResponse >
}

interface INicknameUpdateResponse {
  nickname: string
}

interface IPasswordUpdateResponse {
  status: string
}

interface IEmailUpdateResponse {
  email: string
}

export class OperateUserData implements IUserPreferenceOperateData {
  private client: IHttpClient

  constructor(client: IHttpClient) {
    this.client = client
  }
  
    async fetchUserPreferences(): Promise<IUserPreferencesResponse> {
      return await this.client.get('preferences') as IUserPreferencesResponse
    }

    async updateNickname(payload: IUpdateNicknameActionPayload): Promise<INicknameUpdateResponse> {
      const {oldNickname} = payload
      const {nickname} = payload
      return await this.client.put(`user/${oldNickname}/nickname/update`, {nickname}) as INicknameUpdateResponse
    }
    
    async updatePassword(payload: IUpdatePasswordActionPayload | IUpdatePasswordActionPayloadSnakeCase): 
      Promise<IPasswordUpdateResponse > {
      return await this.client.post('change_password', payload) 
    }

    async updateEmail(payload: IUpdateEmailActionPayload): 
      Promise<IEmailUpdateResponse  > {
      return await this.client.post('change_email', payload) 
    }
}