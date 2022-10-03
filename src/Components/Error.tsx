import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

type Props = {
  message?: string | null,
  hideError: () => void
};

const Error = (props: Props) => {
  if (!props.message) {
    return null;
  }
  return (
    <div className="ErrorContainer" role="alert">
      <div className="Error__inner">
        <span className="block">{props.message}</span>
        <button className="Error__button" onClick={props.hideError}>
          <FontAwesomeIcon className="Error__icon" icon={faTimesCircle} />
        </button>
      </div>
    </div>
  );
};

export default Error;
