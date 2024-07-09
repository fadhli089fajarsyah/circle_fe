import API from "..";

interface ILike {
  threadId?: number 
  userId?: number
}
export const likePost = async (body: ILike) => {
  return await API.post("like", body, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export const getLikes = async () => {
  return await API.get("like", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
}


