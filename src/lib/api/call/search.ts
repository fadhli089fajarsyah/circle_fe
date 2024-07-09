import API from "..";

export const search = async (query: string) => {
  return await API.post("search?query=" + query, {}, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
