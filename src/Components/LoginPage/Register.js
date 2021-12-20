import Grid from "@mui/material/Grid";
import Logo from "../imgs/full-logo.png";
import Box from "@mui/material/Box";

import "./LoginPage.css";
import theme from "../ui/Theme";
import { ThemeProvider } from "@mui/material/styles";
import { Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Register({authToken}) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleBack = () => {
    navigate("/");
  };

  const handleSignUp = async (event) => {
    try {
      // event.preventDefault();
      const response = await fetch("http://localhost:3001/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name,
          username,
          password,
        }),
      });
      authToken(true)
      navigate("/main")
    } catch (err) {
      console.error(err.message);
    }
  };

  const onClick = () =>{
    handleSignUp();
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
                  position: "relative",
                }}
              >
                <img class="logo" src={Logo} alt="brand logo" />
                <div>
                  <input
                    class="login-text"
                    type="text"
                    placeholder="Email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <input
                    class="login-text"
                    type="text"
                    placeholder="Your Name"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                  <input
                    class="login-text"
                    type="text"
                    placeholder="Username(AKA)"
                    onChange={(e) => {
                      setUsername(e.target.value);
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
                  <button class="login-btn" onClick={onClick}>
                    Sign Up
                  </button>
                </div>

                <div className="back_button" onClick={handleBack}>
                  <Typography color="primary.main"> &lt; Back </Typography>
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
