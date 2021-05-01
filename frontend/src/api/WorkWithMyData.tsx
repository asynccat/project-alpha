import { IHttpClient , defaultHttpRequestOptions} from './HttpClient'
import {IGetMyData, ISendData, IReceiveDataAfterChange } from '../actions/prefAndProfileActions'

export interface IWorkWithMyData {
  getData: () => Promise<IGetMyData>
  saveData: (payload: ISendData) => Promise<IReceiveDataAfterChange>
}

export class WorkWithMyData implements IWorkWithMyData {
  private client: IHttpClient

  constructor(client: IHttpClient) {
    this.client = client
  }
  
    async getData(): Promise<IGetMyData> {
      return await this.client.get('preferences', defaultHttpRequestOptions) as IGetMyData
      }

    async saveData(payload: ISendData): Promise<IReceiveDataAfterChange> {
      const {oldNickname} = payload
      return await this.client.put(`user/${oldNickname}/nickname/update`, 
      defaultHttpRequestOptions, payload) as IReceiveDataAfterChange
  }
}