import { AddAPhotoOutlined, HighlightOffOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../store";
import { useState } from "react";
import { getProfile, updateProfile } from '../../lib/api/call/profile';
import { SET_LOGIN } from '../../store/slice/auth';

interface IEditFormProps {
  callback?: () => void;
}

const EditProfile: React.FC<IEditFormProps> = ({ callback }) => {
  const profile = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const _host_url = "http://localhost:5000/uploads/";

  const [formEdit, setFormEdit] = useState<{
    fullname?: string;
    username?: string;
    bio?: string;
    avatar?: File | null;
    cover?: File | null;
  }>({
    fullname: profile?.user?.fullname ?? "",
    username: profile?.user?.username ?? "",
    bio: profile?.bio ?? "",
    avatar: null,
    cover: null,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files, value } = event.target;
    const file = files ? files[0] : null;

    setFormEdit({ ...formEdit, [name]: file || value });
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found");
      }
      const formDataToSend : any = new FormData();

      if (formEdit.bio) {
        formDataToSend.append("bio", formEdit.bio);
      }
      if (formEdit.fullname) {
        formDataToSend.append("fullname", formEdit.fullname);
      }
      if (formEdit.username) {
        formDataToSend.append("username", formEdit.username);
      }

      if (formEdit.avatar) {
        formDataToSend.append("avatar", formEdit.avatar);
      }

      if (formEdit.cover) {
        formDataToSend.append("cover", formEdit.cover);
      }

      const res = await updateProfile(formDataToSend, token);
      const get = await getProfile(token);
      dispatch(
        SET_LOGIN({
          user: get.data.data,
          token: localStorage.getItem("token") as string,
        })
      );

      if (callback) {
        callback();
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          bgcolor: "#1d1d1d",
          color: "white",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">Edit Profile</Typography>
          <Button
            size="small"
            sx={{
              color: "gray",
              minWidth: "auto",
              p: "0px",
              ":hover": { backgroundColor: "transparent" },
            }}
            onClick={callback}
          >
            <HighlightOffOutlined />
          </Button>
        </Box>
        <form onSubmit={handleFormSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Box
              sx={{
                width: "100%",
                position: "relative",
                display: "inline-block",
              }}
            >
              <img
                src={
                  formEdit.cover
                    ? URL.createObjectURL(formEdit.cover)
                    : profile?.cover
                    ? _host_url + profile.cover
                    : _host_url + "default.jpg"
                }
                alt="cover"
                width="100%"
                height="100px"
                style={{ borderRadius: "10px", objectFit: "cover" }}
              />
              <IconButton
                sx={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  color: "white",
                }}
              >
                <label htmlFor="cover">
                  <AddAPhotoOutlined cursor={"pointer"} />
                </label>
                <input
                  id="cover"
                  name="cover"
                  type="file"
                  hidden
                  accept="image/*"
                  multiple
                  max={1}
                  onChange={handleInputChange}
                />
              </IconButton>
            </Box>
            <Avatar
              src={
                formEdit.avatar
                  ? URL.createObjectURL(formEdit.avatar)
                  : profile?.avatar
                  ? _host_url + profile.avatar
                  : "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3467.jpg?w=740"
              }
              alt="avatar"
              sx={{
                marginTop: "-40px",
                marginLeft: "20px",
                width: 56,
                height: 56,
                border: "2px solid #1d1d1d",
              }}
            />
            <IconButton
              sx={{
                position: "absolute",
                top: "145px",
                left: "50px",
                color: "white",
              }}
            >
              <label htmlFor="avatar">
                <AddAPhotoOutlined cursor={"pointer"} />
              </label>
              <input
                id="avatar"
                name="avatar"
                type="file"
                hidden
                accept="image/*"
                multiple
                max={1}
                onChange={handleInputChange}
              />
            </IconButton>
            <TextField
              onChange={handleInputChange}
              type="text"
              name="fullname"
              defaultValue={profile?.user.fullname}
              autoComplete="off"
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
              style={{ border: "1px solid gray", borderRadius: "10px" }}
              InputLabelProps={{ sx: { color: "gray" } }}
              InputProps={{ sx: { color: "white" } }}
            />
            <TextField
              onChange={handleInputChange}
              type="text"
              name="username"
              defaultValue={profile?.user.username}
              autoComplete="off"
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
              style={{ border: "1px solid gray", borderRadius: "10px" }}
              InputLabelProps={{ sx: { color: "gray" } }}
              InputProps={{ sx: { color: "white" } }}
            />
            <TextField
              type="text"
              name="bio"
              onChange={handleInputChange}
              defaultValue={profile?.bio}
              autoComplete="off"
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
              style={{
                border: "1px solid gray",
                borderRadius: "10px",
                height: "100px",
              }}
              InputLabelProps={{ sx: { color: "gray" } }}
              InputProps={{ sx: { color: "white" } }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                width: "10%",
                alignSelf: "flex-end",
                height: "40px",
                borderRadius: "10px",
                backgroundColor: "#04a51e",
                color: "white",
                ":hover": {
                  backgroundColor: "#04a51e",
                },
              }}
            >
              Save
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default EditProfile;
