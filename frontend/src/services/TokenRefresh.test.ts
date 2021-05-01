import { jwtDecode } from './TokenRefresh'


describe('decoding tokens', () => {
  beforeEach(() => {
    jest.resetModules()  // reset modules after each test
  })
  it('jwtDecode can decode token and that expiration time is a number', () => {
    // except this rule as token line is very long and can`t be on two separate lines
    // eslint-disable-next-line max-len
    const decoded = jwtDecode('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjE5ODU0Njg5LCJqdGkiOiI2MjRjMzJhNmU4NWE0ZjZkYTdjY2RkMjg2ZGQwZTgxZSIsInVzZXJfaWQiOjF9.MesYyIswMt5S0T2GeYPWIPCT_sJMEU00Q83QR2qMi44')
    expect(decoded).toBeTruthy()
    expect(decoded.payload.exp).not.toBeNaN()
  })
})
