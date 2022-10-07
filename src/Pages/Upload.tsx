import React, { useState } from "react";
import Main from "../Components/layout/Main";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import Loading from "../Components/Loading";
import Axios from "axios";

type Props = {
  showError: (message: string) => void;
};

const Upload = (props: Props) => {
  const [imageUrl, setImageUrl] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleOnChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploadingImage(true);
      const file =  e.target?.files![0];
      const config = {
        headers: {
          'Content-Type': file.type
        }
      };
      const {data} = await Axios.post("/api/posts/upload", file, config);
      setImageUrl(data.url);
      setUploadingImage(false);
    } catch (error: any) {
      setUploadingImage(false);
      props.showError(error?.response?.data);
    }
  }

  return (
    <Main center>
      <div className="Upload">
        <form>
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
