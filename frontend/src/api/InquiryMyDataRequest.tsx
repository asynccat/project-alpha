import { HttpClient} from './HttpClient'
import {IMyData, IInquiryMyData} from '../actions/prefAndProfileActions'

export class InquiryMyDataRequest extends HttpClient implements IInquiryMyData {
      async getData(): Promise<IMyData> {
        return await this.get('preferences') as IMyData
  }
}