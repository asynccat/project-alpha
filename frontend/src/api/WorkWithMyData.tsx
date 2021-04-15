import { IHttpClient } from './HttpClient'
import {IMyData, ISendData } from '../actions/prefAndProfileActions'

export interface IWorkWithMyData {
  getData: (useCredentials: boolean) => Promise<IMyData>
  saveData: (payload: ISendData, useCredentials: boolean) => Promise<IMyData>
}

export class WorkWithMyData implements IWorkWithMyData {
  private client: IHttpClient

  constructor(client: IHttpClient) {
    this.client = client
  }
  
    async getData(): Promise<IMyData> {
      return await this.client.get('preferences', false) as IMyData
      }

    async saveData(payload: ISendData): Promise<IMyData> {
      return await this.client.post('preferences', false, payload) as IMyData
  }
}