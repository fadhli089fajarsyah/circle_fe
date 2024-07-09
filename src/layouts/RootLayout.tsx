import { Box, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { SET_LOGIN } from "../store/slice/auth";
import { getProfile } from "../lib/api/call/profile";
import { useAppDispatch } from "../store";
import ProfileCard from "../components/ProfileCard";
import SuggestedFollow from "../components/SuggestedFollow";
import Footer from "../components/Footer";

const RootLayout = () => {
  const dispatch = useAppDispatch();
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    setShowProfile(location.pathname !== "/profile");
  }, [location.pathname]);

  const checkLogin = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const profile = await getProfile(token);
        dispatch(SET_LOGIN({ user: profile.data.data, token }));
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    checkLogin();
  });

  return (
    <Box sx={{ display: "flex", height: "100vh", backgroundColor: "#1d1d1d" }}>
      <Box
        flex={1}
        sx={{ display: "flex", flexDirection: "column", padding: "20px" }}
      >
        <Typography variant="h3" sx={{ color: "#04a51e", fontWeight: "bold" }}>
          Circle
        </Typography>
        <Sidebar />
      </Box>
      <Box
        flex={2.5}
        sx={{
          overflowY: "scroll",
          scrollbarWidth: "none",
          borderLeft: "1px solid #3f3f3f",
          borderRight: "1px solid #3f3f3f",
        }}
      >
        <Outlet />
      </Box>
      <Box
        flex={1.5}
        padding="20px"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          overflowY: "scroll",
          scrollbarWidth: "none",
        }}
      >
        {showProfile && <ProfileCard />}
        <SuggestedFollow />
        <Footer />
      </Box>
    </Box>
  );
};

export default RootLayout;
