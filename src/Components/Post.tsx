import React from "react";
import { NavLink } from "react-router-dom";
import { IComment } from "../Types/comment.type";
import { IPost } from "../Types/post.type";
import Avatar from "./Avatar";
import Comment from "./Comment";
import LikeButton from "./LikeButton";

type Props = {
  post: IPost;
};

const Post = (props: Props) => {
  return (
    <div className="Post-Componente">
      <Avatar user={props.post.usuario!} />
      <img
        src={props.post.url}
        alt={props.post.caption}
        className="Post-Componente__img"
      />
      <div className="Post-Componente__acciones">
        <div className="Post-Componente__like-container">
          <LikeButton
            onSubmitLike={() => 1}
            like={props.post.estaLike}
          ></LikeButton>
        </div>
        <p>{props.post.numLikes} Likes</p>
        <ul>
          <li>
            <NavLink to={`/profile/${props.post?.usuario?.username}`}>
              <b>{props.post?.usuario?.username} </b>
            </NavLink>{" "}
            {props?.post?.caption}
          </li>
          <SeeAllComments
            _id={props.post._id!}
            numComentarios={props.post.numComentarios}
          />
          <Comments comments={props.post.comentarios!} />
        </ul>
      </div>
      <Comment />
    </div>
  );
};

type PropsSeeAllComments = {
  _id: string;
  numComentarios: number;
};
const SeeAllComments = (props: PropsSeeAllComments) => {
  if (props.numComentarios < 4) return null;

  return (
    <li className="text-grey-dark">
      <NavLink to={`/post/${props._id}`}>
        See the {props.numComentarios} comments
      </NavLink>
    </li>
  );
};
type PropsComments = {
  comments: IComment[];
};
const Comments = (props: PropsComments) => {
  if (props.comments.length === 0) return null;
  return (
    <ul>
      {props.comments.map((comment) => (
        <li key={comment._id}>
          <NavLink to={`/profile/${comment.usuario?.username}`}>
            <b>{comment.usuario?.username}</b>
          </NavLink>
          {comment.mensaje}
        </li>
      ))}
    </ul>
  );
};

export default Post;
