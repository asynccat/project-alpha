import React from "react";
  
  const passwordLength = /{6, 20}/;

  function validateMinimalLength(password:string) { 
    return passwordLength.test(password);
  };
  
  
  
   
  const userPasswordValidator = (password:string) => {
  
    const invalidPassword = {
      length: 'Length should be at least 6 letters',
      hasdigits: 'Password should has digits',
      hasymbols: 'password should has at least 1 symbols'
    };
    
    const passwordFeatures = {  
      digits: '(\\d.*)',
      letters: '([a-zA-Z].*)',
      symbols: '([`~\\!@#\\$%\\^\\&\\*\\(\\)\\-_\\=\\+\\[\\\{\\}\\]\\\\\|;:\\\'",<.>\\/\\?€£¥₹§±].*)'
    };
  
      const validateMinimalLength = () => {
        const minimalPasswordLength = 6;
        if(password.length === minimalPasswordLength  || password.length > minimalPasswordLength) {
        return true;
        } else {
        return invalidPassword.length;
        }
      }
  
      const validateContainsDigit = () => {
        const digits = /0123456789/; 
        return digits.test(password);
      };
    
      const validateContainsLowerCaseLetters = () => {
          const regexp = /[a-z]/;
          return (regexp.test(password)); 
      };
    
      const validateContainsUpperCaseLetters = () => {
          const regexp = /[A-Z]/;
          return(regexp.test(password));
      };
      
  
      return (
      validateMinimalLength(),
      validateContainsDigit(),
      validateContainsLowerCaseLetters(),
      validateContainsUpperCaseLetters()
      )
  }
  
  
  
  


 export { 
  validateMinimalLength,
  userPasswordValidator
 }
