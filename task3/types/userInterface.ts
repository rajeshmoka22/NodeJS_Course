
export interface UserInput {
  login: string,
  password: string,
  age: number
}

export interface User extends UserInput {
  id: string,
  isDeleted: boolean
}

export interface AutoSuggest {
  loginSubstring?: string,
  limit?: number
}
