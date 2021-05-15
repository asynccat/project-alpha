let password = function getPassword(str) {
	return str;
}

function checkPasswordStrength(password) {
    if(password.length < 6) {
        return false;
    }
    else{
         return true;
    }
 }
 


 function checkPasswordTest(password) {
    
    let is_digits = false; // Есть ли в пароле цифры
    let is_specials = false; // Есть ли в пароле спецсимволы
 
    let digits = "0123456789"; 
    let specials = "!@#$%^&*()_-+=\|/.,:;[]{}";
     
     for (let i = 0; i < password.length; i++) {

       /* Проверяем каждый символ пароля на принадлежность к тому или иному типу */
       if (!is_digits && (digits.indexOf(password[i])) != -1) {
       	is_digits = true;
       }
       else if (!is_specials && (specials.indexOf(password[i])) != -1) {
       	is_specials = true;
       }

     }

     return console.log(is_digits, is_specials);
     
 }
 
 console.log(checkPasswordStrength(password('1!')));
 
 console.log(checkPasswordTest(password('1!')));
