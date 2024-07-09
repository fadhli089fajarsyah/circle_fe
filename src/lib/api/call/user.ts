import API from "..";

interface ILogin {
  username: string;
  password: string;
}

export const loginAPI = async (body: ILogin) => {
  return await API.post("login", body);
};


export const getUsers = async () => {
  return await API.get("users", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}
