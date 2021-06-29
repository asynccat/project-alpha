import React from "react";
  
  const passwordLength = /{6, 20}/;

  function validateMinimalLength(password:string) { 
    return passwordLength.test(password);
  };
  


  const validatePassword = (password:string) => {

    const validateContainsDigit = () => {
      const digits = /0123456789/; 
      return digits.test(password);
    };
  
    const validateContainsLowerCaseLetters= () => {
        const regexp = /[a-z]/;
        return (regexp.test(password)); 
    };
  
    const validateContainsUpperCaseLetters = () => {
        const regexp = /[A-Z]/;
        return(regexp.test(password));
    };
  
    return(validateContainsDigit(), validateContainsLowerCaseLetters(), validateContainsUpperCaseLetters());
  }


 export { 
  validateMinimalLength,
  validatePassword
 }
