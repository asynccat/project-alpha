// let password = function getPassword(str) {
// 	return str;
// }

function checkPasswordStrength(password:string) { 
	let result = (password.length > 6) ? true : false;
  return result;
 }
 
 export default checkPasswordStrength


 


//  function checkPasswordTest(password) {
    
//     let is_digits = false; 
//     let is_specials = false; 
 
//     let digits = "0123456789"; 
//     let specials = "!@#$%^&*()_-+=\|/.,:;[]{}";
     
//      for (let i = 0; i < password.length; i++) {

       
//        if (!is_digits && (digits.indexOf(password[i])) != -1) {
//        	is_digits = true;
//        }
//        else if (!is_specials && (specials.indexOf(password[i])) != -1) {
//        	is_specials = true;
//        }

//      }

//      return (is_digits, is_specials);
     
//  }
 
//  console.log(checkPasswordStrength(password('1!')));
 
//  console.log(checkPasswordTest(password('1!')));
