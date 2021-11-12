export interface IUser {
  username: string;
  email: string;
  _id: string;
  token: string;
}

export interface IUsers {
  users: IUser[];
}
