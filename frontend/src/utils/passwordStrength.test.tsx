
import passwordStrength, { checkPasswordStrength,
  hasPasswordDigits, hasPasswordLowerCaseLetters, hasPasswordUpperCaseLetters} from './passwordStrength';

<<<<<<< HEAD
=======
/* testing checkPasswordStrength*/

>>>>>>> 7045beaf... adding functions for checking that password has lowerUpperCase letter & numbers, also unit tests
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

<<<<<<< HEAD
  test('returns false if password is not a string', () => {
    const wrongTypePassword = 12134; //подготавливаешь тестовые данные
    const result = passwordStrength(wrongTypePassword) // вызываешь свою функцию с тестовыми данными
    expect(result).toBe(false) //проверка результата утверждением
  })
  //второй тест допиши сам :)
=======
/* testing hasPasswordDigits*/
  
  test('returns true if password has digits', () => {
    const numbersInPassword = '12345'; //подготавливаешь тестовые данные
    const result = hasPasswordDigits(numbersInPassword) // вызываешь свою функцию с тестовыми данными
    expect(result).toBe(true) //проверка результата утверждением
  })
  test('returns false if password hasn`t digits', () => {
    const lettersInPassword = 'daslkgl'; //подготавливаешь тестовые данные
    const result = hasPasswordDigits(lettersInPassword) // вызываешь свою функцию с тестовыми данными
    expect(result).toBe(false) //проверка результата утверждением
  })

  /* testing hasPasswordLowerCaseLetters*/

  test('returns true if password has lowerCase letters', () => {
    const LowerCaseInPassword = 'abcdef'; //подготавливаешь тестовые данные
    const result = hasPasswordLowerCaseLetters(LowerCaseInPassword) // вызываешь свою функцию с тестовыми данными
    expect(result).toBe(true) //проверка результата утверждением
  })

  test('returns false if password hasn`t lowerCase letters', () => {
    const UpperCaseInPassword = 'ASGJASJNBTJ'; //подготавливаешь тестовые данные
    const result = hasPasswordLowerCaseLetters(UpperCaseInPassword) // вызываешь свою функцию с тестовыми данными
    expect(result).toBe(false) //проверка результата утверждением
  })

  /* testing hasPasswordLowerCaseLetters*/

  test('returns true if password has UpperCase letters', () => {
    const UpperCaseInPassword = 'SDAGHDHA!@!$'; //подготавливаешь тестовые данные
    const result = hasPasswordUpperCaseLetters(UpperCaseInPassword) // вызываешь свою функцию с тестовыми данными
    expect(result).toBe(true) //проверка результата утверждением
  })

  test('returns false if password hasn`t UpperCase letters', () => {
    const lowerCaseInPassword= '1sdgh12423'; //подготавливаешь тестовые данные
    const result = hasPasswordUpperCaseLetters(lowerCaseInPassword) // вызываешь свою функцию с тестовыми данными
    expect(result).toBe(false) //проверка результата утверждением
  })
>>>>>>> 7045beaf... adding functions for checking that password has lowerUpperCase letter & numbers, also unit tests
})
  

