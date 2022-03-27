import Grid from "@mui/material/Grid";
import Logo from "../img/full-logo.png";
import Box from "@mui/material/Box";

import "./LoginPage.css";
import theme from "../ui/Theme";
import { ThemeProvider } from "@mui/material/styles";
import { Typography, Button } from "@mui/material";

import { useNavigate } from "react-router-dom";

import { useState } from "react";

import CustomInput from "../Components/CustomInput";

export default function Register() {

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phnNumber, setPhnNumber] = useState('');
  const [usrname, setUsrname] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  }

  const onSignUp = () => {
    console.log(email + name + usrname + password)
    handleBack()
  }

  return (
    <ThemeProvider theme={theme}>
      <Box class="background-login">
        <Grid container justifyContent="center" alignItems="center" direction="column" style={{ minHeight: "70vh" }}>
          <Grid item>
            <Box sx={{ backgroundColor: "secondary.main", padding: "0px 3rem" }}>
              <Grid item>
                <img class="logo" src={Logo} alt="brand logo" />
              </Grid>
              <Grid container direction="column" alignItems="center" justifyItems="center">
                <CustomInput placeholder="Email" onChange={ (e) => {setEmail(e.target.value);}}/>
                <CustomInput placeholder="Full Name" onChange={ (e) => {setName(e.target.value);}}/>
                <CustomInput placeholder="Phone Number" onChange={ (e) => {setPhnNumber(e.target.value);}}/>
                <CustomInput placeholder="Username" onChange={ (e) => {setUsrname(e.target.value);}}/>
                <CustomInput placeholder="Password" onChange={ (e) => {setPassword(e.target.value);}}/>
                <Button size="medium" variant="contained" style={{ width: "105%", marginTop: "0.5rem", marginBottom: "2rem" }} onClick={onSignUp}> Register </Button>
              </Grid>
            </Box>
          </Grid>
          <Grid item marginTop="1rem">
            <Box sx={{ backgroundColor: "secondary.main", padding: "1rem 4.8rem" }} textAlign="center">
              <Grid item>
                <Typography variant="h3" fontSize="1rem">Already have an account?</Typography>
              </Grid>
              <Grid item>
                <Typography variant="h3" fontSize="1rem" color="primary.main" sx = {{cursor:"pointer"}} onClick={handleBack}>Log in</Typography>
              </Grid>
            </Box>
          </Grid>
        </Grid>
        
      </Box>
    </ThemeProvider>
  );
}