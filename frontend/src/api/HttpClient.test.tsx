/* eslint-disable max-nested-callbacks */
import { HttpClient } from './HttpClient'
// import '@types/jest'

describe('httpClient', () => {
    test('make an api call', async () => {
      const expected = [
        { email: 'test@example.com', password: '123456' }
      ]
  
      jest.spyOn(window, 'fetch').mockImplementation(() => {
        const fetchResponse = {
          ok: true,
          json: () => Promise.resolve(expected)
        }
        return Promise.resolve(fetchResponse)
      })
  
      const payload = {email: 'test@example.com', password: '123456'}
      const httpClient = new HttpClient()
      const json = await httpClient.post('sign-up', payload)
  
      expect(json).toMatchObject(expected)
      expect(window.fetch).toHaveBeenCalledTimes(1)
      expect(json).toMatchObject(expected)
    })
  })