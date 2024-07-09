import {
  Avatar,
  Box,
  Button,
  ImageList,
  ImageListItem,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useAppSelector } from "../../store";
import { ArrowBack} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { getThreadByUser } from "../../lib/api/call/thread";
import { IThread, IUser } from "../../types/app";
import ThreadCard from "../../components/ThreadCard";
import { useNavigate, useParams } from "react-router-dom";
import { getUsers } from "../../lib/api/call/user";
import FollowButton from "../../components/FollowButton";

const Profile = () => {
  const navigate = useNavigate();
  // const profile = useAppSelector((state) => state.auth.user);
  const _host_url = "http://localhost:5000/uploads/";
  const auth = useAppSelector((state) => state.auth);

  const { userId } = useParams();
  const [threadUser, setThreadUser] = useState<IThread[]>([]);
  const [user, setUser] = useState<IUser[] | []>([]);

  async function getUser() {
    try {
      const res = await getUsers();
      setUser(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }
  const userProfile = user.find((user) => user.id === +userId!);

  useEffect(() => {
    getUser();
  }, []);

  const getThread = async () => {
    try {
      const res = await getThreadByUser(+userId!);
      setThreadUser(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getThread();
  }, []);

  // //Tabs
  // function a11yProps(index: number) {
  //   return {
  //     id: `simple-tab-${index}`,
  //     "aria-controls": `simple-tabpanel-${index}`,
  //   };
  // }

  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }
  function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            <Typography component="div">{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  const [value, setValue] = useState(0);
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const hasImages = threadUser.some(
    (thread) => thread.images && thread.images.length > 0
  );

  const handleClick = () => {
    navigate("/follows");
  }

  return !auth.user ? null : (
    <>
      <Box
        sx={{
          marginTop: "20px",
          paddingInlineStart: "20px",
          display: "flex",
          alignItems: "center",
          gap: "5px",
          color: "white",
        }}
      >
        <ArrowBack onClick={() => navigate("/")} sx={{ cursor: "pointer" }} />
        <Typography variant="h5">{userProfile?.fullname}</Typography>
      </Box>
      <Box sx={{ marginTop: "10px", paddingX: "20px" }}>
        <img
          src={
            userProfile?.profile?.cover
              ? _host_url + userProfile?.profile.cover
              : _host_url + "default.jpg"
          }
          alt="cover"
          width="100%"
          height="150px"
          style={{ borderRadius: "10px", objectFit: "cover" }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          marginTop: "-40px",
          justifyContent: "space-between",
          alignItems: "flex-end",
          paddingX: "20px",
        }}
      >
        <Avatar
          src={
            userProfile?.profile?.avatar
              ? _host_url + userProfile?.profile.avatar
              : "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3467.jpg?w=740"
          }
          alt="avatar"
          sx={{
            width: 72,
            height: 72,
            marginLeft: "30px",
            border: "2px solid #1d1d1d",
          }}
        />
        {userProfile?.id === auth.user?.user.id ? (
          <Button
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
        ) : (
          <FollowButton followingId={userProfile?.id!} />
        )}
      </Box>
      <Box sx={{ paddingInlineStart: "20px", color: "white" }}>
        <Typography variant="h6">{userProfile?.fullname}</Typography>
        <Typography variant="subtitle2" sx={{ color: "#b2b2b2" }}>
          @{userProfile?.username}
        </Typography>
        <Typography variant="subtitle1">{userProfile?.profile?.bio}</Typography>
        {/* <Typography variant="subtitle2">
          {userProfile?._count?.following} Followers |{" "}
          {userProfile?._count?.follower} Following
        </Typography> */}
        <Button
          onClick={handleClick}
          sx={{
            marginRight: "10px",
            textTransform: "none",
            color: "white",
            minWidth: "auto",
            p: "0px",
            ":hover": { backgroundColor: "transparent" },
          }}
        >
          {userProfile?._count?.following} Followers
        </Button>
        <Button
          onClick={handleClick}
          sx={{
            textTransform: "none",
            color: "white",
            minWidth: "auto",
            p: "0px",
            ":hover": { backgroundColor: "transparent" },
          }}
        >
          {userProfile?._count?.follower} Following
        </Button>
      </Box>
      <Box></Box>
      <Tabs
        variant="fullWidth"
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
        sx={{
          "& .MuiTabs-indicator": {
            backgroundColor: "#04a51e",
          },
          "& .Mui-selected": {
            color: "white",
          },
          "& .MuiTab-root": {
            textTransform: "none",
          },
        }}
      >
        <Tab sx={{ fontWeight: "bold", color: "white", }} label="All Post" />
        <Tab sx={{ fontWeight: "bold", color: "white" }} label="Media" />
      </Tabs>
      <CustomTabPanel value={value} index={0}>
        {threadUser.map((thread) => (
          <ThreadCard key={thread.id} thread={thread} />
        ))}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "50px",
            paddingBottom: "10px",
          }}
        >
          {!hasImages && (
            <Typography variant="h6" sx={{ color: "white" }}>
              @{userProfile?.username} has not posted media yet <br />
              <span style={{ fontSize: "16px", color: "#b2b2b2" }}>
                If so, the post will appear here.
              </span>
            </Typography>
          )}
        </Box>
        <Box sx={{ padding: "10px" }}>
          <ImageList
            sx={{ width: "100%", height: 450 }}
            cols={3}
            rowHeight={164}
          >
            {threadUser.map(
              (thread) =>
                thread.images &&
                thread.images.map((image, index) => (
                  <ImageListItem key={index}>
                    <img
                      src={_host_url + image?.image}
                      alt="image"
                      loading="lazy"
                      style={{
                        objectFit: "cover",
                        borderRadius: "10px",
                      }}
                    />
                  </ImageListItem>
                ))
            )}
          </ImageList>
        </Box>
      </CustomTabPanel>
    </>
  );
};

export default Profile;
