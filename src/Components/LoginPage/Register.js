import Grid from "@mui/material/Grid";
import Logo from "../imgs/full-logo.png";
import Box from "@mui/material/Box";

import "./LoginPage.css";
import theme from "../ui/Theme";
import { ThemeProvider } from "@mui/material/styles";
import { Typography } from "@mui/material";

import {useNavigate} from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();
  
    const handleRouteSignIn = () =>{ 
      navigate("/");
    }

    return (
      <ThemeProvider theme={theme}>
        <Box class="background-login">
          <Grid container>
            <Grid xs={4}></Grid>
            <Grid xs={4}>
              <Typography variant="h4">
                <Box
                  sx={{
                    textAlign: "center",
                    marginTop: "5rem",
                    backgroundColor: "secondary.main",
                    padding: "20px",
                    position: "relative"
                  }}
                >
                  <img class="logo" src={Logo} alt="brand logo" />
                  <div>
                    <input
                      class="login-text"
                      type="text"
                      placeholder="Email"
                    />
                    <input
                      class="login-text"
                      type="text"
                      placeholder="Your Name"
                    />
                                        <input
                      class="login-text"
                      type="text"
                      placeholder="Username(AKA)"
                    />
                                        <input
                      class="login-text"
                      type="password"
                      placeholder="Password"
                    />
                    <button class="login-btn" onClick={handleRouteSignIn}>Sign Up</button>
                  </div>

                  <div className="back_button" onClick={handleRouteSignIn}><Typography color="primary.main"> &lt; Back </Typography></div>
                </Box>
              </Typography>
            </Grid>
            <Grid xs={4}></Grid>
          </Grid>
        </Box>
      </ThemeProvider>
    );
  }