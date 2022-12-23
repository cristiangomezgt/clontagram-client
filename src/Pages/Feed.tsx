import React, { useEffect, useState } from "react";
import Axios from "axios";
import Loading from "../Components/Loading";
import Main from "../Components/layout/Main";
import { NavLink } from "react-router-dom";
import Post from "../Components/Post";
import { IPost } from "../Types/post.type";
import { IUser } from "../Types/user.type";

const loadPosts = async (lastPost?: string) => {
  const query = lastPost ? `?fecha=${lastPost}` : "";
  const { data: newPosts } = await Axios.get(process.env.REACT_APP_API_URL+`/api/posts/feed${query}`);
  return newPosts;
};

const postsPerRequest = 3;

type Props = {
  showError: (message: string) => void;
  user: IUser;
};

const Feed = (props: Props) => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [loadingMorePosts, setLoadingMorePosts] = useState(false);
  const [allPostsLoaded, setAllPostsLoaded] = useState(false);

  useEffect(() => {
    const loadInitializePosts = async () => {
      try {
        const newPosts = await loadPosts();
        setPosts(newPosts);
        setLoadingPosts(false);
        checkIfAreMorePosts(newPosts);
      } catch (error: any) {
        setLoadingPosts(false);
        props.showError(error?.response?.data);
      }
    };
    loadInitializePosts();
  }, []);

  const loadMorePosts = async () => {
    if(loadingMorePosts) return;

    try {
      setLoadingMorePosts(true);
      const dateLastPost = posts[posts.length - 1].fecha_creado;
      const newPosts = await loadPosts(dateLastPost);
      setPosts(oldPosts => [...oldPosts, ...newPosts]);
      setLoadingMorePosts(false);
      checkIfAreMorePosts(newPosts);
    } catch (error) {
      props.showError("There was an error. try again please 😅");
      setLoadingMorePosts(false);
    }
  } 

  const checkIfAreMorePosts = (newPosts:IPost[]) => {
    if ( newPosts.length < postsPerRequest) {
      setAllPostsLoaded(true);
    }
  }
  const updatePost = (originalPost: IPost, updatedPost: IPost) => {
    setPosts((posts) => {
      const updatedPosts: IPost[] = posts.map((post) => {
        if (post !== originalPost) {
          return post;
        }
        return updatedPost;
      });
      return updatedPosts;
    });
  };

  
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
        {posts.map((post) => (
          <Post
            key={post._id}
            post={post}
            updatePost={updatePost}
            showError={props.showError}
            user={props.user}
          />
        ))}
        <LoadMorePosts onClick={loadMorePosts} isLoadEverything={allPostsLoaded} />
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

type PropsLoadMorePosts = {
  onClick: () => void;
  isLoadEverything?: boolean;
};

const LoadMorePosts = (props: PropsLoadMorePosts) => {
  if (props.isLoadEverything) {
    return <div className="Feed__no-hay-mas-posts">There are no more posts.</div>;
  }

  return (
    <button className="Feed__cargar-mas" onClick={props.onClick}>
      More
    </button>
  );
};

export default Feed;
