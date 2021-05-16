export interface IUser {
  email?: string
  id: number
}

export interface IUserPreference {
  nickname: string
  email: string
  error?: string
  init: boolean
  isLoading: boolean
}

export interface IUserPreferenceNickChanged {
  nickname: string
  error?: string
}

export interface IUserPreferenceErrored {
  error: string
}

export interface IUserPreferenceInitiatedReq {
  init: boolean
  isLoading: boolean
}

