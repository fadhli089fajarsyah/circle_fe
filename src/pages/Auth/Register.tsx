import { Box } from "@mui/material";
import RegisterForm from "../../components/RegisterForm";
const Register = () => {
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
      <RegisterForm />
      {/* <Box
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
        autoComplete="off"
      >
        <TextField
          label="Email or Username*"
          variant="outlined"
          type="text"
          InputLabelProps={{ sx: { color: "gray" } }}
          InputProps={{ sx: { color: "white" } }}
          // sx={{ border: "2px solid gray", borderRadius: "10px" }}
        />
        <TextField
          label="Password*"
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
        <Box sx={{display: "flex", gap: "5px", alignItems: "center" }}>
          <Typography variant="body2" sx={{ color: "gray" }}>
            Don't have an account?{" "}
            <Link to="/register" style={{ textDecoration: "none", color: "#04a51e" }}>
              Register
            </Link>
          </Typography>
        </Box>
      </Box> */}
    </Box>
  );
};

export default Register;
