import { TUser } from '../models/UserModel'

export interface UserServiceType {
  getCurrentUser(): Promise<unknown>
}

export interface UserRepository {
  getUser(): Promise<unknown>
}

export class UserService {
  constructor(private _repo: UserRepository) {}

  getCurrentUser = () => {
    return this._repo.getUser()
  }
}
