import React, { useState } from "react";
import Main from "../Components/layout/Main";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import Loading from "../Components/Loading";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

type Props = {
  showError: (message: string) => void;
};

const Upload = (props: Props) => {
  let navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [sendingPost, setSendingPost] = useState(false);
  const [caption, setCaption] = useState("");

  const handleOnChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploadingImage(true);
      const file =  e.target?.files![0];
      const config = {
        headers: {
          'Content-Type': file.type
        }
      };
      const {data} = await Axios.post(process.env.REACT_APP_API_URL+"/api/posts/upload", file, config);
      setImageUrl(data.url);
      setUploadingImage(false);
    } catch (error: any) {
      setUploadingImage(false);
      props.showError(error?.response?.data);
    }
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sendingPost){
      return;
    }
    if (uploadingImage) {
      props.showError("The image does't have been upload yet 😅");
    }
    if (!imageUrl) {
      props.showError("First choose an image please 😅");
    }
    try {
      setSendingPost(true);
      const body = {
        caption,
        url: imageUrl
      };
      await Axios.post(process.env.REACT_APP_API_URL+"/api/posts", body);
      setSendingPost(false);
      navigate('/');
    } catch (error: any) {
      props.showError(error.response.data);
    }
  }
  return (
    <Main center>
      <div className="Upload">
        <form onSubmit={handleSubmit}>
          <div className="Upload__image-section">
            <UploadImageSection
              imageUrl={imageUrl}
              uploadingImage={uploadingImage}
              handleOnChangeImage={handleOnChangeImage}
            />
          </div>
          <textarea
            name="caption"
            className="Upload__caption"
            required
            maxLength={180}
            placeholder="Caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <button className="Upload__submit" type="submit">
            Post
          </button>
        </form>
      </div>
    </Main>
  );
};

type PropsUploadImageSection = {
  imageUrl: string,
  uploadingImage: boolean,
  handleOnChangeImage: (e: React.ChangeEvent<HTMLInputElement>) => void,
};

const UploadImageSection = (props: PropsUploadImageSection) => {
  if (props.uploadingImage) {
    return <Loading />;
  } else if (props.imageUrl) {
    return <img src={props.imageUrl} alt="" />;
  } else {
    return (
      <label className="Upload__image-label">
        <FontAwesomeIcon icon={faUpload}></FontAwesomeIcon>
        <span>Publish a photo</span>
        <input type="file" className="hidden" name="image" onChange={props.handleOnChangeImage} />
      </label>
    );
  }
};

export default Upload;
