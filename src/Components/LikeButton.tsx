import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as heartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as heartSolid } from "@fortawesome/free-solid-svg-icons";

type Props = {
  like: boolean,
  onSubmitLike: () => void
}

const LikeButton = (props: Props) => {
  return (
    <button onClick={props.onSubmitLike}>
        {
          props.like ? (
            <FontAwesomeIcon className="text-red-dark"  icon={heartSolid} />
          ) : (
            <FontAwesomeIcon icon={heartRegular} />
          )
        }
    </button>
  )
}

export default LikeButton