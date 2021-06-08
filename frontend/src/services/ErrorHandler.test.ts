/* eslint-disable @typescript-eslint/ban-ts-comment */
export {}
import { errorHandler } from './ErrorHandler'
import {errorMessage} from '../constants/errorAndSuccessMessages'

describe('errorHandler', () => {
    it ('handles error object with unknown error', () => {
        //create an error
        const error = { field: 'unknown error'}

        //pass an error to the handler, assign a variable for it
        //@ts-ignore
       const check = errorHandler(error)

        expect(check).toStrictEqual({errorText: errorMessage.errorUnknown})

        })

        it ('handles error object with exact message error', () => {
            //create an error same as error Object from backend from console.log when login with incorrect password
            //Error: {"errors":[{"field":"detail","message":["No active account found with the given credentials"]}]}
            const error = {errors: [{ field: 'detail', message: 
                ['No active account found with the given credentials']}]}
    
            //pass an error to the handler, assign a variable for it
            //@ts-ignore
           const check = errorHandler(error)
    
           // the result is -  "errorText": "Something went wrong, please try again later" - 
           //as if there was no message at all
            expect(check).toStrictEqual({errorText: 'No active account found with the given credentials'})
            })
})
    