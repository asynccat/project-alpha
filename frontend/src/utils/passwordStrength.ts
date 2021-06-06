<<<<<<< HEAD


function checkPasswordStrength(password:String) { 
  return password.length > 6
 }
=======
const passwordLength = 6;

function checkPasswordStrength(password:String) { 
  return password.length > passwordLength;
 };
>>>>>>> 7045beaf... adding functions for checking that password has lowerUpperCase letter & numbers, also unit tests
 

 function hasPasswordDigits(password:String) {
    
  let is_digits = false; 

<<<<<<< HEAD
 
=======
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


// let is_specials = false; 

// let specials = "!@#$%^&*()_-+=\|/.,:;[]{}";

// else if (!is_specials && (specials.indexOf(password[i])) != -1) {
//   is_specials = true;
// }
>>>>>>> 7045beaf... adding functions for checking that password has lowerUpperCase letter & numbers, also unit tests
