import React, { useEffect, useState } from "react";
import Axios from "axios";
import Loading from "../Components/Loading";
import Main from "../Components/layout/Main";
import { NavLink } from "react-router-dom";
import Post from "../Components/Post";
import { IPost } from "../Types/post.type";

const loadPosts = async (lastPost?: Date) => {
  const query = lastPost ? `?fecha=${lastPost}` : "";
  const { data: newPosts } = await Axios.get(`/api/posts/feed${query}`);
  return newPosts;
};

type Props = {
  showError: (message: string) => void;
};

const Feed = (props: Props) => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  useEffect(() => {
    const loadInitializePosts = async () => {
      try {
        const newPosts = await loadPosts();
        setPosts(newPosts);
        setLoadingPosts(false);
      } catch (error: any) {
        setLoadingPosts(false);
        props.showError(error?.response?.data);
      }
    };
    loadInitializePosts();
  }, []);

  if (loadingPosts) {
    return (
      <Main center>
        <Loading />
      </Main>
    );
  }
  if (!loadingPosts && posts.length === 0) {
    return (
      <Main center>
        <NoPostsFound />
      </Main>
    );
  }
  return (
    <Main center>
      <div className="Feed">
        {
          posts.map(post => (<Post key={post._id} post={post} />))
        }
      </div>
    </Main>
  );
};

type PropsNoPostsFound = {};

const NoPostsFound = (props: PropsNoPostsFound) => {
  return (
    <div className="NoSiguesANadie">
      <p className="NoSiguesANadie__mensaje">
        your feed does not have photos because you do not follow anyone, or
        because they have not published photos.
      </p>
      <div className="text-center">
        <NavLink to="/explore" className="NoSiguesANadie__boton">
          Explore Clontagram
        </NavLink>
      </div>
    </div>
  );
};

export default Feed;
