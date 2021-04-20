import {workWithMyDataRequest } from './HttpClientInstance'
import {WorkWithMyData} from './WorkWithMyData'

describe('use of WorkWithMyData client', () => {
  afterEach(() => {
    jest.resetModules()  // reset modules after each test
  })

  it('WorkWithMyData is truthy', () => {
    expect(workWithMyDataRequest).toBeTruthy()
  })

  it('test one', () => {
    // eslint-disable-next-line max-nested-callbacks
    WorkWithMyData.prototype.getData = jest.fn().mockImplementation(() => ({ nickname: 'kate' }))
    workWithMyDataRequest.getData() 
  })

})