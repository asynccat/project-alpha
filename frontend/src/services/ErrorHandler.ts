import {Dispatch} from 'redux'
import { toast } from 'react-toastify'

import {errorMessage } from '../constants/errorAndSuccessMessages'
import {userPreferencesRequestFailed} from '../actions/prefAndProfileActions'
import { SERVER_ERROR_500, UNAUTHORIZED_ERROR_401 } from '../constants/valuableNumbers'

export interface IError {
        field: string
        message: string 
        statusCode?: number 
        errorType?: string 
}

export interface IErrorHandlerReturn {
    errorText: string | string[] // multiple lines if several validation form errors
    statusCode?: number // 500 or 401 or 400 (most common errors)
    errorType?: string // can be formFieldError or authorization 
}

export const errorHandler = (error: IError): IErrorHandlerReturn => {
    console.log(error)
    try {
        // here we check that error object is in JSON format
        const destructuredMessage = JSON.parse(error.message)
        if (destructuredMessage) {
            const [messageArrayFromDestructuredError] = destructuredMessage.errors
            const errorText = (messageArrayFromDestructuredError.message).toString()
            const errorCode = messageArrayFromDestructuredError.statusCode
            const typeOfError = messageArrayFromDestructuredError.errorType
            return {
                errorText: errorText,
                statusCode: errorCode,
                errorType: typeOfError,
            }
        } 
            return {
                errorText: errorMessage.errorUnknown
        }
    } catch (e) {
        return {
            errorText: errorMessage.errorUnknown
        }
    }
}

export const errorShow = (error: IError, dispatch: Dispatch): void => {
        const transformedError = errorHandler(error)
        if (transformedError.statusCode === SERVER_ERROR_500 || 
            transformedError.statusCode === UNAUTHORIZED_ERROR_401 || 
            transformedError.errorText === errorMessage.errorUnknown || 
            transformedError.errorType === 'authorization') {
            toast.error(transformedError.errorText)
        }
            //No understand how to correct it. We can have string or array of strings in error text, both way is handled
            //by the toast notification
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            dispatch(userPreferencesRequestFailed(transformedError.errorText))
            toast.error(transformedError.errorText)
}
