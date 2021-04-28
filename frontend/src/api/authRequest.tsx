import {IUserAuthApiResponse, IUserDetails} from '../actions/authActions'
import { HttpClient} from './HttpClient'
import {jwtDecode} from './TokenRefreshInstance'


export interface IAuthApiClient {
    register: (payload: IUserDetails) => Promise<IUserAuthApiResponse>
    login: (payload: IUserDetails) => Promise<IUserAuthApiResponse>
}

export class AuthApiClient extends HttpClient implements IAuthApiClient {
    
      async register(payload: IUserDetails): Promise<IUserAuthApiResponse> {
        return await this.post('sign-up', true, payload) as IUserAuthApiResponse
  }

      async login(payload: IUserDetails): Promise<IUserAuthApiResponse>{
        const response = await this.post('token', true, payload) as IUserAuthApiResponse
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const wholeToken: any  = jwtDecode(response.access)
        response.id = wholeToken.payload.user_id
        return response
    }
}