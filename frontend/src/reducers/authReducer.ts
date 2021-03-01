import { Dispatch } from "redux";
import { ActionsType } from "../actions";

const initialState: InitialStateType = {
    isAuth: false
}

export const setIsAuth = (value: boolean): SetIsAuthActionType =>
    ({type: 'auth/SET_IS_AUTH', value} as const)

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'auth/SET_IS_AUTH':
            return {...state, isAuth: action.value}
        default:
            return state
    }
}
export const signInWithGoogle = () => {
    return (dispatch: Dispatch<ActionsType>) => {
        // @ts-ignore
        const googleAuth = gapi.auth2.getAuthInstance()
        googleAuth.signIn({
            scope: 'profile email'
        }).then((user: any) => {
            console.log(user.getBasicProfile().getName())
            dispatch(setIsAuth(true))
        }, () => console.log("err"))
    }
}

export const signOutWithGoogle = () => {
    return (dispatch: Dispatch<ActionsType>) => {
        // @ts-ignore
        const googleAuth = gapi.auth2.getAuthInstance()
        googleAuth.signOut().then(() => {
            dispatch(setIsAuth(false))
        }, () => console.log("err"))
    }
}


type SetIsAuthActionType = {
    type: 'auth/SET_IS_AUTH',
    value: boolean
}

export type AuthActions = SetIsAuthActionType

type InitialStateType = {
    isAuth: boolean
}