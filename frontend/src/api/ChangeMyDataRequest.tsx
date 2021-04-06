/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { HttpClient} from './HttpClient'
import {IMyData } from '../actions/prefAndProfileActions'

export interface IChangeMyData {
  saveData: (payload: IMyData, headers: any) => Promise<IMyData>
}

export class ChangeMyDataRequest extends HttpClient implements IChangeMyData {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      async saveData(payload: IMyData, headers: any): Promise<IMyData> {
        return await this.post('preferences', payload, headers) as IMyData
  }
}
