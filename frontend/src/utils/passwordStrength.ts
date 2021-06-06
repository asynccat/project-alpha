const passwordLength = 6;

function checkPasswordStrength(password:String) { 
  return password.length > passwordLength;
 };
 

 function hasPasswordDigits(password:String) {
    
  let is_digits = false; 

  let digits = "0123456789"; 
  
   
   for (let i = 0; i < password.length; i++) {
     if (!is_digits && (digits.includes(password[i])) != false) {
       is_digits = true;
     }
   }

   return (is_digits);
   
};

function hasPasswordLowerCaseLetters(password:String) {
  return password.toUpperCase() != password;
}

function hasPasswordUpperCaseLetters(password:String) {
  return password.toLowerCase() != password;
}


export default checkPasswordStrength;

 export { 
   checkPasswordStrength,
   hasPasswordDigits,
   hasPasswordLowerCaseLetters,
   hasPasswordUpperCaseLetters,
 }


