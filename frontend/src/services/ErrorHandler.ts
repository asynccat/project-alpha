import { toast } from 'react-toastify'

import {errorMessage } from '../constants/errorAndSuccessMessages'

export interface IError {
    error: {
        field: string
        message: string | string[]
        statusCode: number
    }
}

export interface IErrorHandlerReturn {
    errorText: string | string[]
}

export const ErrorHandler = (error: IError): IErrorHandlerReturn => {
    const destructuredMessage = JSON.parse(error.message)
    if (destructuredMessage) {
        if (destructuredMessage.length === 1) {
            const [messageArrayFromDestructuredError] = destructuredMessage.errors
            const errorText = (messageArrayFromDestructuredError.message).toString()
            toast.error(errorText)
        } else {
            const [messageArrayFromDestructuredError] = destructuredMessage.errors
            const errorTexts = (messageArrayFromDestructuredError.message)
            errorTexts.map((errorText: string) => toast.error(errorText))
        }
    } else {
      toast.error(errorMessage.errorUnknown)
    }
}