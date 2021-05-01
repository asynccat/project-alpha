
/* eslint-disable @typescript-eslint/ban-ts-comment */

import { MILLISECONDS_IN_SECOND, TEN_SECONDS_BEFORE_TOKEN_EXPIRE} from '../constants/valuableNumbers'
import { AuthApiClient } from '../api/authRequest'
import {TokenStorage} from './TokenStorage'
  
export interface IRefreshToken {
    refresh: string
  }
  
export interface IToken {
    raw: string 
    payload: ITokenPayload
}

export interface IToken {
    raw: string 
    payload: ITokenPayload
}

export interface ITokenFromStorage {
    token: string | null
    payload: ITokenPayload
}


interface ITokenPayload {
    token_type: string
    exp: number
    user_id: number
    jti: string  
}

export interface ITokenSendType {
    refresh: string | null
}

export interface ITokenRefreshType {
    access: string
    refresh: string
}

export function jwtDecode(tokenFromStorage: string ): IToken {
    try {
        const token = {
            raw: '',
            payload: {
                token_type: '',
                exp: 0,
                user_id: 0,
                jti: '',
            },
            }
        token.raw = tokenFromStorage 
        token.payload = JSON.parse(window.atob(tokenFromStorage.split('.')[1]))
        return token
    }
    catch (e) {
        throw new Error(e)
    }
  }


export const refreshToken = async (): Promise<void> => {
        try {
            const tokenStorage = new TokenStorage()
            const refresh = tokenStorage.getRefresh()
            const authApiClient = new AuthApiClient()
            const result = await authApiClient.postRefresh({refresh})
            tokenStorage.saveToken(result.access)
            const wholeToken: IToken = jwtDecode(result.access)
            const expirationTime = ((wholeToken.payload.exp*MILLISECONDS_IN_SECOND) - Date.now() - 
            TEN_SECONDS_BEFORE_TOKEN_EXPIRE)
            console.log('token refreshing')
            autoRefresh(expirationTime)
        }
        catch (e) {
            console.log(e.message)
        }
}

export function autoRefresh (expirationTime: number): void {
    setTimeout(() => refreshToken(), expirationTime )
}
