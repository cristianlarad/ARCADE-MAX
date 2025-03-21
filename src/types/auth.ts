export interface RegisterResponse {
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  admin: boolean;
  last_login: Date;
  login_count: number;
  banned: boolean;
}

export interface IUserData {
  users: IUser[];
}
