export interface IUser {
  email?: string
  id: number
}

export interface IUserPreference {
  nickname: string
  email: string
}

export interface IUserPreferenceNickChanged {
  nickname: string
}