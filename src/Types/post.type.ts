import { IComment } from "./comment.type";
import { IUser } from "./user.type";

export interface IPost {
  _id?: string,
  url?: string,
  caption?: string,
  usuario?: IUser,
  estaLike: boolean,
  numLikes: string,
  numComentarios: number,
  comentarios?: IComment[]
}