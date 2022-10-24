import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Main from "../Components/layout/Main";
import Loading from "../Components/Loading";
import NotFound from "../Components/NotFound";
import { IUser } from "../Types/user.type";
import stringToColor from "string-to-color";
type Props = {
  showError: (message: string) => void;
  user: IUser;
};

const Profile = (props: Props) => {
  const { username } = useParams();

  const [userProfile, setUserProfile] = useState<IUser | null>(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userNotFound, setUserNotFound] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    const loadPostAndUser = async () => {
      try {
        setLoading(true);
        const { data: user } = await axios.get(`/api/usuarios/${username}`);
        const { data: posts } = await axios.get(
          `/api/posts/usuario/${user._id}`
        );
        setUserProfile(user);
        setPosts(posts);
        setLoading(false);
      } catch (error: any) {
        if (
          error.response &&
          (error.response.status === 404 || error.response.status === 400)
        ) {
          setUserNotFound(true);
        } else {
          props.showError("Was an error loading this profile 😥");
        }
        setLoading(false);
      }
    };
    loadPostAndUser();
  }, [username]);

  const checkIfIsUserLogged = () => {
    return props.user._id === userProfile?._id;
  };

  const handleSelectedImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploadingImage(true);
      const file = e.target?.files![0];
      const config = {
        headers: {
          'Content-Type': file.type
        }
      }
      const { data } = await axios.post('/api/usuarios/upload', file, config);
      setUserProfile({...userProfile, imagen: data.url});
      setUploadingImage(false);
    } catch (error: any) {
      console.log(error);
      props.showError(error.response.data.message)
      setUploadingImage(false);
    }
  }
  if (loading) {
    return (
      <Main center>
        <Loading />
      </Main>
    );
  }

  if (userNotFound) {
    return (
      <NotFound message="The profile that you are looking for does not exist" />
    );
  }

  if (userProfile === null) {
    return null;
  }

  return (
    <Main>
      <ImageAvatarUploader
        userProfile={userProfile}
        isUserLogged={checkIfIsUserLogged()}
        handleSelectedImage={handleSelectedImage}
        uploadingImage={uploadingImage}
      />
    </Main>
  );
};

type ImageAvatarUploaderProps = {
  isUserLogged: boolean;
  userProfile: IUser;
  handleSelectedImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  uploadingImage: boolean;
};

const ImageAvatarUploader = (props: ImageAvatarUploaderProps) => {
  let content;

  if (props.uploadingImage) {
    content = <Loading />;
  } else if (props.isUserLogged) {
    content = (
      <label
        className="Perfil__img-placeholder Perfil__img-placeholder--pointer"
        style={{
          backgroundImage: props.userProfile.imagen
            ? `url(${props.userProfile.imagen})`
            : "",
          backgroundColor: stringToColor(props.userProfile.username),
        }}
      >
        <input
          type="file"
          onChange={props.handleSelectedImage}
          className="hidden"
          name="image"
        />
      </label>
    );
  } else {
    content = (
      <div
        className="Perfil__img-placeholder"
        style={{
          backgroundImage: props.userProfile.imagen
            ? `url(${props.userProfile.imagen})`
            : "",
          backgroundColor: stringToColor(props.userProfile.username),
        }}
      ></div>
    );
  }

  return <div className="Perfil__img-container">{content}</div>;
};

export default Profile;
