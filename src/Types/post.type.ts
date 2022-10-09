import { IUser } from "./user.type";

export interface IPost {
  _id?: string;
  url?: string,
  caption?: string,
  usuario?: IUser
}