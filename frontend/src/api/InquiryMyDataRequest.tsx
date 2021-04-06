/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient} from './HttpClient'
import {IMyData } from '../actions/prefAndProfileActions'


export interface IInquiryMyData {
  getData: (headers: any) => Promise<IMyData>
}

export class InquiryMyDataRequest extends HttpClient implements IInquiryMyData {
      async getData(headers: any): Promise<IMyData> {
        return await this.get('preferences', headers) as IMyData
  }
}