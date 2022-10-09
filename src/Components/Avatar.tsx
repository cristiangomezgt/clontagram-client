import React from "react";
import { IUser } from "../Types/user.type";
import stringToColor from "string-to-color";
import { Link } from "react-router-dom";
type Props = {
  user: IUser;
};

const Avatar = (props: Props) => {
  return (
    <div className="Avatar">
      <ImageAvatar user={props.user} />
      <Link to={`/profile/${props.user.username}`}>
        <h2>{props.user.username}</h2>
      </Link>
    </div>
  );
};

type ImageAvatarProps = {
  user: IUser;
};

export const ImageAvatar = (props: ImageAvatarProps) => {
  const style = {
    backgroundImage: props.user.imagen ? `url(${props.user.imagen})` : "",
    backgroundColor: stringToColor(props.user.username),
  };
  return <div className="Avatar__img" style={style}></div>;
};

export default Avatar;
