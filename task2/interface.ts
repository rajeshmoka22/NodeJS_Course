
export interface User {
  id: string,
  login: string,
  password: string,
  age: number,
  isDeleted: boolean
}

export interface AutoSuggest {
  loginSubstring?: string,
  limit?: number
}