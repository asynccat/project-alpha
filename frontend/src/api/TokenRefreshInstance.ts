/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { FIVETHOUSAND, THOUSAND } from '../constants/valuableNumbers'
import {HttpClient} from './HttpClient'

interface IToken {
    access:string
token: {
    access: string
    raw: string
    payload: {
        exp: number
        id: number
    }
}
split: any
}

interface ITokenSend {
    refresh: string | null
}

interface ITokenRefresh {
    access: string
    refresh: string
}

export interface ISendTokenRefresh {
    postRefresh: (payload: ITokenSend) => Promise<ITokenRefresh>
}

export function jwtDecode(t: IToken) {
    const token = {
        raw: {},
        payload: {},
    }
    token.raw = t
    token.payload = JSON.parse(window.atob(t.split('.')[1]))
    return (token)
  }

export class TokenRefresh extends HttpClient implements ISendTokenRefresh {    
    async postRefresh(payload: ITokenSend): Promise<ITokenRefresh> {
        return await this.post('token/refresh', true, payload) as ITokenRefresh
    }
}

export const freshTheToken = async () => {
        try {
            const refresh = localStorage.getItem('refresh')
            const tokenFresh = new TokenRefresh()
            const result = await tokenFresh.postRefresh({refresh: refresh})
            console.log('token refreshed')
            localStorage.setItem('token', result.access)
        }
        catch (e) {
            console.log(e.message)
        }
}

export const timeDiffChecker = () => {
    //@ts-ignore
    const wholeToken: any = jwtDecode(localStorage.getItem('token'))
    const tokenDecoded = wholeToken.payload.exp
    if ((tokenDecoded*THOUSAND - Date.now()) < FIVETHOUSAND) {
        console.log((tokenDecoded*THOUSAND - Date.now()))
        freshTheToken()
    }
    else {
        console.log('token is fresh')
    }
}