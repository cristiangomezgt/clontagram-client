import axios from "axios";
import { IUser } from "../Types/user.type";

export const toggleFollow = async (user: IUser) => {
  let updatedUser;
  if (user.siguiendo) {
    await axios.delete(`/api/amistades/${user._id}/eliminar`);
    updatedUser = {
      ...user,
      numSeguidores: user.numSeguidores! - 1,
      siguiendo: false
    };
  } else {
    await axios.post(`/api/amistades/${user._id}/seguir`);
    updatedUser = {
      ...user,
      numSeguidores: user.numSeguidores! + 1,
      siguiendo: true
    };
  }
  return updatedUser;
};