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


 export { 
  validateMinimalLength, validateContainsDigit,
  validateContainsLowerCaseLetters,
  validateContainsUpperCaseLetters,
  validateContainsSpecialSymbols,
  validateContainsWhitespace
  
 }