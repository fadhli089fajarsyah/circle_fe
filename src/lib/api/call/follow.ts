import API from "..";

export const follow = async (body: { followingId: number }) => {
  return await API.post("follow", body, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export const getFollowers = async (followingId: number) => {
  return await API.get("follower/" + followingId, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export const getFollowings = async (followerId: number) => {
  return await API.get("following/" + followerId, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};
