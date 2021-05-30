
import passwordStrength from './passwordStrength'



describe('password', () => {
  test('has 6 letters', () => {
    expect((password).toHaveLength(6));
  });

  describe('password', () => {
    test('has less than 6 letters', () => {
      expect((password).not.toHaveLength(6));
    });
  

// describe('checkPasswordStrength', () => {
//     it('is the string less than 6 letters', () => {
//         assert.toEqual(checkPasswordStrength('sddsgdg'), 6);
//         // assert.equal(checkPasswordStrength(password), );
//     });
// });

// describe('checkPasswordStrength', () => {
//     it('does password contains numbers and symbols', 
//         function checkPassword(checkPasswordStrength(password), is_digits, is_specials) {

//             let is_digits = false; 
//             let is_specials = false; 
         
//             let digits = "0123456789"; 
//             let specials = "!@#$%^&*()_-+=\|/.,:;[]{}";
             
//              for (let i = 0; i < password.length; i++) {
        
               
//                if (!is_digits && (digits.includes(password[i])) != -1) {
//                	is_digits = true;
//                }
//                else if (!is_specials && (specials.includes(password[i])) != -1) {
//                	is_specials = true;
//                }
        
//              }
        
//              return (is_digits, is_specials);
//     }
// });


