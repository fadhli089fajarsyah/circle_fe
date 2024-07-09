import {  Box, Typography } from "@mui/material";
import { useAppSelector } from "../../store";
import { IUser } from "../../types/app";
import { useEffect, useState } from "react";
import { getUsers } from "../../lib/api/call/user"
import UserList from "../UserList";

const SuggestedFollow = () => {
  const auth = useAppSelector((state) => state.auth);
  const [users, setUsers] = useState<IUser[]>([]);

  async function getUser() {
    try {
      const res = await getUsers();
      const allUsers: IUser[] = res.data.data;
      const filteredUsers = allUsers.filter(
        (user: IUser) => user.id !== auth.user?.user.id
      );
      setUsers(filteredUsers);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (auth.user && auth.user.user) {
      getUser();
    }
  }, [auth]);

  if (!auth.user || !auth.user.user) {
    return null;
  }

  return (
    <Box sx={{ borderRadius: "10px", padding: "10px", bgcolor: "#262626",color:"white" }}>
      <Typography variant="body1">Suggested for you</Typography>
      {users.map((user) => (
        <UserList user={user} key={user.id} />
      ))}
    </Box>
  );
};

export default SuggestedFollow;
