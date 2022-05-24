import Grid from "@mui/material/Grid";
import Logo from "../img/full-logo.png";
import Box from "@mui/material/Box";
import axios from 'axios'


import "./LoginPage.css";
import theme from "../ui/Theme";
import { ThemeProvider } from "@mui/material/styles";
import { Typography, Button , Alert} from "@mui/material";

import { useNavigate } from "react-router-dom";

import { useState } from "react";

import CustomInput from "../Components/CustomInput";

export default function Register() {

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('')
  const [pic,setPic] = useState();
  const [loading,setLoading] = useState(false)

  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  }

  const onSignUp = async() => {
    
    setLoading(true)
    if(!name || !email || !password || !confirmPassword){
      console.log("please fill all blanks")
      setLoading(false)
      return
    }
    if(password != confirmPassword){
      console.log("password must match")
      return
    }

    try{
      const config ={
        headers: {
          "Content-type": "application/json",
        },
      }
      const {data} = await axios.post("/api/user",{name,email,password,pic},config)
      console.log("login success")
      localStorage.setItem("userinfo", JSON.stringify(data))
      handleBack()
    }catch(err){
      setLoading(false)

    }
  }
  const postDetails = async (pics) =>{
    setLoading(true)
    if(pics === undefined){
      <Alert variant="outlined" severity="error">
        This is an error alert — check it out!</Alert>
        return
    }
    if(pics.type === "image/jpeg" || "image/png"){
      const data = new FormData()
      data.append("file", pics)
      data.append("upload_preset", "Classmate")
      data.append("cloud_name", "dp1xewsqt")
      fetch("http://api.cloudinary.com/v1_1/dp1xewsqt/image/upload", {
        method:"post",
        body: data,
      })
      .then((res) => res.json())
      .then((data) => {
        setPic(data.url.toString())
        console.log(data.url.toString())
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
    } else{
      <Alert variant="outlined" severity="error">
      This is an error alert — check it out!</Alert>
    }
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
                <CustomInput placeholder="Email" onChange={(e) => { setEmail(e.target.value); }} />
                <CustomInput placeholder="Full Name" onChange={(e) => { setName(e.target.value); }} />
                <CustomInput placeholder="Password" onChange={(e) => { setPassword(e.target.value); }} />
                <CustomInput placeholder="Confirm Password" onChange={(e) => { setConfirmPassword(e.target.value); }} />
                {/* <input
                      type="file"
                      accept="image/*"
                      onChange={ (e) => 
                        postDetails(e.target.files[0])
                      }
                    /> */}
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
                <Typography variant="h3" fontSize="1rem" color="primary.main" sx={{ cursor: "pointer" }} onClick={handleBack}>Log in</Typography>
              </Grid>
            </Box>
          </Grid>
        </Grid>

      </Box>
    </ThemeProvider>
  );
}