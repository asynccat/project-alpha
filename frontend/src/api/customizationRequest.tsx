import { IHttpClient} from './HttpClient'
import { IUserCustomizationResponse } from '../actions/customizationActions'

export interface IUserCustomizationReq {
  changeUserCustomization: (payload: IUserCustomizationResponse) => Promise<IUserCustomizationResponse>
}

export class CustomizationRequest implements IUserCustomizationReq {
  private client: IHttpClient

  constructor(client: IHttpClient) {
    this.client = client
  }

    async changeUserCustomization(payload: IUserCustomizationResponse): Promise<IUserCustomizationResponse> {
      return await this.client.patch('preferences', payload)
    }
}