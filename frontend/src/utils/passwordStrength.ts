
const passwordLength = 6;

function validateMinimalLength(password:string) { 
  return password.length > passwordLength;
 };
 

 function  validateContainsDigit(password:string) {

  let isDigits = false; 

  let digits = "0123456789"; 
  
  let isContainsDigit = password.split('').some(function(item) {
  	if  (!isDigits && (digits.includes(item)) != false) {
    	return isDigits = true;
      }
    });
    return isContainsDigit;
  };


function validateContainsLowerCaseLetters(password:string) {
    if(password.match(/[а-яa-z]/)) {
    	return true;
    } else {
      return false;
    }
 } 

function validateContainsUpperCaseLetters(password:string) {
  if(password.match(/[А-ЯA-Z]/)) {
    return true;
  } else {
    return false;}
}

export default validateMinimalLength;

 export { 
  validateMinimalLength,
  validateContainsDigit,
   validateContainsLowerCaseLetters,
   validateContainsUpperCaseLetters,
 }


