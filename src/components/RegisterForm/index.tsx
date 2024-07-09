import { Box, Typography, TextField, Button } from "@mui/material";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerAPI } from "../../lib/api/call/register";


const RegisterForm = () => {
  const navigate = useNavigate();
  const [formRegister, setFormRegister] = useState<{
    fullname: string;
    email: string;
    username: string;
    password: string;
  }>({
    fullname: "",
    email: "",
    username: "",
    password: "",
  });

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    try {
        const res = await registerAPI(formRegister);

        console.log(res);
        navigate("/login");

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
        <Typography variant="h6">Create an account Circle </Typography>
      </Box>
      <Box
        onSubmit={handleRegister}
        sx={{
          width: "30%",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginTop: "20px",
        }}
        component="form"
        autoComplete="off"
      >
        <TextField
          label="Fullname*"
          value={formRegister.fullname}
          onChange={(e) => {
            setFormRegister({ ...formRegister, fullname: e.target.value });
          }}
          variant="outlined"
          type="text"
          InputLabelProps={{ sx: { color: "gray" } }}
          InputProps={{ sx: { color: "white" } }}
        />
        <TextField
          label="Email*"
          value={formRegister.email}
          onChange={(e) => {
            setFormRegister({ ...formRegister, email: e.target.value });
          }}
          variant="outlined"
          type="email"
          InputLabelProps={{ sx: { color: "gray" } }}
          InputProps={{ sx: { color: "white" } }}
        />
        <TextField
          label="Username*"
          value={formRegister.username}
          onChange={(e) => {
            setFormRegister({ ...formRegister, username: e.target.value });
          }}
          variant="outlined"
          type="text"
          InputLabelProps={{ sx: { color: "gray" } }}
          InputProps={{ sx: { color: "white" } }}
        />
        <TextField
          label="Password*"
          value={formRegister.password}
          onChange={(e) => {
            setFormRegister({ ...formRegister, password: e.target.value });
          }}
          variant="outlined"
          type="password"
          InputLabelProps={{ sx: { color: "gray" } }}
          InputProps={{ sx: { color: "white" } }}
        />
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
          Register
        </Button>
        <Box sx={{ display: "flex", gap: "5px", alignItems: "center" }}>
          <Typography variant="body2" sx={{ color: "gray" }}>
            Already have an account?{" "}
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "#04a51e" }}
            >
              Login
            </Link>
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default RegisterForm;
