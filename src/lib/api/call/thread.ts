import API from "..";

export const getThreads = async () => {
  return await API.get("threads");
};

export const createThread = async (body: {
  content: string;
  image: FileList | null;
  threadId: number;
}) => {
  const formData = new FormData();

  if (body.image !== null) {
    for (let i = 0; i < body.image.length; i++) {
      formData.append("image", body.image[i]);
    }
  }

  formData.append("content", body.content);

  if (body.threadId) {
    formData.append("threadId", body.threadId.toString());
  }

  return await API.post("thread", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const getThread = async (id: number) => {
  return await API.get(`thread/${id}`);
}

export const getReplies = async (id: number) => {
  return await API.get(`replies/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  } );
}
export const getThreadByUser = async (userId: number) => {
  return await API.get(`threads/${userId}`);
}
