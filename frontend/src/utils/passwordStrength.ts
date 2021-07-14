import React from "react";
import { array } from "yup/lib/locale";
import {config} from "../config"  
 

  function validateMinimalLength(password:string) { 
    const passLength = password.length;
    return passLength > config.MIN_PASSWORD_LEN; 
  };

  const createLenghtValidator = (userLength:number) => {
    return config.MIN_PASSWORD_LEN = userLength;
 }

    
    const validateContainsDigit = (password:string) => {
      const digits = /[0-9]/; 
      return digits.test(password);
    };
  
    const validateContainsLowerCaseLetters= (password:string) => {
        const regexp = /[a-z]/;
        return (regexp.test(password)); 
    };
  
    const validateContainsUpperCaseLetters = (password:string) => {
        const regexp = /[A-Z]/;
        return(regexp.test(password));
    };

    const validateContainsSpecialSymbols = (password:string) => {
        const regexp = /(?=.*[!@#\$%])/;
        return(regexp.test(password));
    };

    const validateContainsWhitespace = (password:string) => {
      const regexp = /[\s]/;
      return(regexp.test(password));
    };
     
    let validatorResults =  {
      validValidators: [],
      invalidValidators: [], 
    };
    
    const createValidator = (arr, minimalValidators:number) => {  
        arr.map(function(elem) {
          if(elem() !== false) {
            validatorResults.validValidators = elem();
          } else {
            validatorResults.invalidValidators = elem();
          }
          return (
            validatorResults.validValidators,
            validatorResults.invalidValidators
          )
      })
        return validatorResults.validValidators.length === minimalValidators;
      }

    const myCustomPasswordValidator = createValidator([
      createLenghtValidator(config.MIN_PASSWORD_LEN),
      validateContainsDigit,
      validateContainsLowerCaseLetters,
      validateContainsUpperCaseLetters
      ], config.MINIMAL_VALIDATION_NUMBER); 
      
    
    const superStrongPasswordValidator = createValidator([
    createLenghtValidator(config.MIN_ADMIN_PASSWORD_LEN),
    validateContainsDigit,
    validateContainsLowerCaseLetters,
    validateContainsUpperCaseLetters
    ], config.MINIMAL_VALIDATION_NUMBER); 
  

 export { 
  validateMinimalLength, validateContainsDigit,
  validateContainsLowerCaseLetters,
  validateContainsUpperCaseLetters,
  validateContainsSpecialSymbols,
  validateContainsWhitespace,
  createLenghtValidator
 }