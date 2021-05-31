
import * as Yup from 'yup'

export const validationSchema = {
      
    validationEmail: 
        Yup.object({
            email: Yup.string()
            .required('Enter your new Email')
            .email('This is not email')
        }),
      validationPassword: 
        Yup.object({
            oldPassword: Yup.string()
            .required('Enter your old password'),
            newPassword: Yup.string()
            .required('Enter your new password')
            .notOneOf([Yup.ref('oldPassword')], 'Old and new passwords must be different'),
            confirmPassword: Yup.string()
            .required('Confirm your password')
            .oneOf([Yup.ref('newPassword')], 'Passwords do not match')
            }),
}