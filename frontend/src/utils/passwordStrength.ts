import React from "react";
  
  const passwordLength = /{6, 20}/;

  function validateMinimalLength(password:string) { 
    return passwordLength.test(password);
  };
  


 function  validateContainsDigit(password:string) {

  const digits = /0123456789/; 
  
  const isContainsDigit = () => {
    return digits.test(password);
  };


function validateContainsLowerCaseLetters(password:string) {
    const regexp = /[a-z]/;
    return (regexp.test(password)); 
};

function validateContainsUpperCaseLetters(password:string) {
    const regexp = /[A-Z]/;
    return(regexp.test(password));
};

 export default { 
  validateMinimalLength,
  validateContainsDigit,
   validateContainsLowerCaseLetters,
   validateContainsUpperCaseLetters,
 };
