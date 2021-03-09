/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {Dispatch} from 'redux'
import {AuthActionType, fetchUserAction, loggedoutUser, IUserDetails} from './authActions'

const baseURL = 'http://127.0.0.1:8000/api/v1'

// eslint-disable-next-line max-len
export const logUserOut = () => (dispatch:Dispatch<loggedoutUser>) => dispatch({type: AuthActionType.LOG_OUT, payload: null})

// eslint-disable-next-line max-len
export const fetchUser = (userInfo: IUserDetails) => async (dispatch:Dispatch<fetchUserAction>) => {
    try{
        const response = await fetch(`${baseURL}/sign-up/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(userInfo)
        })
        const result = await response.json()
        .then(data => {
            localStorage.setItem('token', data.token)
            dispatch({ type: AuthActionType.SET_USER, payload: data.user})
        })
    } catch (e) {
console.log('Error:', e)
    }
}

export const signUserUp = (userInfo: IUserDetails ) => async (dispatch:Dispatch<fetchUserAction>) => {
    try {
        const response = await fetch(`${baseURL}/sign-up/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(userInfo)
    })
    const result = await response.json()
    .then(data => {
        localStorage.setItem('token', data.token)
        dispatch({ type: AuthActionType.SET_USER, payload: data.user})
    })  
} catch (e) {
console.log('Error:', e)
    }
}

export const autoLogin = () => async (dispatch:Dispatch<fetchUserAction>) => {
    try {
        const response = await fetch(`${baseURL}/login`, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        const result = await response.json()
        .then(data => {
            localStorage.setItem('token', data.token)
            dispatch({ type: AuthActionType.SET_USER, payload: data.user})
        })
    } catch (e) {
        console.log('Error:', e)
            }
}