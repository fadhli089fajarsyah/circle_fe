import { useEffect, useState } from "react";
import API from "../../lib/api";
import { IconButton, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { IThread } from "../../types/app";
import { useAppSelector } from "../../store";

interface ILikeButtonProps {
  thread: IThread;
}

const LikeButton: React.FC<ILikeButtonProps> = ({ thread }) => {
  const { user } = useAppSelector((state) => state.auth);
  const [liked, setLiked] = useState<boolean>(false);

  const [likeCount, setLikeCount] = useState<number>(0);

  const checkLike = () => {
    if (user) {
      const like = thread.like?.find((like) => like.userId === user.user.id);
      setLiked(like ? true : false);
    }
  };

  const handleLike = async () => {
    try {
      const res = await API.post(
        `like`,
        { threadId: thread.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setLikeCount(liked ? likeCount - 1 : likeCount + 1);
      setLiked(!liked);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    checkLike();
    setLikeCount(thread._count?.like!);
  }, [thread?.like, user]);

  

  return (
    <>
      <IconButton aria-label="like-button" onClick={handleLike}>
        {liked ? <FavoriteIcon sx={{ color: "red" }} /> : <FavoriteBorderOutlinedIcon sx={{ color: "white" }} />}
      </IconButton>
      <Typography variant="body2" sx={{ color: "white" }}>{likeCount}</Typography>
    </>
  );
};

export default LikeButton;
