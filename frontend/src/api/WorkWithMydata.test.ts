import {HttpClient} from './HttpClient'
import {WorkWithMyData} from './WorkWithMyData'

jest.mock('./HttpClient')
const httpClient = new HttpClient()

describe('use of WorkWithMyData client', () => {
  beforeEach(() => {
    HttpClient.mockClear()
  })

  it('WorkWithMyData should be able to call new() on HttpClient', () => {
    const workWithMyData = new WorkWithMyData(httpClient)
    expect(workWithMyData).toBeTruthy()
  })

})