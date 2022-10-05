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

  return (
    <Main center>
      <div className="Upload">
        <form>
          <div className="Upload__image-section">
            <UploadImageSection
              imageUrl={imageUrl}
              uploadingImage={uploadingImage}
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

const UploadImageSection = (props: any) => {
  if (props.uploadingImage) {
    return <Loading />;
  } else if (props.imageUrl) {
    return <img src={props.imageUrl} alt="" />;
  } else {
    return (
      <label className="Upload__image-label">
        <FontAwesomeIcon icon={faUpload}></FontAwesomeIcon>
        <span>Publish a photo</span>
        <input type="file" className="hidden" name="image" />
      </label>
    );
  }
};

export default Upload;
