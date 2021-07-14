import {validateMinimalLength, validateContainsDigit, validateContainsLowerCaseLetters,
  validateContainsUpperCaseLetters, validateContainsSpecialSymbols, validateContainsWhitespace, createLenghtValidator} from './passwordStrength'

import {config} from "../config" 


describe('Password strength', () => {
  test('returns true if password length is greater than 6', () => {
    const longPassword = '1xzvczq12' 
    const result = validateMinimalLength(longPassword) 
    expect(result).toBe(true) 
  })
  test('returns false if password length is less than 6', () => {
    const longPassword = '1xzvc' 
    const result = validateMinimalLength(longPassword) 
    expect(result).toBe(false) 
  })
  test('returns true if password length is greater than 12', () => {
    const longPassword = '1xzvczq121уу' 
    const result = validateMinimalLength(longPassword) 
    expect(result).toBe(true) 
  })
  test('returns false if password length is less than 12', () => {
    const longPassword = '1xzvcsd' 
    const result = validateMinimalLength(longPassword) 
    expect(result).toBe(false) 
  })

describe('testing hasPasswordDigits', () => {
  
  test('returns true if password has digits', () => {
    const numbersInPassword = '4356' 
    const result = validateContainsDigit(numbersInPassword) 
    expect(result).toBe(true) 
  })
  test('returns false if password hasn`t digits', () => {
    const lettersInPassword = 'daslkgl' 
    const result = validateContainsDigit(lettersInPassword) 
    expect(result).toBe(false) 
  })

  describe('testing hasPasswordLowerCaseLetters', () => {

    test('returns true if password has lowerCase letters', () => {
      const lowerCaseInPassword = 'abcdef' 
      const result = validateContainsLowerCaseLetters(lowerCaseInPassword) 
      expect(result).toBe(true) 
    })

    test('returns false if password hasn`t lowerCase letters', () => {
      const upperCaseInPassword = 'ASGJASJNBTJ' 
      const result = validateContainsLowerCaseLetters(upperCaseInPassword) 
      expect(result).toBe(false)
    })
  
  describe('testing hasPasswordUpperCaseLetters', () => {

    test('returns true if password has UpperCase letters', () => {
      const upperCaseInPassword = 'SDAGHDHA!@!$' 
      const result = validateContainsUpperCaseLetters(upperCaseInPassword) 
      expect(result).toBe(true) 
    })

    test('returns false if password hasn`t UpperCase letters', () => {
      const lowerCaseInPassword= '1sdgh12423' 
      const result = validateContainsUpperCaseLetters(lowerCaseInPassword) 
      expect(result).toBe(false) 
    })
  
  describe('testing hasPasswordUpperCaseLetters', () => {

    test('returns true if password has specific symbols', () => {
      const specSymbolsInPassword = 'jkhf---!@#'
      const result = validateContainsSpecialSymbols(specSymbolsInPassword)
      expect(result).toBe(true)
    })

    test('returns false if password has specific symbols', () => {
      const specSymbolsInPassword = 'jkhf'
      const result = validateContainsSpecialSymbols(specSymbolsInPassword)
      expect(result).toBe(false)
    })

  describe('testing hasPasswordWhitespaces', () => {

    test('returns true if password has Whitespaces', () => {
      const whitespaceInPassword = ' dsfdf '
      const result = validateContainsWhitespace(whitespaceInPassword)
      expect(result).toBe(true)
    })

    test('returns false if password hasn`t Whitespaces', () => {
      const whitespaceInPassword = 'lkajs;lag'
      const result = validateContainsWhitespace(whitespaceInPassword)
      expect(result).toBe(false)
    })

    describe('does createLenghtValidator get number and change config.MIN_PASSWORD_LEN', () => {

      test('returns true if createLenghtValidator get number and change config.MIN_PASSWORD_LEN', () => {
        const numberIncreateLenghtValidator = 13;
        const result = createLenghtValidator(numberIncreateLenghtValidator) === config.MIN_PASSWORD_LEN;
        expect(result).toBe(true)
      })
          })
        })
      })
    })
  })
})  
})
