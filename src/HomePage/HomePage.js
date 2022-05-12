import { ThemeProvider } from '@emotion/react';
import theme from "../ui/Theme";
import {Box, Grid, Stack, Typography, Divider, Avatar} from "@mui/material";
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";

import "../ChatPage/ChatSectionPage"


function HomePage(){
    return(
        <ThemeProvider theme={theme}>
            <Box sx={{bgcolor:"primary.main", width:"100%", height:"100%", overflow:"auto"}}>
            <Box textAlign="center" marginTop="2%">
                <Typography variant="h1" fontSize="2rem" color="secondary.main">CLASSMATE</Typography>
            </Box>
            <Box sx={{bgcolor:"#DBE2EF", width:"95%", marginLeft:"2%", height:"80%", borderRadius:"2px"}}>
            <Grid container>
                <Grid item xs="3" sx={{borderRight:"2px solid #3f72af", height:"80vh"}}>
                    <Stack textAlign="center">
                    <Typography variant="h2" fontSize="1.5rem" color="primary.dark" sx={{margin:"2% 0%"}}>Direct Messages</Typography>
                    <Divider/>
                <Stack padding="2%">
                <Box sx={{ backgroundColor:"primary.main", alignItems: "center", display: "flex", flexWrap: "wrap", padding: "2%", cursor: 'pointer', marginBottom:"2%" }}>
              <Avatar sx={{marginRight:"2%"}}>TS</Avatar>
              <Typography variant='subtitles' fontSize="1rem" color="secondary.main">Pond</Typography>
            </Box>

            <Box sx={{ backgroundColor:"primary.main", alignItems: "center", display: "flex", flexWrap: "wrap", padding: "2%", cursor: 'pointer' }}>
              <Avatar sx={{marginRight:"2%"}}>SP</Avatar>
              <Typography variant='subtitles' fontSize="1rem" color="secondary.main">Pure</Typography>
            </Box>
                </Stack>

                    </Stack>
                </Grid>
                <Grid item xs="9">
                    </Grid>
            </Grid>

            </Box>
            </Box>
        </ThemeProvider>
    );
}

export default HomePage;