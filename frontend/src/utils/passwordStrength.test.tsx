
import passwordStrength, { validateMinimalLength,
  validateContainsDigit, validateContainsLowerCaseLetters, validateContainsUpperCaseLetters} from './passwordStrength'

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

/* testing hasPasswordDigits*/
  
  test('returns true if password has digits', () => {
    const numbersInPassword = '12345' 
    const result = validateContainsDigit(numbersInPassword) 
    expect(result).toBe(true) 
  })
  test('returns false if password hasn`t digits', () => {
    const lettersInPassword = 'daslkgl' 
    const result = validateContainsDigit(lettersInPassword) 
    expect(result).toBe(false) 
  })

  /* testing hasPasswordLowerCaseLetters*/

  test('returns true if password has lowerCase letters', () => {
    const LowerCaseInPassword = 'abcdef' 
    const result = validateContainsLowerCaseLetters(LowerCaseInPassword) 
    expect(result).toBe(true) 
  })

  test('returns false if password hasn`t lowerCase letters', () => {
    const UpperCaseInPassword = 'ASGJASJNBTJ' 
    const result = validateContainsLowerCaseLetters(UpperCaseInPassword) 
    expect(result).toBe(false)
  })

  /* testing hasPasswordUpperCaseLetters*/

  test('returns true if password has UpperCase letters', () => {
    const UpperCaseInPassword = 'SDAGHDHA!@!$' 
    const result = validateContainsUpperCaseLetters(UpperCaseInPassword) 
    expect(result).toBe(true) 
  })

  test('returns false if password hasn`t UpperCase letters', () => {
    const lowerCaseInPassword= '1sdgh12423' 
    const result = validateContainsUpperCaseLetters(lowerCaseInPassword) 
    expect(result).toBe(false) 
  })
})
