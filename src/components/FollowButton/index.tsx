import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { follow } from "../../lib/api/call/follow";
import { useAppDispatch, useAppSelector } from "../../store";
import { SET_LOGIN } from "../../store/slice/auth";
import { getProfile } from "../../lib/api/call/profile";

interface IFollowButtonProps {
  followingId: number;
}

const FollowButton: React.FC<IFollowButtonProps> = ({ followingId }) => {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [isFollow, setIsFollow] = useState<boolean>(false);
  const handleFollow = async () => {
    try {
      await follow({ followingId });
      const token = localStorage.getItem("token");
      if (token) {
        const profile = await getProfile(token);
        dispatch(SET_LOGIN({ user: profile.data.data, token }));
      }

      setIsFollow(!isFollow);
    } catch (error) {
      console.log(error);
    }
  };

  const checkFollow = async () => {
    try {
      if (auth.user && followingId) {
        const following = auth.user.user.follower.find(
          (follow) => follow.followingId === followingId
        );
        setIsFollow(following ? true : false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkFollow();
  }, [auth.user, followingId]);

  return (
    <>
      <Button
        onClick={handleFollow}
        variant={isFollow ? "outlined" : "contained"}
        size="small"
        sx={{
          width: "100px",
          height: "30px",
          color: "white",
          backgroundColor: isFollow ? "transparent" : "#04a51e",
          borderColor: "white",
          ":hover": {
            borderColor: "white",
            backgroundColor: isFollow ? "transparent" : "#04a51e",
          },
          borderRadius: "20px",
          marginLeft: "auto",
          textTransform: "none",
        }}
      >
        {isFollow ? "Unfollow" : "Follow"}
      </Button>
    </>
  );
};

export default FollowButton;
