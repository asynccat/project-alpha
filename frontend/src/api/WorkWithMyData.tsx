import { IHttpClient } from './HttpClient'
import {IGetMyData, ISendData, IReceiveDataAfterChange } from '../actions/prefAndProfileActions'

export interface IWorkWithMyData {
  getData: (useCredentials: boolean) => Promise<IGetMyData>
  saveData: (payload: ISendData, useCredentials: boolean) => Promise<IReceiveDataAfterChange>
}

export class WorkWithMyData implements IWorkWithMyData {
  private client: IHttpClient

  constructor(client: IHttpClient) {
    this.client = client
  }
  
    async getData(): Promise<IGetMyData> {
      return await this.client.get('preferences', false) as IGetMyData
      }

    async saveData(payload: ISendData): Promise<IReceiveDataAfterChange> {
      // eslint-disable-next-line prefer-destructuring
      const oldNick = payload.oldNick
      return await this.client.put(`user/${oldNick}/nickname/update`, false, payload) as IReceiveDataAfterChange
  }

}