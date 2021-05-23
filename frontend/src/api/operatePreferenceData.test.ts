import {operateUserDataRequest } from './HttpClientInstance'
import { OperateUserData } from './operatePreferenceData'

describe('use of OperateUserData client', () => {
  afterEach(() => {
    jest.resetModules()  // reset modules after each test
  })

  it('OperateUserData is truthy', () => {
    expect(operateUserDataRequest).toBeTruthy()
  })

  it('test fetch user information', () => {
    // eslint-disable-next-line max-nested-callbacks
    OperateUserData.prototype.fetchUserPreferences = jest.fn().mockImplementation(() => ({ nickname: 'kate' }))
    operateUserDataRequest.fetchUserPreferences()
  })
})

describe ('use of updateNickname method', () => {
  it('test usage of updateNickname method of OperateUserData class', () => {
    const spy = jest.spyOn(operateUserDataRequest, 'updateNickname')
    operateUserDataRequest.updateNickname({ oldNickname: '1234', nickname: '12345'})
  
    expect(spy).toHaveBeenCalled()
    expect(operateUserDataRequest.updateNickname).toHaveBeenCalled()
    spy.mockRestore()
  })
})