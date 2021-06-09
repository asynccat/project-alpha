import { IHttpClient} from './HttpClient'
import { IUserCustomizationResponse } from '../actions/customizationActions'

export interface IUserCustomizationReq {
  fetchUserCustomization: () => Promise<IUserCustomizationResponse>
  changeUserCustomization: (payload: IUserCustomizationResponse) => Promise<IUserCustomizationResponse>
}

export class CustomizationRequest implements IUserCustomizationReq {
  private client: IHttpClient

  constructor(client: IHttpClient) {
    this.client = client
  }
  
    async fetchUserCustomization(): Promise<IUserCustomizationResponse> {
      return await this.client.get('hello') as IUserCustomizationResponse
    }

    async changeUserCustomization(payload: IUserCustomizationResponse): Promise<IUserCustomizationResponse> {
      return await this.client.post('hello', payload)
    }
}