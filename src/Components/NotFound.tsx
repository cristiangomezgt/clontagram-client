import React from "react";
import { NavLink } from "react-router-dom";
import Main from "./layout/Main";

type Props = {
  message: string;
};

const NotFound = (props: Props) => {
  return (
    <Main center>
      <div>
        <h2 className="RecursoNoExiste__mensaje">{props.message}</h2>
        <p className="RecursoNoExiste__link-container">
          Go to <NavLink to="/">home</NavLink>
        </p>
      </div>
    </Main>
  );
};

export default NotFound;
