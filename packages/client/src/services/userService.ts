export interface IUserService {
  getCurrentUser(): Promise<Response>
}

export interface UserRepository {
  getUser(): Promise<Response>
}

export class UserService {
  constructor(private _repo: UserRepository) {}

  getCurrentUser = () => {
    return this._repo.getUser()
  }
}
