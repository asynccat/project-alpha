import {HttpClient, IHttpRequestOptions, defaultHttpRequestOptions, AbstractApiData } from './HttpClient'

const fakeEmailResponse = {
  email: 'helloiInterceptor@test.com'
}

export class HttpClientWithInterceptors extends HttpClient {
  protected execute (url:string, method: string, payload?: AbstractApiData, 
    options: IHttpRequestOptions = defaultHttpRequestOptions) : Promise<AbstractApiData> {
      if (url === 'change_email') {
        return Promise.resolve(fakeEmailResponse)
      }
      return super.execute(url, method, payload, options)
    }
}