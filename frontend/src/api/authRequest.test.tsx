/* eslint-disable max-nested-callbacks */
import {AuthApiClient} from './authRequest'
import { HttpClient } from './HttpClient'

jest.mock('./HttpClient')

describe('use of AuthApiClient', () => {

  beforeEach(() => {
    HttpClient.mockClear()
  })
  
  it('We can check if authClient called the class constructor', () => {
    new AuthApiClient()
    expect(HttpClient).toHaveBeenCalledTimes(1)
  })

  it('AuthClent should be able to call new() on HttpClient', () => {
    const authClient = new AuthApiClient()
    expect(authClient).toBeTruthy()
  })

})

describe('use of TokenRefresh', () => {
  afterEach(() => {
    jest.resetModules()  // reset modules after each test
  })


  it('test usage of postRefresh method of AuthApiClient class', () => {
    const authApiClient = new AuthApiClient()
    const spy = jest.spyOn(authApiClient, 'postRefresh')
    authApiClient.postRefresh({ refresh: '12345'})

    expect(spy).toHaveBeenCalled()
    expect(authApiClient.postRefresh).toHaveBeenCalled()
    spy.mockRestore()
  })
})




