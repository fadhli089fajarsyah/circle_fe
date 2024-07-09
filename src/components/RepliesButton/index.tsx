import { ChatOutlined } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import { IThread } from "../../types/app";
import { useNavigate } from "react-router-dom";

interface ThreadCardProps {
  thread: IThread;
}

const RepliesButton: React.FC<ThreadCardProps> = ({ thread }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/detail/${thread.id}`);
  };
  return (
    <>
      {" "}
      <IconButton onClick={handleClick} sx={{ color: "white" }}>
        <ChatOutlined />
        <Typography sx={{ marginLeft: "10px" }}>
          {thread._count?.replies} Replies
        </Typography>
      </IconButton>
    </>
  );
};

export default RepliesButton;
