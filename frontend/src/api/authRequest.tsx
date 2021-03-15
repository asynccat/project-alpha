import { IUserDetails} from '../actions/authActions'
import { HttpClient} from './HttpClient'


export interface IAuthApiClient {
    register: (payload: IUserDetails) => Promise<Response>
    login: (payload: IUserDetails) => Promise<Response>
}


export class AuthApiClient extends HttpClient implements IAuthApiClient {
      register(payload: IUserDetails): Promise<Response> {
        return this.post('sign-up', payload)
  }

      login(payload: IUserDetails): Promise<Response>{
        return this.post('token', payload)
    }
}
