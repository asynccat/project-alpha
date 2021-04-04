import {postedUserAction, PrefActionType } from '../actions/prefAndProfileActions'

interface ChangeInitState {
      // Here we use any becase type don't specified yet
    // eslint-disable-next-line
    username: any
    // eslint-disable-next-line
    address: any
    // eslint-disable-next-line
    jobTitle: any
    // eslint-disable-next-line
    company: any
}

export const initialState = {
    username: '',
    address: '',
    jobTitle: '',
    company: '',
}

const changeMyDataReducer = ( state: ChangeInitState = initialState, action: postedUserAction): ChangeInitState => {
    switch(action.type){
        case PrefActionType.CHANGE_DATA:
            return {
                username: {...action.payload},
                address: {...action.payload},
                jobTitle: {...action.payload},
                company: {...action.payload}
            }

        default: return state
    }
}

export default changeMyDataReducer