import { ArrowBack} from "@mui/icons-material";
import { Avatar, Box, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { getReplies, getThread } from "../../lib/api/call/thread";
import { useEffect, useState } from "react";
import { IThread } from "../../types/app";
import ThreadForm from "../Home/components/ThreadForm";
import ThreadCard from "../../components/ThreadCard";
import moment from "moment";
import LikeButton from "../../components/LikeButton";
import RepliesButton from "../../components/RepliesButton";

const DetailThread = () => {
  const navigate = useNavigate();
  const { threadId } = useParams();

  const [threadDetail, setThreadDetail] = useState<IThread>({
    id: 0,
    content: "",
    images: [],
    userId: 0,
    like: [],
    _count: { like: 0, replies: 0 },
  });

  console.log("Thread Detail",threadDetail);

  const [replies, setReplies] = useState<IThread[]>([]);

  const fetchThread = async () => {
    try {
      const res = await getThread(Number(threadId));
      const resReplies = await getReplies(Number(threadId));

      setThreadDetail(res.data.data);
      setReplies(resReplies.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchThread();
  }, [threadId]);

  const handleClick = () => {
    navigate("/");
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          padding: "20px",
          gap: "10px",
          alignItems: "center",
          color: "white",
        }}
      >
        <ArrowBack onClick={handleClick} sx={{ cursor: "pointer" }} />
        <Typography variant="h5">Status</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          padding: "20px",
          borderBottom: "2px solid #3f3f3f",
          gap: "10px",
          flexDirection: "column",
          color: "white",
        }}
      >
        <Box sx={{ display: "flex", gap: "10px" }}>
          <Box>
            <Avatar
              src={
                threadDetail.author?.profile?.avatar
                  ? "http://localhost:5000/uploads/" +
                    threadDetail.author?.profile?.avatar
                  : "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3467.jpg?w=740"
              }
              alt="avatar"
            />
          </Box>
          <Box>
            <Typography variant="body1">
              {threadDetail.author?.fullname}
            </Typography>
            <Typography sx={{ color: "#b2b2b2", fontSize: "14px" }}>
              @{threadDetail.author?.username}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Typography variant="body1">{threadDetail.content}</Typography>
          <Box sx={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {threadDetail.images &&
              threadDetail.images.map((image) => (
                <img
                  key={image.image}
                  src={"http://localhost:5000/uploads/" + image.image}
                  alt="image"
                  style={{
                    height: "150px",
                    borderRadius: "5px",
                    objectFit: "cover",
                    flex: 1,
                  }}
                />
              ))}
          </Box>
          <Typography variant="body2" sx={{ color: "#b2b2b2" }}>
            {moment(threadDetail.createdAt).format("LT")}{" "}●{" "}
            {moment(threadDetail.createdAt).format("ll")}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: "10px", alignItems: "center", color:"white"  }}>
          {/* <FavoriteBorder />
          <Comment /> */}
          {/* <Typography sx={{ color: "#b2b2b2" }}>
            {threadDetail._count?.replies} Replies
          </Typography> */}
          <LikeButton thread={threadDetail} />
          <RepliesButton thread={threadDetail}/>
        </Box>
      </Box>
      <Box sx={{ padding: "20px" }}>
        <ThreadForm callback={fetchThread} threadId={Number(threadId)} />
      </Box>
      <Box>
        {replies.map((reply) => (
          <ThreadCard key={reply.id} thread={reply} />
        ))}
      </Box>
    </>
  );
};

export default DetailThread;
