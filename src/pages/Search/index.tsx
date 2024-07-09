import { Box, TextField } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { IUser } from "../../types/app";
import { search } from "../../lib/api/call/search";
// import FollowButton from "../../components/FollowButton";
import UserList from "../../components/UserList";
import { PersonSearchOutlined } from "@mui/icons-material";

const Search = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [formSearch, setFormSearch] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormSearch(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const res = await search(formSearch);
      setUsers(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (formSearch) {
      handleSearch();
    }
  }, [formSearch]);

  return (
    <>
      <Box sx={{ padding: "20px" }}>
        <TextField
          onChange={handleChange}
          label="Search your friend"
          autoComplete="off"
          variant="outlined"
          type="text"
          sx={{
            borderRadius: "10px",
            width: "100%",
          }}
          InputLabelProps={{ sx: { color: "gray" } }}
          InputProps={{
            sx: { color: "white" },
            startAdornment: (
              <PersonSearchOutlined sx={{ color: "gray", marginRight: "5px" }} />
            ),
          }}
        />
      </Box>
      <Box sx={{ paddingX: "20px" }}>
        {users?.map((user) => (
          <Box
          
            key={user?.id}
            sx={{ display: "flex", gap: "10px", padding: "10px" }}
          >
            <UserList user={user} />
          </Box>
        ))}
      </Box>
    </>
  );
};

export default Search;
