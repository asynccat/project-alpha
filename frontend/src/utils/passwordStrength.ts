
const passwordLength = 6;

function validateMinimalLength(password:string) { 
  return password.length > passwordLength;
 };
 


 function  validateContainsDigit(password:string) {

  let isDigits = false; 

  const digits = "0123456789"; 
  
  const arrayPassword  = function convertStr() {
  	return password.split('');
  }
  
  const isContainsDigit = arrayPassword.call().some(function(item) {
  	if  (!isDigits && (digits.includes(item)) !== false) {
    		isDigits = true;
      }
      return isDigits;
    });
    return isContainsDigit;
  };


function validateContainsLowerCaseLetters(password:string) {
    const regexp = /[a-z]/;
    return (regexp.test(password)) 
}

function validateContainsUpperCaseLetters(password:string) {
    const regexp = /[A-Z]/;
    return(regexp.test(password));
}

export default validateMinimalLength;

 export { 
  validateMinimalLength,
  validateContainsDigit,
   validateContainsLowerCaseLetters,
   validateContainsUpperCaseLetters,
 }


