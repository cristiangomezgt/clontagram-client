import { IUser } from "./user.type";

export interface IComment {
  _id?: string;
  usuario?: IUser,
  mensaje?: string
}