import {operateUserDataRequest } from './HttpClientInstance'
import { OperateUserData } from './operatePreferenceData'

describe('use of OperateUserData client', () => {
  afterEach(() => {
    jest.resetModules()  // reset modules after each test
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
  describe ('test use of post user customization', () => {
    it('test usage of postcustomization method of CustomizeRequest class', () => {
      const changeUserNotificationSpy = jest.spyOn(operateUserDataRequest, 'changeUserNotification')
      operateUserDataRequest.changeUserNotification({ sendEmailsWithNews: true, sendUpdatesThreads: true, 
        sendUserReviews: true, 
        aboutUser: '55', timezone: 'GMT', sendUserQuestsReviews: true, sendUpdatesMessages: true })
    
      expect(changeUserNotificationSpy).toHaveBeenCalled()
      expect(operateUserDataRequest.changeUserNotification).toHaveBeenCalled()
      changeUserNotificationSpy.mockRestore()
    })
  })
})

export type FormData = {
  avatar: string
}

describe ('test use of change avatar', () => {
  it('test usage of upload new avatar method of OperateUserData class', () => {
    const data = new FormData()
    data.append('avatar', 'hello.png')
    
    const avatarUploadSpy = jest.spyOn(operateUserDataRequest, 'uploadNewAvatar')
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
    operateUserDataRequest.uploadNewAvatar(data)
  
    expect(avatarUploadSpy).toHaveBeenCalled()
    expect(operateUserDataRequest.uploadNewAvatar).toHaveBeenCalled()
    avatarUploadSpy.mockRestore()
  })
})