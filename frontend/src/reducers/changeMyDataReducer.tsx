import { PrefActionType, PrefActions } from '../actions/prefAndProfileActions'

interface ChangeInitState {
      // Here we use any becase type don't specified yet
    // eslint-disable-next-line
    nickname: any
      // eslint-disable-next-line
    email: any
      // eslint-disable-next-line
    id: any
}

export const initialState = {
    nickname: '',
    email: '',
    id: ''

}

const changeMyDataReducer = ( state: ChangeInitState = initialState, action: PrefActions): ChangeInitState => {
    switch(action.type){
        case PrefActionType.RETRIEVE_DATA:
            return action.payload

        case PrefActionType.CHANGE_DATA:
            return {
                ...state,
               email: action.payload,
               id: action.payload,
               nickname: action.payload,
            }

        default: return state
    }
}

export default changeMyDataReducer