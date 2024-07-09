import API from "..";
import { IUser } from "../../../types/app";

interface IProfile {
  bio?: string;
  avatar?: string;
  cover?: string;
  user: IUser;
}

export const getProfile = async (token: string) => {
  return await API.get("profile", {
    headers: { Authorization: `Bearer ${token}` },
  });
};


export const updateProfile = async (body: IProfile, token: string) => {
  return await API.patch("profile", body, {
    headers: { Authorization: `Bearer ${token}` },
  })
}