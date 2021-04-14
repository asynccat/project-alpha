/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IHttpClient } from './HttpClient'
import {IMyData } from '../actions/prefAndProfileActions'

export interface IWorkWithMyData {
  getData: (useCredentials: boolean) => Promise<IMyData>
  saveData: (payload: IMyData, useCredentials: boolean) => Promise<IMyData>
}

export class WorkWithMyData implements IWorkWithMyData {
  private client: IHttpClient

  constructor(client: IHttpClient) {
    this.client = client
  }
  
    async getData(): Promise<IMyData> {
      return await this.client.get('preferences', false) as IMyData
      }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async saveData(payload: IMyData): Promise<IMyData> {
      return await this.client.post('preferences', false, payload) as IMyData
  }
}