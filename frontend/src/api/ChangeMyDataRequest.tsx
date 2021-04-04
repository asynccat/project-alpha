import { HttpClient} from './HttpClient'
import {IMyData, IChangeMyData} from '../actions/prefAndProfileActions'

export class ChangeMyDataRequest extends HttpClient implements IChangeMyData {
      async saveData(payload: IMyData): Promise<IMyData> {
        return await this.post('preferences', payload) as IMyData
  }
}
