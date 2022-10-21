import React from "react";
import { NavLink } from "react-router-dom";
import { IPost } from "../Types/post.type";

type Props = {
  posts: any[];
};

const Grid = (props: Props) => {
  const columns = props.posts.reduce((columns, post) => {
    const ultimaColumna = columns[columns.length - 1];
    if (ultimaColumna && ultimaColumna.length < 3) {
      ultimaColumna.push(post);
    } else {
      columns.push([post]);
    }
    return columns;
  }, []);
  return (
    <div>
      {columns.map((column: any[], index: number) => {
        return (
          <div key={index} className="Grid__row">
            {column.map((post: IPost) => (
              <GridPhoto key={post._id} {...post} />
            ))}
          </div>
        );
      })}
    </div>
  );
};
type GridPhotoProps = {
  _id?: string;
  url?: string;
  caption?: string;
};
const GridPhoto = (props: GridPhotoProps) => {
  return (
    <NavLink to={`/post/${props._id}`} className="Grid__post">
      <img src={props.url} alt={props.caption} className="Grid__post-img" />
    </NavLink>
  );
};

export default Grid;
