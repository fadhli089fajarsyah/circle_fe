import { Avatar, Box, Typography } from "@mui/material";
import { IThread, IUser } from "../../types/app";
import FollowButton from "../FollowButton";
import { useNavigate } from "react-router-dom";

interface IUserListProps {
  user: IUser;
  // thread:IThread
}

const UserList: React.FC<IUserListProps> = ({ user }) => {
  const _host_url = "http://localhost:5000/uploads/";

  const navigate = useNavigate();
  // const handleClick = () => {
  //   navigate(`/profile/${thread.author?.id}`)
  // }

  return (
    <>
      <Box
        key={user.id}
        sx={{
          
          display: "flex",
          marginTop: "10px",
          alignItems: "center",
          gap: "10px",
          width: "100%",
          color: "white",
        }}
      >
        <Box>
          <Avatar
            src={
              user.profile?.avatar
                ? _host_url + user.profile?.avatar
                : "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3467.jpg?w=740"
            }
            alt="avatar"
            sx={{
              border: "2px solid #1d1d1d",
            }}
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="body2">{user.fullname}</Typography>
          <Typography variant="caption" sx={{ color: "#b2b2b2" }}>
            {user.username}
          </Typography>
        </Box>
        <FollowButton followingId={user.id} />
      </Box>
    </>
  );
};

export default UserList;
