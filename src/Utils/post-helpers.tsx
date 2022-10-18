import axios from "axios";
import { IPost } from "../Types/post.type";
import { IUser } from "../Types/user.type";

export const toggleLike = async (post: IPost) => {
  const url = `/api/posts/${post._id}/likes`;
  let updatedPost;
  if (post.estaLike) {
    await axios.delete(url);
    updatedPost = {
      ...post,
      estaLike: false,
      numLikes: post.numLikes - 1,
    };
  } else {
    await axios.post(url);
    updatedPost = {
      ...post,
      estaLike: true,
      numLikes: post.numLikes + 1,
    };
  }
  return updatedPost;
};
export const comment = async (post: IPost, comment:string, user:IUser) => {
  const { data: newComment } = await axios.post(
    `/api/posts/${post._id}/comentarios`, 
    { mensaje: comment}
  );
  newComment.usuario = user;

  const postUpdated = {
    ...post,
    comentarios: [...post.comentarios, newComment],
    numComentarios: post.numComentarios + 1
  }
  return postUpdated;
}