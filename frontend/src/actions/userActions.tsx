/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {Dispatch} from 'redux'
import {SET_USER, LOG_OUT, fetchUserAction, loggedoutUser, UserDetailsOnRegister, UserDetailsOnLogin} from './index'

const baseURL = 'http://127.0.0.1:8000/api/v1'

export const logUserOut = () => (dispatch:Dispatch<loggedoutUser>) => dispatch({type: LOG_OUT, payload: null})

// eslint-disable-next-line max-len
export const fetchUser = (userInfo: UserDetailsOnRegister | UserDetailsOnLogin) => (dispatch:Dispatch<fetchUserAction>) => {
    fetch(`${baseURL}/sign-up/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(userInfo)
    })
    .then(res => res.json())
    .then(data => {
        localStorage.setItem("token", data.token)
        dispatch({ type: SET_USER, payload: data.user})
    })
}

export const signUserUp = (userInfo: UserDetailsOnRegister ) => (dispatch:Dispatch<fetchUserAction>) => {
    fetch(`${baseURL}/sign-up/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(userInfo)
    })
    .then(res => res.json())
    .then(data => {
        localStorage.setItem("token", data.token)
        dispatch({ type: SET_USER, payload: data.user})
    })   
}

export const autoLogin = () => (dispatch:Dispatch<fetchUserAction>) => {
    fetch(`${baseURL}/login`, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })
    .then(res => res.json())
    .then(data => {
        localStorage.setItem("token", data.token)
        dispatch({ type: SET_USER, payload: data.user})
    })
}