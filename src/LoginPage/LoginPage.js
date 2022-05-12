import Grid from "@mui/material/Grid";
import Logo from "../img/full-logo.png";
import Box from "@mui/material/Box";

import "./LoginPage.css";
import theme from "../ui/Theme";
import { ThemeProvider } from "@mui/material/styles";
import { Button, TextField, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";

import CustomInput from "../Components/CustomInput";
import { maxWidth, width } from "@mui/system";

function LoginPage() {
  const navigate = useNavigate();

  const handleRouteSignUp = () => {
    navigate("/signup");
  }

  const handleRouteHome = () => {
    navigate("/main/home");
  }

  return (
    <ThemeProvider theme={theme}>
      <Box class="background-login">
        <Grid container justifyContent="center" alignItems="center" direction="column" style={{ minHeight: "60vh" }}>
          <Grid item>
            <Box sx={{ backgroundColor: "secondary.main", padding: "0px 3rem" }}>
              <Grid item>
                <img class="logo" src={Logo} alt="brand logo" />
              </Grid>
              <Grid container direction="column" alignItems="center" justifyItems="center">
                <CustomInput placeholder="Email or username" />
                <CustomInput placeholder="Password" />
                <Button onClick={handleRouteHome} size="medium" variant="contained" style={{ width: "105%", marginTop: "0.5rem", marginBottom: "2rem" }}> Log in </Button>
              </Grid>
            </Box>
          </Grid>
          <Grid item marginTop="1rem">
            <Box sx={{ backgroundColor: "secondary.main", padding: "1rem 5.2rem" }} textAlign="center">
              <Grid item>
                <Typography variant="h3" fontSize="1rem">Don't have an account?</Typography>
              </Grid>
              <Grid item>
                <Typography variant="h3" fontSize="1rem"  color="primary.main" sx = {{cursor:"pointer"}} onClick={handleRouteSignUp}>Sign Up</Typography>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default LoginPage;
