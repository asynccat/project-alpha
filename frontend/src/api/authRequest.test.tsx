/* eslint-disable max-nested-callbacks */
import {AuthApiClient} from './authRequest'
// import '@types/jest'

describe('AuthApiClient', () => {
  test('make a login request', async () => {
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
    const authClient = new AuthApiClient()
    const json = await authClient.login('token', payload)

    expect(json).toMatchObject(expected)
    expect(window.fetch).toHaveBeenCalledTimes(1)
    expect(json).toMatchObject(expected)
  })
})



