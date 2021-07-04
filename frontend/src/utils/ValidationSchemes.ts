
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
    validationFile: 
    Yup.object({
        file: Yup.mixed()
        .nullable()
        .notRequired()
        .test('FILE_SIZE', 'Uploaded file is too big.', 
            value => !value || (value && value.size <= FILE_SIZE))
        // .test('FILE_FORMAT', 'Uploaded file has unsupported format.', 
        //     value => !value || (value && SUPPORTED_FORMATS.includes(value.type)))
    }),
}

const FILE_SIZE = 2000000
const SUPPORTED_FORMATS = ['jpg', 'jpeg', 'png', 'gif']