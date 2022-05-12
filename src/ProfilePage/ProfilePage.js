import { ThemeProvider } from '@emotion/react';
import theme from "../ui/Theme";
import {Box, Grid, Stack, Typography, Divider, Avatar, Button} from "@mui/material";

import LogoutIcon from '@mui/icons-material/Logout';
import EditIcon from '@mui/icons-material/Edit';

import { useNavigate } from "react-router-dom";

function ProfilePage(){
    const navigate = useNavigate();

    const handleRouteLogOut = () => {
        navigate("/");
      }
      
    return(
        <ThemeProvider theme={theme}>
            <Box sx={{bgcolor:"primary.main", width:"100%", height:"100%", overflow:"auto"}}>
            <Box textAlign="center" marginTop="2%">
            <Typography variant="h1" fontSize="2rem" color="secondary.main">My Profile</Typography>
            </Box>
            <Box sx={{ width:"95%", marginLeft:"2%"}}>
            <Box sx={{bgcolor:"#DBE2EF", borderRadius:"2px"}}>
                <Stack>
                <Box display="flex" justifyContent="center" alignItems="center"><Avatar sx={{width:"5rem", height:"5rem", margin:"3%"}}/></Box>
                <Box padding="2%">
                <Typography variant="h1" fontSize="0.5rem" color="primary.dark">Full Name :</Typography>
                <Typography variant="h3" fontSize="1rem" color="primary.main" marginBottom="0.5%">Sathienpong</Typography>

                <Typography variant="h1" fontSize="0.5rem" color="primary.dark">Username :</Typography>
                <Typography variant="h3" fontSize="1rem" color="primary.main" marginBottom="0.5%">@sathienpong</Typography>

                <Typography variant="h1" fontSize="0.5rem" color="primary.dark">Email :</Typography>
                <Typography variant="h3" fontSize="1rem" color="primary.main" marginBottom="0.5%">purehero@hotmail.com></Typography>
                <Typography variant="h1" fontSize="0.5rem" color="primary.dark">Phone number :</Typography>
                <Typography variant="h3" fontSize="1rem" color="primary.main" marginBottom="0.5%">0881111111</Typography>
                </Box>
                </Stack>
            
            </Box>
            <Stack direction="column" marginTop="1%">
            <Button style={{backgroundColor:"grey"}}variant="contained" startIcon={<EditIcon/>}>
                Edit Profile
            </Button>
            <Button onClick={handleRouteLogOut} style={{backgroundColor:"red"}} variant="contained" sx={{marginTop:"1%"}} startIcon={<LogoutIcon/>}>
                Log Out
            </Button>
            </Stack>
            </Box>
            </Box>
        </ThemeProvider>
    );
}

export default ProfilePage;