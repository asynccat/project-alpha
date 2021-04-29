
/* eslint-disable @typescript-eslint/ban-ts-comment */

import { FIVE_SECONDS, MILLISECONDS_IN_SECOND} from '../constants/valuableNumbers'
import { AuthApiClient } from './authRequest'
import {TokenStorage} from '../services/TokenStorage'

export interface IToken {
    raw: string
    payload: {
        token_type: string
        exp: number
        user_id: number
        jti: string
        }
    split: StringConstructor
}

interface ITokenPayload {
    payload: {
        token_type: string
        exp: number
        user_id: number
        jti: string
        }
    raw: string        
}

export interface ITokenSendType {
    refresh: string | null
}

export interface ITokenRefreshType {
    access: string
    refresh: string
}

export function jwtDecode(t: string): ITokenPayload {
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
        token.raw = t
        token.payload = JSON.parse(window.atob(t.split('.')[1]))
        return token
    }
    catch (e) {
        console.log(e.message)
        throw new Error(e)
    }
  }


export const refreshToken = async (): Promise<void> => {
        try {
            const tokenStorage = new TokenStorage()
            const refresh = tokenStorage.getRefresh()
            const authApiClient = new AuthApiClient()
            //@ts-ignore
            const result = await authApiClient.postRefresh({refresh})

            tokenStorage.saveToken(result.access)
        }
        catch (e) {
            console.log(e.message)
        }
}

export const timeDiffChecker = (): void  => {
    const tokenStorage = new TokenStorage()
    //@ts-ignore
    const wholeToken: IToken = jwtDecode(tokenStorage.getToken())
    const tokenDecoded = wholeToken.payload.exp
    if ((tokenDecoded*MILLISECONDS_IN_SECOND - Date.now()) < FIVE_SECONDS) {
        console.log((tokenDecoded*MILLISECONDS_IN_SECOND - Date.now()))
        refreshToken()
    }
}