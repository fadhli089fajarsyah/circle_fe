import { Box } from "@mui/material";
import LoginForm from "../../components/LoginForm";
const Login = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        bgcolor: "#1d1d1d",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <LoginForm />
      
    </Box>
  );
};

export default Login;
