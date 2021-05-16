import { IHttpClient , defaultHttpRequestOptions} from './HttpClient'
import { IUserPreferenceGetData, IUserPreferenceSendData, 
  IUserPreferenceReceiveDataAfterChange } from '../actions/prefAndProfileActions'

export interface IUserPreferenceOperateData {
  getPreferenceData: () => Promise<IUserPreferenceGetData>
  savePreferenceData: (payload: IUserPreferenceSendData) => Promise<IUserPreferenceReceiveDataAfterChange>
}

export class OperateUserData implements IUserPreferenceOperateData {
  private client: IHttpClient

  constructor(client: IHttpClient) {
    this.client = client
  }
  
    async getPreferenceData(): Promise<IUserPreferenceGetData> {
      return await this.client.get('preferences', defaultHttpRequestOptions) as IUserPreferenceGetData
      }

    async savePreferenceData(payload: IUserPreferenceSendData): Promise<IUserPreferenceReceiveDataAfterChange> {
      const {oldNickname} = payload
      return await this.client.put(`user/${oldNickname}/nickname/update`, 
      defaultHttpRequestOptions, payload) as IUserPreferenceReceiveDataAfterChange
  }
}