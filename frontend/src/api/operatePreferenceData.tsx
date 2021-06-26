import { IHttpClient} from './HttpClient'
import { IUserPreferencesResponse, IUpdateNicknameActionPayload, 
  IUpdatePasswordActionPayload,
  IUpdatePasswordActionPayloadSnakeCase, IUpdateEmailActionCamelizedPayload, IUpdateEmailActionDecamelizedPayload } 
  from '../actions/prefAndProfileActions'
import { IUserNotificationDecamelizedResponse, IUserNotificationResponse } from '../actions/notificationActions'

export interface IUserPreferenceOperateData {
  fetchUserPreferences: () => Promise<IUserPreferencesResponse>
  updateNickname: (payload: IUpdateNicknameActionPayload) => Promise<INicknameUpdateResponse>
  updatePassword: (payload: IUpdatePasswordActionPayload) => Promise<IPasswordUpdateResponse>
  updateEmail: (payload: IUpdateEmailActionCamelizedPayload | IUpdateEmailActionDecamelizedPayload ) => 
    Promise<IEmailUpdateResponse>
  changeUserNotification: (payload: IUserNotificationDecamelizedResponse | IUserNotificationResponse ) => 
    Promise<IUserNotificationDecamelizedResponse>
}

interface INicknameUpdateResponse {
  nickname: string
}

interface INewAvatar {
  file: string
}

interface IUpdateResponseStatus {
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
      Promise<IUpdateResponseStatus > {
      return await this.client.post('change_password', payload) 
    }

    async updateEmail(payload: IUpdateEmailActionCamelizedPayload | IUpdateEmailActionDecamelizedPayload ): 
      Promise<IEmailUpdateResponse  > {
      return await this.client.post('user/change_email', payload) 
    }

    async changeUserNotification(payload: IUserNotificationDecamelizedResponse | IUserNotificationResponse): 
      Promise<IUserNotificationDecamelizedResponse> {
      return await this.client.patch('preferences', payload)
    }

    async uploadNewAvatar(payload: INewAvatar): 
    Promise<IUpdateResponseStatus> {
    return await this.client.patch('preferences', payload)
  }
}