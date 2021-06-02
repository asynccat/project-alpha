import {Dispatch} from 'redux'
import { toast } from 'react-toastify'

import {errorMessage } from '../constants/errorAndSuccessMessages'
import {userPreferencesRequestFailed} from '../actions/prefAndProfileActions'

export interface IError {
        field: string
        message: string
        statusCode?: number // код статуса ошибки например 401 или 500
        errorType?: string // тип ошибки например ошибка формы
}

export interface IErrorHandlerReturn {
    errorText: string | string[]
}

export const errorHandler = (error: IError, dispatch: Dispatch): void => {
    try {
        // here we check that error object is in JSON format
        const destructuredMessage = JSON.parse(error.message)
        if (destructuredMessage) {
            const [messageArrayFromDestructuredError] = destructuredMessage.errors
            const errorText = (messageArrayFromDestructuredError.message).toString()
            console.log(messageArrayFromDestructuredError.message)
            dispatch(userPreferencesRequestFailed(errorText))
            toast.error(errorText)
        } else {
          dispatch(userPreferencesRequestFailed(errorMessage.errorUnknown))
          toast.error(errorMessage.errorUnknown)
        }
    } catch (e) {
        dispatch(userPreferencesRequestFailed(errorMessage.errorUnknown))
        toast.error(errorMessage.errorUnknown)
    }
}