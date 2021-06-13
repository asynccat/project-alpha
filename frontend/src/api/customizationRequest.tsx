import { IHttpClient} from './HttpClient'
import { IUserCustomizationDecamelizedResponse } from '../actions/customizationActions'

export interface IUserCustomizationReq {
  changeUserCustomization: (payload: IUserCustomizationDecamelizedResponse ) => 
    Promise<IUserCustomizationDecamelizedResponse  >
}

export class CustomizationRequest implements IUserCustomizationReq {
  private client: IHttpClient

  constructor(client: IHttpClient) {
    this.client = client
  }

    async changeUserCustomization(payload: IUserCustomizationDecamelizedResponse): 
      Promise<IUserCustomizationDecamelizedResponse > {
      return await this.client.patch('preferences', payload)
    }
}