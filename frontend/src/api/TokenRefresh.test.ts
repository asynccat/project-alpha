import {AuthApiClient} from './authRequest'

describe('use of TokenRefreshInstance', () => {
  afterEach(() => {
    jest.resetModules()  // reset modules after each test
  })


  it('test usage of postRefresh method of TokenRefresh class', () => {
    const authApiClient = new AuthApiClient()
    const spy = jest.spyOn(authApiClient, 'postRefresh')
    authApiClient.postRefresh({ refresh: '12345'})

    expect(spy).toHaveBeenCalled()
    expect(authApiClient.postRefresh).toHaveBeenCalled()
    spy.mockRestore()
  })
})
