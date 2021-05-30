
import passwordStrength from './passwordStrength'

describe('Password strength', () => {
  test('returns true if password length is greater than 6', () => {
    const longPassword = '1234567' //подготавливаешь тестовые данные
    const result = passwordStrength(longPassword) // вызываешь свою функцию с тестовыми данными
    expect(result).toBe(true) //проверка результата утверждением
  })

  test('returns false if password length is less than 6', () => {
    const shortPassword = 'ldfk' //подготавливаешь тестовые данные
    const result = passwordStrength(shortPassword) // вызываешь свою функцию с тестовыми данными
    expect(result).toBe(false) //проверка результата утверждением
  })

  test('returns false if password is not a string', () => {
    const wrongTypePassword = 12134; //подготавливаешь тестовые данные
    const result = passwordStrength(wrongTypePassword) // вызываешь свою функцию с тестовыми данными
    expect(result).toBe(false) //проверка результата утверждением
  })
  //второй тест допиши сам :)
})
  

