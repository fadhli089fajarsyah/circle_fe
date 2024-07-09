import { Box, Button, Icon, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import {
  AccountCircleOutlined,
  FavoriteBorder,
  Logout,
  PersonSearchOutlined,
} from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../store";
import { SET_LOGOUT } from "../../store/slice/auth";

const Menu = [
  {
    title: "Home",
    link: "/",
    icon: <HomeIcon />,
  },
  {
    title: "Search",
    link: "/search",
    icon: <PersonSearchOutlined />,
  },
  {
    title: "Follows",
    link: "/follows",
    icon: <FavoriteBorder />,
  },
  {
    title: "Profile",
    link: "/profile",
    icon: <AccountCircleOutlined />,
  },
];

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  return !auth.user ? (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px", }}>
      <Link to="/login">
        <Button
          variant="contained"
          sx={{
            width: "100%",
            borderRadius: "10px",
            backgroundColor: "#04a51e",
            fontWeight: "bold",
            ":hover": { backgroundColor: "#04a51e" },
          }}
        >
          Login
        </Button>
      </Link>
      <Link to="/register">
        <Button
          variant="contained"
          sx={{
            width: "100%",
            borderRadius: "10px",
            backgroundColor: "#04a51e",
            fontWeight: "bold",
            ":hover": { backgroundColor: "#04a51e" },
          }}
        >
          Register
        </Button>
      </Link>
    </Box>
  ) : (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          height: "100%",
        }}
      >
        {Menu.map((menu) => (
          <Box key={menu.title} sx={{ display: "flex", marginTop: "20px" }}>
            <Link
              to={menu.link === "/profile" ? `/profile/${auth.user?.user.id}` : menu.link}
              style={{
                color: "white",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Icon>{menu.icon}</Icon>
              <Typography variant="h6">{menu.title}</Typography>
            </Link>
          </Box>
        ))}
        
        <Box
          sx={{
            marginTop: "auto",
          }}
        >
          <Button
            onClick={() => dispatch(SET_LOGOUT())}
            variant="text"
            size="small"
            sx={{ color: "white", ":hover": { backgroundColor: "transparent" } }}
          >
            <Logout />
            <Typography
              variant="h6"
              sx={{ color: "white", marginLeft: "5px", textTransform: "capitalize" }}
            >
              Logout
            </Typography>
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Sidebar;
