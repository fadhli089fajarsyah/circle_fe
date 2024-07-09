import { Avatar, Box, Button, TextField } from "@mui/material";
import { useAppSelector } from "../../../store";
import { MouseEvent, useState } from "react";
import { createThread } from "../../../lib/api/call/thread";
import { AddPhotoAlternateOutlined } from "@mui/icons-material";

interface ThreadFormProps {
  threadId?: number;
  callback?: () => void;
}

const ThreadForm: React.FC<ThreadFormProps> = ({ threadId, callback }) => {
  const auth = useAppSelector((state) => state.auth);
  const profile = useAppSelector((state) => state.auth.user);
  const _host_url = "http://localhost:5000/uploads/";

  const [threadPost, setThreadPost] = useState<{
    content: string;
    image: FileList | null;
    threadId: number;
    imagePreview: string[];
  }>({ content: "", image: null, threadId: 0, imagePreview: [] });

  const handlePost = async (e: MouseEvent) => {
    try {
      e.preventDefault();

      if (threadId) {
        threadPost.threadId = threadId;
      }

      const res = await createThread(threadPost);

      console.log(res);

      if (callback) {
        callback();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const previewUrls: string[] = [];
      Array.from(files).forEach((file) => {
        const url = URL.createObjectURL(file);
        previewUrls.push(url);
      });
      setThreadPost({
        ...threadPost,
        image: files,
        imagePreview: previewUrls,
      });
    }
  };

  return !auth.user ? null : (
    <>
      <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Avatar
          src={
            profile?.avatar
              ? _host_url + profile.avatar
              : "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3467.jpg?w=740"
          }
          alt="avatar"
        />
        <TextField
          label={threadId ? "Type your reply" : "What's on your mind?"}
          autoComplete="off"
          value={threadPost.content}
          onChange={(e) =>
            setThreadPost({ ...threadPost, content: e.target.value })
          }
          sx={{
            width: "100%",
            "& label.Mui-focused": {
              color: "gray",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "transparent",
              },
              "&:hover fieldset": {
                borderColor: "transparent",
              },
              "&.Mui-focused fieldset": {
                borderColor: "transparent",
              },
            },
          }}
          InputLabelProps={{ sx: { color: "gray" } }}
          InputProps={{ sx: { color: "white" } }}
        />
        <label htmlFor="image">
          {/* <LuImagePlus  color="#04a51e" cursor={"pointer"} size={20} /> */}
          <AddPhotoAlternateOutlined sx={{ color: "#04a51e" }} cursor={"pointer"} />
        </label>
        <input
          id="image"
          type="file"
          hidden
          accept="image/*"
          multiple
          max={4}
          onChange={handleImageChange}
        />

        <Button
          variant="contained"
          size="small"
          onClick={handlePost}
          sx={{
            backgroundColor: "#04a51e",
            borderRadius: "20px",
            textTransform: "capitalize",
            ":hover": { backgroundColor: "#04a51e" },
          }}
        >
          {threadId ? "Reply" : "Post"}
        </Button>
      </Box>
      <Box sx={{ display: "flex" }}>
        {threadPost.imagePreview.length > 0 && (
          <Box sx={{ display: "flex", gap: "5px", marginTop: "10px"}}>
            {threadPost.imagePreview.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`preview-${index}`}
                style={{
                  borderRadius: "5px",
                  maxWidth: "50%",
                }}
              />
            ))}
          </Box>
        )}
      </Box>
    </>
  );
};

export default ThreadForm;
