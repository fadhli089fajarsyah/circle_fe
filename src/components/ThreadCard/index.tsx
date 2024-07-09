import { Avatar, Box,  Typography } from "@mui/material";
import { IThread } from "../../types/app";
import { useNavigate } from "react-router-dom";
import LikeButton from "../LikeButton";
import FormatDate from "../../lib/formatDate";
import RepliesButton from "../RepliesButton";

interface ThreadCardProps {
  thread: IThread;
}
const ThreadCard: React.FC<ThreadCardProps> = ({ thread }) => {
  const navigate = useNavigate();

  const handleClickDetail = () => {
    navigate(`/detail/${thread.id}`);
  };

  const handleUserClick = () => {
    navigate(`/profile/${thread.author?.id}`);
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          borderBottom: "1px solid #3f3f3f",
          padding: "20px",
          color: "white",
        }}
      >
        <Box sx={{ display: "flex", gap: "10px" }}>
          <Box onClick={handleUserClick}>
            <Avatar
              
              src={
                thread.author?.profile?.avatar
                  ? "http://localhost:5000/uploads/" +
                    thread.author?.profile?.avatar
                  : "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3467.jpg?w=740"
              }
              sx={{ cursor: "pointer" }}
            >
              DW
            </Avatar>
          </Box>
          <Box>
            <Box sx={{ display: "flex", gap: "5px", alignItems: "center" }}>
              <Typography onClick={handleUserClick} sx={{ cursor: "pointer" }} variant="body1">{thread.author?.fullname}</Typography>
              <Typography onClick={handleUserClick} sx={{ cursor: "pointer", color: "#b2b2b2", fontSize: "14px" }}>
                @{thread.author?.username} ●
              </Typography>
              <Typography sx={{ color: "#b2b2b2", fontSize: "14px" }}>
                {FormatDate({ createdAt: thread.createdAt })}
              </Typography>
            </Box>
            <Typography onClick={handleClickDetail} sx={{ cursor: "pointer" }} variant="body2">{thread.content}</Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {thread.images &&
                thread.images.map((image) => (
                  <img
                    key={image.image}
                    src={"http://localhost:5000/uploads/" + image.image}
                    alt="image"
                    style={{
                      height: "150px",
                      borderRadius: "10px",
                      objectFit: "cover",
                      flex: 1,
                    }}
                  />
                ))}
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            marginLeft: "40px",
            marginTop: "10px",
            gap: "5px",
            alignItems: "center",
          }}
        >
          <LikeButton thread={thread} />
          <RepliesButton thread={thread} />
        </Box>
      </Box>
    </>
  );
};

export default ThreadCard;
