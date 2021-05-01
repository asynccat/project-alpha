import {TokenStorage} from './TokenStorage'

describe('operate with token from Token.Storage', () => {
    it('return null if no token in Storage', () => {
      const tokenStorage = new TokenStorage()
      const token = tokenStorage.getToken()
      expect(token).toBe(null)  

    })

    it('save Token', () => {
        const tokenStorage = new TokenStorage()
        tokenStorage.saveToken('12345')
        const token = tokenStorage.getToken()
        expect(token).toBe('12345') 
        tokenStorage.removeToken() 
      })
  })
  