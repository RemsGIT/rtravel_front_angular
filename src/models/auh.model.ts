export enum ERole {
  USER = 'user',
  ADMIN = 'admin',
  SUPERADMIN = 'super_admin'
}

export interface IUser {
  id: number,
  username: string,
  email: string,
  role: ERole
}

export interface IUserRequest {
  email: string,
  password: string
}
export interface IUserRegisterRequest {
  username: string,
  email: string,
  password: string,
}
