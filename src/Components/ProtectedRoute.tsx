import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { IUser } from '../Types/user.type';

type Props = {
  user?: IUser,
  showError: (message: string) => void
}

const ProtectedRoute = (props: Props) => {
  if (!props.user) {
    return <Navigate to="/signup" />;
  }
  return <Outlet />;
}

export default ProtectedRoute