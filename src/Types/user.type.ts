export interface IUser {
  _id?: number;
  email?: string;
  nombre?: string;
  username?: string;
  password?: string;
  bio?: string;
  imagen?: string;
  siguiendo?: boolean;
  numSeguidores?: number;
}