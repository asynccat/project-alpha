import { IHttpClient} from './HttpClient'
import { IUserPreferencesResponse, IUpdateNicknameActionPayload, 
  IUpdatePasswordActionPayload,
  IUpdatePasswordActionPayloadSnakeCase, IUpdateEmailActionCamelizedPayload, IUpdateEmailActionDecamelizedPayload, 
  IUpdateAvatarActionPayload } 
  from '../actions/prefAndProfileActions'
  import { IUserNotificationDecamelizedResponse, IUserNotificationResponse } from '../actions/notificationActions'

export interface IUserPreferenceOperateData {
  fetchUserPreferences: () => Promise<IUserPreferencesResponse>
  updateNickname: (payload: IUpdateNicknameActionPayload) => Promise<INicknameUpdateResponse>
  updatePassword: (payload: IUpdatePasswordActionPayload) => Promise<IUpdateResponseStatus>
  updateEmail: (payload:  IUpdateEmailActionCamelizedPayload | IUpdateEmailActionDecamelizedPayload) => 
    Promise<IEmailUpdateResponse>
  changeUserNotification: (payload: IUserNotificationDecamelizedResponse | IUserNotificationResponse ) => 
  Promise<IUserNotificationDecamelizedResponse>
  uploadNewAvatar: (payload: IUpdateAvatarActionPayload) => Promise<IUpdateAvatarResponse>
}

interface INicknameUpdateResponse {
  nickname: string
}

interface IUpdateResponseStatus {
  status: string
}

interface IUpdateAvatarResponse extends IUpdateResponseStatus {
  uploaded_avatar_url: string
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

    async uploadNewAvatar(payload: IUpdateAvatarActionPayload): Promise<IUpdateAvatarResponse> {
      const data = new FormData()
      data.append('avatar', payload.avatarBlob)
      return await this.client.postFile('preferences/profile_image', data)
    }
}