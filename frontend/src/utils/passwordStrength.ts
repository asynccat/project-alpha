import React from "react";
import {config} from "../config"  
 

  function validateMinimalLength(password:string) { 
    const passLength = password.split("").length;
    return passLength > config.MIN_PASSWORD_LEN; 
  };
   
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
     
    const createLenghtValidator = validateMinimalLength;
  
    const createValidator = (arr, minimalValidators:number) => {
      let result = [];

      for(let func of arr) {
        result.push(func());
      }
      if(result.filter(Boolean).length == minimalValidators) {
        return true;
      }
      
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
  validateContainsWhitespace
  
 }