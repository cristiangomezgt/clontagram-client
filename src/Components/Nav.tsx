import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCameraRetro } from "@fortawesome/free-solid-svg-icons";
import { IUser } from '../Types/user.type';
import { NavLink } from 'react-router-dom';

type Props = {
  user: IUser
}

const Nav = (props: Props) => {
  return (
    <nav className='Nav'>
      <ul className='Nav__links'>
        <li>
          <NavLink className="Nav__link" to="/">
            Clontagram
          </NavLink>
        </li>
        {props.user && <LoginRoutes /> }
      </ul>
    </nav>
  )
}

 const LoginRoutes = () => {
  return (
    <React.Fragment>
      <li className='Nav__link-push'>
        <NavLink className='Nav__link' to="/upload">
          <FontAwesomeIcon icon={faCameraRetro}></FontAwesomeIcon>
        </NavLink>
      </li>
    </React.Fragment>
  )
}
export default Nav