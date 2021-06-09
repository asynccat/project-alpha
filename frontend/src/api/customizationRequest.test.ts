import {customizationRequest} from './HttpClientInstance'
import {CustomizationRequest} from './customizationRequest'

describe('use of CustomizationRequest client', () => {
  afterEach(() => {
    jest.resetModules()  // reset modules after each test
  })

  it('CustomizationRequest is truthy', () => {
    expect(customizationRequest).toBeTruthy()
  })

  it('test fetch user customization', () => {
    // eslint-disable-next-line max-nested-callbacks
    CustomizationRequest.prototype.fetchUserCustomization = jest.fn().mockImplementation(() => ({ emailNews: true }))
    customizationRequest.fetchUserCustomization()
  })
})

describe ('test use of post user customization', () => {
  it('test usage of postcustomization method of CustomizeRequest class', () => {
    const spy = jest.spyOn(customizationRequest, 'changeUserCustomization')
    customizationRequest.changeUserCustomization({ emailNews: true, emailThreads: true, emailMyReviews: true, 
      aboutMe: '55', timeZone: 'GMT', emailQuestReviews: true, emailMessages: true })
  
    expect(spy).toHaveBeenCalled()
    expect(customizationRequest.changeUserCustomization).toHaveBeenCalled()
    spy.mockRestore()
  })
})