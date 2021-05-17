import { IHttpClient , defaultHttpRequestOptions} from './HttpClient'
import { IUserPreferencesResponse, IUpdateNicknameActionPayload } from '../actions/prefAndProfileActions'

export interface IUserPreferenceOperateData {
  fetchUserPreferences: () => Promise<IUserPreferencesResponse>
  updateNickname: (payload: IUpdateNicknameActionPayload) => Promise<INicknameUpdateResponse>
}

interface INicknameUpdateResponse {
  nickname: string
}

export class OperateUserData implements IUserPreferenceOperateData {
  private client: IHttpClient

  constructor(client: IHttpClient) {
    this.client = client
  }
  
    async fetchUserPreferences(): Promise<IUserPreferencesResponse> {
      return await this.client.get('preferences', defaultHttpRequestOptions) as IUserPreferencesResponse
      }

    async updateNickname(payload: IUpdateNicknameActionPayload): Promise<INicknameUpdateResponse> {
      const {oldNickname} = payload
      return await this.client.put(`user/${oldNickname}/nickname/update`, 
      defaultHttpRequestOptions, payload) as INicknameUpdateResponse
  }
}