import React from "react";
import Main from "../Components/layout/Main";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import Loading from "../Components/Loading";
import Axios from "axios";

type Props = {
  showError: (message: string) => void;
};

const Upload = (props: Props) => {
  return (
    <Main center>
      <div className="Upload">
        <form>
          <div className="Upload__image-section">
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

export default Upload;
