import React, { useEffect, useState } from "react";
import Main from "../Components/layout/Main";
import Axios from "axios";
import Loading from "../Components/Loading";
import { ImageAvatar } from "../Components/Avatar";
import { IPost } from "../Types/post.type";
import { IUser } from "../Types/user.type";
import { NavLink } from "react-router-dom";
import Grid from "../Components/Grid";

type Props = {
  showError: (message: string) => void;
};

const Explore = (props: Props) => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [users, setusers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const [posts, users] = await Promise.all([
          Axios.get(process.env.REACT_APP_API_URL+"/api/posts/explore").then(({ data }) => data),
          Axios.get(process.env.REACT_APP_API_URL+"/api/usuarios/explore").then(({ data }) => data),
        ]);
        setPosts(posts);
        setusers(users);
        setLoading(false);
      } catch (error) {
        props.showError(
          "was an error loading explore. Please refresh the page."
        );
      }
    };
    loadPost();
  }, []);

  if (loading) {
    return (
      <Main center>
        <Loading />
      </Main>
    );
  }

  return (
    <Main>
      <React.Fragment>
        <div className="Explore__section">
          <h2 className="Explore__title">
            Discover users
          </h2>
          <div className="Explore__usuarios-container">
            {
              users.map((user) => (
                <div className="Explore__usuario" key={user._id}>
                  <ImageAvatar user={user}  />
                  <p>{user.username}</p>
                  <NavLink to={`/profile/${user.username}`}>
                    See profile
                  </NavLink>
                </div>
              ))
            }
          </div>
        </div>
        <div className="Explore__section">
          <h2 className="Explore__title">
            Explore
          </h2>
          <Grid posts={posts!} />
        </div>
      </React.Fragment>
    </Main>
  );
};

export default Explore;
