import Grid from "@mui/material/Grid";
import Logo from "../imgs/full-logo.png";
import Box from "@mui/material/Box";

import "./LoginPage.css";
import theme from "../ui/Theme";
import { ThemeProvider } from "@mui/material/styles";
import { Typography } from "@mui/material";

import {useNavigate} from "react-router-dom";

import {useState} from "react";

export default function Register() {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [usrname, setUsrname] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
  
    const handleBack = () =>{ 
      navigate("/");
    }

    const onSignUp = () => {
      console.log(email + name + usrname + password)
      handleBack()
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
                      onChange={ (e) => {
                        setEmail(e.target.value);
                      }}
                    />
                    <input
                      class="login-text"
                      type="text"
                      placeholder="Your Name"
                      onChange={ (e) => {
                        setName(e.target.value);
                      }}
                    />
                                        <input
                      class="login-text"
                      type="text"
                      placeholder="Username(AKA)"
                      onChange={ (e) => {
                        setUsrname(e.target.value);
                      }}
                    />
                                        <input
                      class="login-text"
                      type="password"
                      placeholder="Password"
                      onChange={ (e) => {
                        setPassword(e.target.value);
                      }}
                    />
                    <button class="login-btn" onClick={onSignUp}>Sign Up</button>
                  </div>

                  <div className="back_button" onClick={handleBack}><Typography color="primary.main"> &lt; Back </Typography></div>
                </Box>
              </Typography>
            </Grid>
            <Grid xs={4}></Grid>
          </Grid>
        </Box>
      </ThemeProvider>
    );
  }