
import passwordStrength, { checkPasswordStrength,
  hasPasswordDigits, hasPasswordLowerCaseLetters, hasPasswordUpperCaseLetters} from './passwordStrength';

describe('Password strength', () => {
  test('returns true if password length is greater than 6', () => {
    const longPassword = '1234567' 
    const result = passwordStrength(longPassword) 
    expect(result).toBe(true) 
  })

  test('returns false if password length is less than 6', () => {
    const shortPassword = 'ldfk' 
    const result = passwordStrength(shortPassword) 
    expect(result).toBe(false) 
  })


  test('returns false if password is not a string', () => {
    const wrongTypePassword = '12134';
    const result = passwordStrength(wrongTypePassword)
    expect(result).toBe(false) 
  })


/* testing hasPasswordDigits*/
  
  test('returns true if password has digits', () => {
    const numbersInPassword = '12345'; 
    const result = hasPasswordDigits(numbersInPassword) 
    expect(result).toBe(true) 
  })
  test('returns false if password hasn`t digits', () => {
    const lettersInPassword = 'daslkgl'; 
    const result = hasPasswordDigits(lettersInPassword) 
    expect(result).toBe(false) 
  })

  /* testing hasPasswordLowerCaseLetters*/

  test('returns true if password has lowerCase letters', () => {
    const LowerCaseInPassword = 'abcdef'; 
    const result = hasPasswordLowerCaseLetters(LowerCaseInPassword) 
    expect(result).toBe(true) 
  })

  test('returns false if password hasn`t lowerCase letters', () => {
    const UpperCaseInPassword = 'ASGJASJNBTJ'; 
    const result = hasPasswordLowerCaseLetters(UpperCaseInPassword) 
    expect(result).toBe(false)
  })

  /* testing hasPasswordLowerCaseLetters*/

  test('returns true if password has UpperCase letters', () => {
    const UpperCaseInPassword = 'SDAGHDHA!@!$'; 
    const result = hasPasswordUpperCaseLetters(UpperCaseInPassword) 
    expect(result).toBe(true) 
  })

  test('returns false if password hasn`t UpperCase letters', () => {
    const lowerCaseInPassword= '1sdgh12423'; 
    const result = hasPasswordUpperCaseLetters(lowerCaseInPassword) 
    expect(result).toBe(false) 
  })
})
  

