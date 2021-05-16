import {operateUserDataRequest } from './HttpClientInstance'
import { OperateUserData } from './operatePreferenceData'

describe('use of OperateUserData client', () => {
  afterEach(() => {
    jest.resetModules()  // reset modules after each test
  })

  it('OperateUserData is truthy', () => {
    expect(operateUserDataRequest).toBeTruthy()
  })

  it('test one', () => {
    // eslint-disable-next-line max-nested-callbacks
    OperateUserData.prototype.getPreferenceData = jest.fn().mockImplementation(() => ({ nickname: 'kate' }))
    operateUserDataRequest.getPreferenceData() 
  })

})