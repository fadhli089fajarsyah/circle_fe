import { Avatar, Box, Button, Typography } from "@mui/material";
import { useAppSelector } from "../../store";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ModalDialog from "../Modal";
import EditProfile from "../EditForm";

const ProfileCard = () => {
  const profile = useAppSelector((state) => state.auth.user);
  const _host_url = "http://localhost:5000/uploads/";
  const auth = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState<boolean>(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleClick = () => {
    navigate("/follows");
  }

  return !auth.user ? null : (
    <>
      <Box sx={{ borderRadius: "10px", padding: "10px", bgcolor: "#262626", color: "white" }}>
        <Typography variant="body1" sx={{ marginBottom: "10px" }}>
          My Profile
        </Typography>
        <img
          src={
            profile?.cover
              ? _host_url + profile.cover
              : _host_url + "default.jpg"
          }
          alt="cover"
          width="100%"
          height="100px"
          style={{ borderRadius: "10px", objectFit: "cover" }}
        />
        <Box
          sx={{
            display: "flex",
            marginTop: "-30px",
            justifyContent: "space-between",
            alignItems: "flex-end",
            paddingInlineStart: "20px",
          }}
        >
          <Avatar
            onClick={() => {
              navigate("/profile");
            }}
            src={
              profile?.avatar
                ? _host_url + profile.avatar
                : "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3467.jpg?w=740"
            }
            alt="avatar"
            sx={{
              width: 56,
              height: 56,
              border: "2px solid #1d1d1d",
            }}
          />
          <Button
            onClick={toggleModal}
            variant="outlined"
            size="small"
            sx={{
              height: "25px",
              color: "white",
              borderColor: "white",
              ":hover": { borderColor: "white" },
              borderRadius: "20px",
              textTransform: "none",
            }}
          >
            Edit Profile
          </Button>
          <ModalDialog callback={toggleModal} show={showModal}>
            <EditProfile callback={toggleModal} />
          </ModalDialog>
        </Box>
        <Box>
          <Typography variant="body1">{profile?.user.fullname}</Typography>
          <Typography variant="caption" sx={{ color: "#b2b2b2" }}>
            @{profile?.user.username}
          </Typography>
          <Typography variant="subtitle1">{profile?.bio}</Typography>
          {/* <Typography variant="caption"> */}
          <Button
          onClick={handleClick}
            size="small"
            sx={{
              marginRight: "10px",
              textTransform: "none",
              color: "white",
              minWidth: "auto",
              p: "0px",
              ":hover": { backgroundColor: "transparent" },
            }}
          >
            {profile?.user._count?.following} Followers
          </Button>
          <Button
            onClick={handleClick}
            size="small"
            sx={{
              textTransform: "none",
              color: "white",
              minWidth: "auto",
              p: "0px",
              ":hover": { backgroundColor: "transparent" },
            }}
          >
            {profile?.user._count?.follower} Following
          </Button>
          {/* </Typography> */}
        </Box>
      </Box>
    </>
  );
};

export default ProfileCard;
