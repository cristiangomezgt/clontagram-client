import axios from "axios";
import { IPost } from "../Types/post.type";

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
