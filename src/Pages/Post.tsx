import Axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import Avatar from "../Components/Avatar";
import Comment from "../Components/Comment";
import Main from "../Components/layout/Main";
import LikeButton from "../Components/LikeButton";
import Loading from "../Components/Loading";
import NotFound from "../Components/NotFound";
import { IComment } from "../Types/comment.type";
import { IPost } from "../Types/post.type";
import { IUser } from "../Types/user.type";

type Props = {
  showError: (message: string) => void;
};

const Post = (props: Props) => {
  const { postId } = useParams();
  const [post, setPost] = useState<IPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [postNotFound, setPostNotFound] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      try {
        const { data: post } = await Axios.get(`/api/posts/${postId}`);
        setPost(post);
        setLoading(false);
      } catch (error: any) {
        if (
          error.response &&
          (error.response.status === 404 || error.response.status === 400)
        ) {
          setPostNotFound(true);
        } else {
          props.showError("Hubo un problema cargando este post.");
        }
        setLoading(false);
      }
    };
    getPost();
  }, [postId]);

  if (loading) {
    return (
      <Main center>
        <Loading />
      </Main>
    );
  }
  if (postNotFound) {
    return (
      <NotFound message="It looks like the post you are trying to view doesn't exist 😕" />
    );
  }
  if (post === null) {
    return null;
  }

  return (
    <Main center>
      <div className="Post">
        <div className="Post__image-container">
          <img src={post.url} alt={post.caption} />
        </div>
        <div className="Post__side-bar">
          <Avatar user={post.usuario!} />
          <div className="Post__comentarios-y-like">
            <Comments
              user={post.usuario}
              caption={post.caption}
              comments={post.comentarios}
            />
          </div>
          <div className="Post__like">
            <LikeButton like={post.estaLike} onSubmitLike={() => null} />
          </div>
          <Comment showError={props.showError} onSubmitComment={() => null} />
        </div>
      </div>
    </Main>
  );
};

type PropsComments = {
  user: IUser | undefined;
  caption: string | undefined;
  comments: IComment[] | undefined;
};

const Comments = (props: PropsComments) => {
  return (
    <ul className="Post__comentarios">
      <li className="Post__comentario">
        <NavLink
          to={`/profile/${props.user?.username}`}
          className="Post__autor-comentario"
        >
          <b>{props.user?.username}</b>
        </NavLink>{" "}
        {props.caption}
      </li>
      {props.comments?.map((comment) => (
        <li key={comment._id} className="Post__comentario">
          <NavLink
            to={`/profile/${comment.usuario?.username}`}
            className="Post__autor-comentario"
          >
            <b>{comment.usuario?.username}</b>
          </NavLink>{" "}
          {comment.mensaje}
        </li>
      ))}
    </ul>
  );
};

export default Post;
