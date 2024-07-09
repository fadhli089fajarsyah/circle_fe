import { Box, Typography, TextField, Button } from "@mui/material";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI } from "../../lib/api/call/user";
import { getProfile } from "../../lib/api/call/profile";
import { useAppDispatch } from "../../store";
import { SET_LOGIN } from "../../store/slice/auth";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formInput, setFormInput] = useState<{
    username: string;
    password: string;
  }>({
    username: "",
    password: "",
  });

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await loginAPI(formInput);
      const token = res.data.data;
      const profile = await getProfile(token);

      localStorage.setItem("token", token);

      dispatch(SET_LOGIN({ user: profile.data.data, token }));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box
        sx={{
          width: "30%",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <Typography variant="h4" sx={{ color: "#04a51e", fontWeight: "bold" }}>
          Circle
        </Typography>
        <Typography variant="h6">Login to Circle</Typography>
      </Box>
      <Box
        sx={{
          width: "30%",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginTop: "20px",
        }}
        component="form"
        // autoComplete="off"
        // action=""
        onSubmit={handleLogin}
      >
        {/* <form
          action=""
          onSubmit={handleLogin}
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        > */}
        <TextField
          label="Email or Username*"
          value={formInput.username}
          onChange={(e) =>
            setFormInput({ ...formInput, username: e.target.value })
          }
          variant="outlined"
          type="text"
          InputLabelProps={{ sx: { color: "gray" } }}
          InputProps={{ sx: { color: "white" } }}
        />
        <TextField
          label="Password*"
          value={formInput.password}
          onChange={(e) =>
            setFormInput({ ...formInput, password: e.target.value })
          }
          variant="outlined"
          type="password"
          InputLabelProps={{ sx: { color: "gray" } }}
          InputProps={{ sx: { color: "white" } }}
        />
        <Link to="/forgot" style={{ textDecoration: "none", textAlign: "end" }}>
          <Typography variant="caption" sx={{ textDecoration: "none" }}>
            Forgot Password?
          </Typography>
        </Link>
        <Button
          type="submit"
          variant="contained"
          sx={{
            textTransform: "none",
            backgroundColor: "#04a51e",
            fontWeight: "bold",
            borderRadius: "20px",
            ":hover": {
              backgroundColor: "#04a51e",
            },
          }}
        >
          Login
        </Button>
        {/* </form> */}
        <Box sx={{ display: "flex", gap: "5px", alignItems: "center" }}>
          <Typography variant="body2" sx={{ color: "gray" }}>
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{ textDecoration: "none", color: "#04a51e" }}
            >
              Register
            </Link>
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default LoginForm;
