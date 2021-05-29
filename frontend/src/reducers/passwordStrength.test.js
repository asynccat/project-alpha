


describe('checkPasswordStrength', () => {
    it('should check incoming string', () => {
        assert.equal(checkPasswordStrength(password), String);
    });
});

describe('checkPasswordStrength', () => {
    it('does password contains numbers and symbols', function checkPassword(checkPasswordStrength(password, is_digits, is_specials)) {

            let is_digits = false; 
            let is_specials = false; 
         
            let digits = "0123456789"; 
            let specials = "!@#$%^&*()_-+=\|/.,:;[]{}";
             
             for (let i = 0; i < password.length; i++) {
        
               
               if (!is_digits && (digits.includes(password[i])) != -1) {
               	is_digits = true;
               }
               else if (!is_specials && (specials.includes(password[i])) != -1) {
               	is_specials = true;
               }
        
             }
        
             return (is_digits, is_specials);
    }
});


