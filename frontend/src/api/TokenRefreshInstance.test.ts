import {TokenRefresh} from './TokenRefreshInstance'

describe('use of TokenRefreshInstance', () => {
  afterEach(() => {
    jest.resetModules()  // reset modules after each test
  })

  it('TokenRefreshInstance is truthy', () => {
    const tokenRefresh = new TokenRefresh()
    expect(tokenRefresh).toBeTruthy()
  })

  it('test one', () => {
    const tokenRefresh = new TokenRefresh()
    // eslint-disable-next-line max-nested-callbacks
    TokenRefresh.prototype.postRefresh = jest.fn().mockImplementation(() => ({ refresh: '12345' }))
    tokenRefresh.postRefresh({ refresh: '12345'}) 
  })
})