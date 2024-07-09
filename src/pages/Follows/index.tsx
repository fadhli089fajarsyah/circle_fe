import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getFollowers, getFollowings } from "../../lib/api/call/follow";
import { useAppSelector } from "../../store";
import UserList from "../../components/UserList";
import { IFollows } from "../../types/app";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const Follows = () => {
  const user = useAppSelector((state) => state.auth.user);
  const [followers, setFollowers] = useState<IFollows[]>([]);
  const [followings, setFollowings] = useState<IFollows[]>([]);

  const fetchFollows = async () => {
    if (user) {
      const res = await getFollowers(user.user.id);
      const resFollowings = await getFollowings(user.user.id);
      setFollowers(res.data.data);
      setFollowings(resFollowings.data.data);
    }
  };

  useEffect(() => {
    fetchFollows();
  }, [user?.user.id!]);

  //Tabs
  const a11yProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };
  const CustomTabPanel = (props: TabPanelProps) => {
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
  };

  const [value, setValue] = useState(0);
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "10px", color: "white" }}>
        <Box sx={{ padding: "20px" }}>
          <Typography variant="h5">Follows</Typography>
        </Box>
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
                color: "#04a51e",
              },
              "& .MuiTab-root": {
                textTransform: "none",
              },
            }}
          >
            <Tab
              sx={{ fontWeight: "bold", color: "white" }}
              label="Followers"
              {...a11yProps(0)}
            />
            <Tab
              sx={{ fontWeight: "bold", color: "white" }}
              label="Following"
              {...a11yProps(1)}
            />
          </Tabs>
        <Box sx={{ paddingX: "20px" }}>
          <CustomTabPanel value={value} index={0}>
            {followers.map((follower) => (
              <UserList
                key={follower.follower?.id}
                user={follower?.follower!}
              />
            ))}
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            {followings.map((following) => (
              <UserList
                key={following.following?.id}
                user={following?.following!}
              />
            ))}
          </CustomTabPanel>
        </Box>
      </Box>
    </>
  );
};

export default Follows;
