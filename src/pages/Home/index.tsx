import { useEffect, useState } from "react";
import { IThread } from "../../types/app";
import { getThreads } from "../../lib/api/call/thread";
import ThreadCard from "../../components/ThreadCard";
import { Box, Typography } from "@mui/material";
import ThreadForm from "./components/ThreadForm";

const Home = () => {
  const [threads, setThreads] = useState<IThread[] | []>([]);

  async function getThread() {
    try {
      const res = await getThreads();
      setThreads(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getThread();
  }, []);

  return (
    <>
      <Box sx={{ padding: "20px" , color:"white" }}>
        <Typography variant="h5">Home</Typography>
      </Box>
      <Box sx={{ padding: "20px", borderBottom: "2px solid #3f3f3f", color:"white" }}>
        <ThreadForm callback={getThread} />
      </Box>
      {threads.map((thread) => (
        <ThreadCard key={thread.id} thread={thread} />
      ))}
    </>
  );
};

export default Home;
