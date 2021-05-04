export interface IUser {
  email?: string
  id: number
}

export interface IUserPreference {
  nickname: string
  email: string
  error?: string
}

export interface IUserPreferenceNickChanged {
  nickname: string
  error?: string
}

export interface IUserPreferenceErrored {
  error: string
}