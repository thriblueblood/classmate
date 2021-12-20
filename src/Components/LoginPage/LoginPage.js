import Grid from "@mui/material/Grid";
import Logo from "../imgs/full-logo.png";
import Box from "@mui/material/Box";

import "./LoginPage.css";
import theme from "../ui/Theme";
import { ThemeProvider } from "@mui/material/styles";
import { Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";

import {useState} from "react";

function LoginPage({authToken}) {
  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  

  const handleRouteSignUp = () => {
    navigate("/signup");
  };

  const handleRouteHome = async(event) => {
    try{
      const response = await fetch("http://localhost:3001/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password
        }),
      });
      const parseRes = await response.json()
      console.log(parseRes.token);
      localStorage.setItem('token', parseRes.token);

      authToken(true)
      navigate("/main");
    }catch (err){
      console.error(err.message)
    }
  };


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
                }}
              >
                <img class="logo" src={Logo} alt="brand logo" />
                <div>
                  <input
                    class="login-text"
                    type="text"
                    placeholder="Email, or username"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <input
                    class="login-text"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  <button class="login-btn" onClick={handleRouteHome}>
                    Log in
                  </button>
                </div>
              </Box>

              <Box
                sx={{
                  textAlign: "center",
                  marginTop: "0.5rem",
                  backgroundColor: "secondary.main",
                  padding: "20px",
                }}
              >
                <Typography variant="h3" fontSize="1rem">
                  Dont' have an account ?{" "}
                </Typography>
                <div className="sign_up_button" onClick={handleRouteSignUp}>
                  <Typography variant="h3" fontSize="1rem" color="primary.main">
                    Sign Up
                  </Typography>
                </div>
              </Box>
            </Typography>
          </Grid>
          <Grid xs={4}></Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default LoginPage;
